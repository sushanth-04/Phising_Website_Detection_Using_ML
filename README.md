# Phishing Website Detection Using Machine Learning

This project is a web application that utilizes a machine learning model to detect phishing websites. It helps users to identify potentially malicious websites before they visit them, thus enhancing their security.

## Table of Contents

- [Tech Stack](#tech-stack)
- [Installation](#installation)
- [How to Run](#how-to-run)
- [Project Structure](#project-structure)
- [Model](#model)
- [Dataset](#dataset)

## Tech Stack

The application is built using the following technologies:

- **Backend:**
    - Python
    - Flask
    - Scikit-learn
    - Pandas
    - Numpy
    - BeautifulSoup4
    - python-whois
    - gunicorn
- **Frontend:**
    - HTML
    - CSS
    - JavaScript

## Installation

To set up the project locally, follow these steps:

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/your-username/phishing-website-detection.git
    cd phishing-website-detection
    ```

2.  **Create a virtual environment:**
    ```bash
    python -m venv venv
    ```

3.  **Activate the virtual environment:**
    - On Windows:
        ```bash
        venv\Scripts\activate
        ```
    - On macOS/Linux:
        ```bash
        source venv/bin/activate
        ```

4.  **Install the dependencies:**
    ```bash
    pip install -r requirements.txt
    ```

## How to Run

After installing the dependencies, you can run the application with the following command:

```bash
python app.py
```

The application will start on `http://127.0.0.1:5000/`. Open this URL in your web browser to use the application.

## Project Structure

The project has the following structure:

```
.
├── app.py                  # Main Flask application
├── model.pkl               # Pre-trained machine learning model
├── feature.py              # Feature extraction from URL
├── requirements.txt        # Python dependencies
├── templates/              # HTML templates for the frontend
│   ├── index.html
│   └── result.html
├── static/                 # Static files (CSS, JS, images)
│   ├── css/
│   ├── js/
│   └── img/
├── phishing.csv            # Dataset used for training the model
├── Accuracy.txt            # Accuracy of the trained model
└── README.md               # This file
```

- **`app.py`**: The main entry point of the Flask application. It handles the web routes and the prediction logic.
- **`model.pkl`**: A pre-trained Gradient Boosting Classifier model that is used to make predictions.
- **`feature.py`**: Contains the `FeatureExtraction` class which is used to extract features from a given URL.
- **`requirements.txt`**: A list of all the Python libraries required to run the project.
- **`templates/`**: This directory contains the HTML files that are rendered to the user.
- **`static/`**: This directory contains all the static files like CSS, JavaScript, and images.
- **`phishing.csv`**: The dataset containing phishing and legitimate URLs used to train the model.
- **`Accuracy.txt`**: A text file containing the training and testing accuracy of the model.

## Model

The machine learning model used in this project is a **Gradient Boosting Classifier**. The model is trained on the `phishing.csv` dataset to classify URLs as either phishing or legitimate.

- **Training Accuracy:** 98.9%
- **Test Accuracy:** 97.4%

## Dataset

The dataset used to train the model is `phishing.csv`. It contains a collection of URLs, each labeled as either a phishing or a legitimate website.