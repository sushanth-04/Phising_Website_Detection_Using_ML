from flask import Flask, request, render_template, redirect, url_for
from flask_sqlalchemy import SQLAlchemy
import numpy as np
import pandas as pd
import warnings
import pickle
import os
from feature import FeatureExtraction
from sklearn.model_selection import train_test_split
from sklearn.ensemble import GradientBoostingClassifier

warnings.filterwarnings('ignore')

app = Flask(__name__)

# Configure the SQLite database
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///phishing_predictions.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db = SQLAlchemy(app)

# Define a model for storing URLs and predictions
class Prediction(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    url = db.Column(db.String(200), nullable=False)
    prediction = db.Column(db.String(200), nullable=False)
    legitimate_suggestion = db.Column(db.String(200), nullable=True)

# File to store phishing URLs
phishing_file = "phishing_websites.txt"

# Read mapping from Excel file
mapping_file_path = "Mapping.xlsx"
try:
    mapping_df = pd.read_excel(mapping_file_path, engine='openpyxl', header=None)
    phishing_to_legitimate = dict(zip(mapping_df.iloc[:, 0], mapping_df.iloc[:, 1]))
    print("Mapping file loaded successfully.")
except FileNotFoundError:
    phishing_to_legitimate = {}
    print(f"Error: The mapping file '{mapping_file_path}' was not found.")
except Exception as e:
    phishing_to_legitimate = {}
    print(f"An error occurred while loading the mapping file: {e}")

# Function to train the model
def train_model():
    dataset_path = "upload.csv"  # Replace with your dataset file path
    try:
        data = pd.read_csv(dataset_path)
        print("Dataset loaded successfully for training.")
    except FileNotFoundError:
        print(f"Error: Dataset file '{dataset_path}' not found.")
        return None

    # Prepare the data
    X = data.drop(columns=["Id", "Result"])  # Replace 'Label' with the actual target column name
    y = data["Result"]
    X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

    # Train the model
    model = GradientBoostingClassifier()
    model.fit(X_train, y_train)
    print("Model trained successfully.")

    # Save the trained model
    model_file_path = "model.pkl"
    with open(model_file_path, "wb") as file:
        pickle.dump(model, file)
        print(f"Model saved to {model_file_path}.")

    return model

# Load or train the model
model_file_path = "model.pkl"
if os.path.exists(model_file_path):
    try:
        with open(model_file_path, "rb") as file:
            gbc = pickle.load(file)
            print("Model loaded successfully.")
    except Exception as e:
        print(f"Error loading the model: {e}. Training a new model.")
        gbc = train_model()
else:
    print("Model file not found. Training a new model.")
    gbc = train_model()

@app.route('/')
def first():
    return render_template('first.html')

@app.route('/index')
def index():
    return render_template('index.html')

@app.route("/posts", methods=["GET", "POST"])
def posts():
    legitimate_suggestion = None

    if request.method == "POST":
        if not gbc:
            return "Error: Model is not loaded. Prediction functionality is unavailable.", 500

        url = request.form["url"]
        obj = FeatureExtraction(url)

        x = np.array(obj.getFeaturesList()).reshape(1, -1)

        y_pred = gbc.predict(x)[0]
        y_pro_phishing = gbc.predict_proba(x)[0, 0]
        y_pro_non_phishing = gbc.predict_proba(x)[0, 1]

        prediction = (
            "It is safe to go."
            if y_pred == 0
            else "The website is detected as phishing and not safe to go."
        )

        # Store the phishing website in a file if detected
        if y_pred == 1:
            with open(phishing_file, "a") as f:
                f.write(url + "\n")

        # Check if there's a legitimate suggestion for the phishing site
        legitimate_suggestion = phishing_to_legitimate.get(url)
        if legitimate_suggestion:
            prediction += f"\nYou might want to visit the legitimate site: {legitimate_suggestion}"

        # Store the prediction in the database
        new_prediction = Prediction(url=url, prediction=prediction, legitimate_suggestion=legitimate_suggestion)
        db.session.add(new_prediction)
        db.session.commit()

        return render_template('result.html', xx=round(y_pro_non_phishing, 2), url=url, prediction=prediction,
                               legitimate_suggestion=legitimate_suggestion)

    return render_template("result.html", xx=-1)

@app.route('/all_predictions')
def all_predictions():
    predictions = Prediction.query.all()
    return render_template('all_predictions.html', predictions=predictions)

if __name__ == "__main__":
    with app.app_context():
        # Create the database tables before running the app
        db.create_all()

    app.run(debug=True)
