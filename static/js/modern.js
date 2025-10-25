/**
 * Modern Phishing Detection UI - JavaScript
 * Smooth animations, interactions, and enhanced user experience
 */

class ModernUI {
    constructor() {
        this.init();
    }

    init() {
        this.setupAnimations();
        this.setupInteractions();
        this.setupScrollEffects();
        this.setupFormValidation();
        this.setupCounters();
        this.setupCharts();
        this.setupSearch();
        this.setupParallax();
    }

    // Animation System
    setupAnimations() {
        // Intersection Observer for scroll animations
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        this.observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    this.animateElement(entry.target);
                }
            });
        }, observerOptions);

        // Observe all animated elements
        document.querySelectorAll('.animate-fadeInUp, .animate-fadeInLeft, .animate-fadeInRight').forEach(el => {
            this.prepareElement(el);
            this.observer.observe(el);
        });
    }

    prepareElement(element) {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        element.style.transition = 'opacity 0.6s cubic-bezier(0.4, 0, 0.2, 1), transform 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
    }

    animateElement(element) {
        element.style.opacity = '1';
        element.style.transform = 'translateY(0)';
        
        // Trigger specific animations based on element type
        if (element.classList.contains('stats-row')) {
            setTimeout(() => this.animateCounters(), 500);
        }
        
        if (element.classList.contains('chart-container')) {
            setTimeout(() => this.initCharts(), 1000);
        }
    }

    // Interactive Elements
    setupInteractions() {
        // Button hover effects
        document.querySelectorAll('.btn, .btn-primary, .btn-secondary').forEach(btn => {
            btn.addEventListener('mouseenter', this.handleButtonHover.bind(this));
            btn.addEventListener('mouseleave', this.handleButtonLeave.bind(this));
        });

        // Card hover effects
        document.querySelectorAll('.card, .dashboard-card, .feature-card').forEach(card => {
            card.addEventListener('mouseenter', this.handleCardHover.bind(this));
            card.addEventListener('mouseleave', this.handleCardLeave.bind(this));
        });

        // Smooth scrolling for navigation
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', this.handleSmoothScroll.bind(this));
        });
    }

    handleButtonHover(e) {
        const btn = e.target;
        btn.style.transform = 'translateY(-2px)';
        btn.style.boxShadow = '0 10px 20px -5px rgba(99, 102, 241, 0.3)';
    }

    handleButtonLeave(e) {
        const btn = e.target;
        btn.style.transform = 'translateY(0)';
        btn.style.boxShadow = '';
    }

    handleCardHover(e) {
        const card = e.target;
        card.style.transform = 'translateY(-5px)';
        card.style.boxShadow = '0 25px 50px -12px rgba(0, 0, 0, 0.25)';
    }

    handleCardLeave(e) {
        const card = e.target;
        card.style.transform = 'translateY(0)';
        card.style.boxShadow = '';
    }

    handleSmoothScroll(e) {
        e.preventDefault();
        const target = document.querySelector(e.target.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    }

    // Scroll Effects
    setupScrollEffects() {
        let ticking = false;

        const updateScrollEffects = () => {
            const scrolled = window.pageYOffset;
            
            // Parallax elements
            document.querySelectorAll('.floating-element').forEach((element, index) => {
                const speed = 0.5 + (index * 0.1);
                element.style.transform = `translateY(${scrolled * speed}px)`;
            });

            // Navbar background opacity
            const navbar = document.querySelector('.navbar');
            if (navbar) {
                const opacity = Math.min(scrolled / 100, 1);
                navbar.style.background = `rgba(10, 14, 39, ${0.95 + opacity * 0.05})`;
            }

            ticking = false;
        };

        const requestTick = () => {
            if (!ticking) {
                requestAnimationFrame(updateScrollEffects);
                ticking = true;
            }
        };

        window.addEventListener('scroll', requestTick);
    }

    // Form Validation
    setupFormValidation() {
        const forms = document.querySelectorAll('form');
        forms.forEach(form => {
            form.addEventListener('submit', this.handleFormSubmit.bind(this));
        });

        // Real-time validation
        const inputs = document.querySelectorAll('input[type="text"], input[type="url"]');
        inputs.forEach(input => {
            input.addEventListener('input', this.handleInputValidation.bind(this));
            input.addEventListener('blur', this.handleInputBlur.bind(this));
        });
    }

    handleFormSubmit(e) {
        const form = e.target;
        const submitBtn = form.querySelector('button[type="submit"]');
        
        if (submitBtn) {
            // Add loading state
            const originalText = submitBtn.innerHTML;
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin" style="margin-right: 0.5rem;"></i>Processing...';
            submitBtn.disabled = true;
            
            // Reset after 3 seconds (in case of error)
            setTimeout(() => {
                submitBtn.innerHTML = originalText;
                submitBtn.disabled = false;
            }, 3000);
        }
    }

    handleInputValidation(e) {
        const input = e.target;
        const value = input.value.trim();
        
        // URL validation
        if (input.type === 'url' || input.name === 'url') {
            const urlPattern = /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/;
            const isValid = urlPattern.test(value);
            
            this.updateInputState(input, isValid);
        }
    }

    handleInputBlur(e) {
        const input = e.target;
        const value = input.value.trim();
        
        if (value === '') {
            this.resetInputState(input);
        }
    }

    updateInputState(input, isValid) {
        if (isValid) {
            input.style.borderColor = '#10b981';
            input.style.boxShadow = '0 0 0 3px rgba(16, 185, 129, 0.1)';
        } else {
            input.style.borderColor = '#ef4444';
            input.style.boxShadow = '0 0 0 3px rgba(239, 68, 68, 0.1)';
        }
    }

    resetInputState(input) {
        input.style.borderColor = '';
        input.style.boxShadow = '';
    }

    // Counter Animations
    setupCounters() {
        this.counterElements = document.querySelectorAll('.stat-number[data-count]');
    }

    animateCounters() {
        this.counterElements.forEach(counter => {
            const target = parseInt(counter.getAttribute('data-count'));
            const duration = 2000;
            const increment = target / (duration / 16);
            let current = 0;
            
            const timer = setInterval(() => {
                current += increment;
                if (current >= target) {
                    current = target;
                    clearInterval(timer);
                }
                counter.textContent = Math.floor(current).toLocaleString();
            }, 16);
        });
    }

    // Chart Initialization
    setupCharts() {
        this.charts = new Map();
    }

    initCharts() {
        // Threat Detection Chart
        const threatCtx = document.getElementById('threatChart');
        if (threatCtx && !this.charts.has('threat')) {
            this.createThreatChart(threatCtx);
        }

        // Category Chart
        const categoryCtx = document.getElementById('categoryChart');
        if (categoryCtx && !this.charts.has('category')) {
            this.createCategoryChart(categoryCtx);
        }
    }

    createThreatChart(ctx) {
        const chart = new Chart(ctx, {
            type: 'line',
            data: {
                labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
                datasets: [{
                    label: 'Threats Detected',
                    data: [12, 19, 3, 5, 2, 3],
                    borderColor: '#ef4444',
                    backgroundColor: 'rgba(239, 68, 68, 0.1)',
                    borderWidth: 3,
                    fill: true,
                    tension: 0.4
                }, {
                    label: 'Safe URLs',
                    data: [45, 52, 38, 42, 48, 55],
                    borderColor: '#10b981',
                    backgroundColor: 'rgba(16, 185, 129, 0.1)',
                    borderWidth: 3,
                    fill: true,
                    tension: 0.4
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        labels: {
                            color: '#e2e8f0'
                        }
                    }
                },
                scales: {
                    x: {
                        ticks: {
                            color: '#94a3b8'
                        },
                        grid: {
                            color: 'rgba(255, 255, 255, 0.1)'
                        }
                    },
                    y: {
                        ticks: {
                            color: '#94a3b8'
                        },
                        grid: {
                            color: 'rgba(255, 255, 255, 0.1)'
                        }
                    }
                }
            }
        });
        
        this.charts.set('threat', chart);
    }

    createCategoryChart(ctx) {
        const chart = new Chart(ctx, {
            type: 'doughnut',
            data: {
                labels: ['Safe', 'Suspicious', 'Malicious'],
                datasets: [{
                    data: [75, 20, 5],
                    backgroundColor: [
                        '#10b981',
                        '#f59e0b',
                        '#ef4444'
                    ],
                    borderWidth: 0
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        position: 'bottom',
                        labels: {
                            color: '#e2e8f0',
                            padding: 20
                        }
                    }
                }
            }
        });
        
        this.charts.set('category', chart);
    }

    // Search Functionality
    setupSearch() {
        const searchInput = document.getElementById('searchInput');
        if (searchInput) {
            searchInput.addEventListener('input', this.handleSearch.bind(this));
        }
    }

    handleSearch(e) {
        const searchTerm = e.target.value.toLowerCase();
        const tableRows = document.querySelectorAll('.prediction-row');
        
        tableRows.forEach(row => {
            const urlText = row.querySelector('.url-link')?.textContent.toLowerCase() || '';
            const suggestionText = row.querySelector('.suggestion-link')?.textContent.toLowerCase() || '';
            
            if (urlText.includes(searchTerm) || suggestionText.includes(searchTerm)) {
                row.style.display = '';
                row.style.animation = 'fadeInUp 0.3s ease';
            } else {
                row.style.display = 'none';
            }
        });
    }

    // Parallax Effects
    setupParallax() {
        let ticking = false;

        const updateParallax = () => {
            const scrolled = window.pageYOffset;
            
            document.querySelectorAll('.floating-element').forEach((element, index) => {
                const speed = 0.5 + (index * 0.1);
                element.style.transform = `translateY(${scrolled * speed}px) rotate(${scrolled * 0.1}deg)`;
            });

            ticking = false;
        };

        const requestTick = () => {
            if (!ticking) {
                requestAnimationFrame(updateParallax);
                ticking = true;
            }
        };

        window.addEventListener('scroll', requestTick);
    }

    // Utility Methods
    debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }

    throttle(func, limit) {
        let inThrottle;
        return function() {
            const args = arguments;
            const context = this;
            if (!inThrottle) {
                func.apply(context, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        };
    }
}

// Carousel Enhancement
class ModernCarousel {
    constructor(carouselId) {
        this.carousel = document.getElementById(carouselId);
        this.interval = null;
        this.isPaused = false;
        
        if (this.carousel) {
            this.init();
        }
    }

    init() {
        this.startAutoPlay();
        this.setupEventListeners();
    }

    startAutoPlay() {
        this.interval = setInterval(() => {
            if (!this.isPaused) {
                const nextButton = this.carousel.querySelector('.carousel-control-next');
                if (nextButton) {
                    nextButton.click();
                }
            }
        }, 5000);
    }

    setupEventListeners() {
        // Pause on hover
        this.carousel.addEventListener('mouseenter', () => {
            this.isPaused = true;
        });

        this.carousel.addEventListener('mouseleave', () => {
            this.isPaused = false;
        });

        // Touch/swipe support
        let startX = 0;
        let endX = 0;

        this.carousel.addEventListener('touchstart', (e) => {
            startX = e.touches[0].clientX;
        });

        this.carousel.addEventListener('touchend', (e) => {
            endX = e.changedTouches[0].clientX;
            this.handleSwipe(startX, endX);
        });
    }

    handleSwipe(startX, endX) {
        const threshold = 50;
        const diff = startX - endX;

        if (Math.abs(diff) > threshold) {
            if (diff > 0) {
                // Swipe left - next slide
                const nextButton = this.carousel.querySelector('.carousel-control-next');
                if (nextButton) nextButton.click();
            } else {
                // Swipe right - previous slide
                const prevButton = this.carousel.querySelector('.carousel-control-prev');
                if (prevButton) prevButton.click();
            }
        }
    }
}

// Result Animation Handler
class ResultAnimator {
    constructor() {
        this.init();
    }

    init() {
        // Check if we're on the result page
        if (document.getElementById('resultIndicator')) {
            this.animateResult();
        }
    }

    animateResult() {
        // Get prediction data from server
        const predictionElement = document.querySelector('script');
        const scriptContent = predictionElement ? predictionElement.textContent : '';
        
        // Extract prediction value (this would need to be adapted based on your server-side implementation)
        const predictionMatch = scriptContent.match(/let x = '([^']+)'/);
        if (predictionMatch) {
            const x = parseFloat(predictionMatch[1]);
            this.updateResultUI(x);
        }
    }

    updateResultUI(x) {
        const resultIndicator = document.getElementById('resultIndicator');
        const resultIcon = document.getElementById('resultIcon');
        const resultText = document.getElementById('resultText');
        const confidenceText = document.getElementById('confidenceText');
        const confidenceBar = document.getElementById('confidenceBar');

        if (!resultIndicator) return;

        let num = x * 100;
        let isSafe = false;

        // Determine if URL is safe
        if (x <= 1 && x >= 0.50) {
            isSafe = true;
        } else if (0 <= x && x < 0.50) {
            isSafe = false;
            num = 100 - num;
        }

        // Update UI with animation
        setTimeout(() => {
            if (isSafe) {
                resultIndicator.className = 'result-indicator result-safe';
                resultIcon.className = 'fas fa-shield-check result-icon';
                resultText.textContent = 'This Website is Safe';
                confidenceText.textContent = `${Math.round(num)}% Confidence`;
                confidenceBar.className = 'confidence-fill confidence-safe';
            } else {
                resultIndicator.className = 'result-indicator result-unsafe';
                resultIcon.className = 'fas fa-exclamation-triangle result-icon';
                resultText.textContent = 'This Website May Be Unsafe';
                confidenceText.textContent = `${Math.round(num)}% Risk Level`;
                confidenceBar.className = 'confidence-fill confidence-unsafe';
            }

            // Animate confidence bar
            setTimeout(() => {
                confidenceBar.style.width = `${Math.round(num)}%`;
            }, 500);
        }, 1000);
    }
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Initialize main UI
    new ModernUI();
    
    // Initialize carousel if present
    if (document.getElementById('heroCarousel')) {
        new ModernCarousel('heroCarousel');
    }
    
    // Initialize result animator if on result page
    new ResultAnimator();
    
    // Add custom CSS animations
    const style = document.createElement('style');
    style.textContent = `
        @keyframes fadeInUp {
            from {
                opacity: 0;
                transform: translateY(20px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }
        
        @keyframes pulse {
            0%, 100% {
                transform: scale(1);
            }
            50% {
                transform: scale(1.05);
            }
        }
        
        @keyframes float {
            0%, 100% {
                transform: translateY(0px) rotate(0deg);
            }
            50% {
                transform: translateY(-20px) rotate(180deg);
            }
        }
        
        .animate-pulse {
            animation: pulse 2s infinite;
        }
        
        .animate-float {
            animation: float 6s ease-in-out infinite;
        }
    `;
    document.head.appendChild(style);
});

// Export for potential module usage
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { ModernUI, ModernCarousel, ResultAnimator };
}
