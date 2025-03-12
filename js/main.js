// Initialize EmailJS
function initEmailJS() {
    emailjs.init("service_xxmpp6r"); // Replace with your EmailJS Public Key
}

// Theme Toggle
function initTheme() {
  const themeToggle = document.getElementById('themeToggle');
  const html = document.documentElement;
  const currentTheme = localStorage.getItem('theme') || 'light';

  if (!themeToggle) return; // Prevent errors if the button is missing

  html.setAttribute('data-theme', currentTheme);
  updateThemeIcon(currentTheme);

  themeToggle.addEventListener('click', () => {
    const newTheme = html.getAttribute('data-theme') === 'light' ? 'dark' : 'light';
    html.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    updateThemeIcon(newTheme);

    // Prevent excessive ripple elements
    const existingRipple = document.querySelector('.theme-ripple');
    if (existingRipple) existingRipple.remove();

    const ripple = document.createElement('div');
    ripple.classList.add('theme-ripple');
    document.body.appendChild(ripple);
    setTimeout(() => ripple.remove(), 1000);
  });
}

function updateThemeIcon(theme) {
  const themeToggle = document.getElementById('themeToggle');
  if (themeToggle) {
    themeToggle.textContent = theme === 'light' ? '🌓' : '☀️';
  }
}

// Navigation Toggle
function initNavigation() {
  const navToggle = document.getElementById('navToggle');
  const navLinks = document.querySelector('.nav-links');

  if (!navToggle || !navLinks) return; // Prevent errors

  navToggle.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    navToggle.classList.toggle('active');
  });

  document.addEventListener('click', (e) => {
    if (!e.target.closest('.navbar')) {
      navLinks.classList.remove('active');
      navToggle.classList.remove('active');
    }
  });
}

// Service Price Calculator
function initPriceCalculator() {
  const serviceSelect = document.getElementById('service');
  const hoursInput = document.getElementById('hours');
  const totalPrice = document.getElementById('total-price');

  if (!serviceSelect || !hoursInput || !totalPrice) return;

  const baseRates = { home: 15, office: 20, tenancy: 25 };

  const updatePrice = () => {
    const service = serviceSelect.value;
    const hours = parseInt(hoursInput.value) || 0;
    totalPrice.textContent = `£${(baseRates[service] || 0) * hours}`;
  };

  serviceSelect.addEventListener('change', updatePrice);
  hoursInput.addEventListener('input', updatePrice);
}

// Form Validation with Animations
function handleForms() {
  const forms = document.querySelectorAll('form');

  forms.forEach(form => {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const submitBtn = form.querySelector('button[type="submit"]');
      submitBtn.style.animation = 'pulse 0.5s ease';

      const inputs = form.querySelectorAll('.form-input');
      let isValid = true;

      // Remove old error messages
      form.querySelectorAll('.error-message').forEach(msg => msg.remove());

      inputs.forEach(input => {
        if (!input.value.trim()) {
          isValid = false;
          input.classList.add('error');
          input.style.animation = 'shake 0.5s ease';

          // Create and append error message
          const errorMsg = document.createElement('div');
          errorMsg.className = 'error-message';
          errorMsg.textContent = 'This field is required';
          input.parentNode.appendChild(errorMsg);

          setTimeout(() => {
            input.classList.remove('error');
            errorMsg.remove();
          }, 3000);
        }
      });

      if (isValid) {
                // Collect form data
                let formData = {
                    from_name: form.querySelector('#name')?.value || 'User',
                    from_email: form.querySelector('#email')?.value || '',
                    message: form.querySelector('#message')?.value || 'No message provided'
                };

                // Send email using EmailJS
                emailjs.send("service_xxmpp6r", "template_bu4i4i3", formData)
                    .then(response => {
                        console.log("SUCCESS!", response);
                        alert("Email sent successfully!");
                    }, error => {
                        console.log("FAILED...", error);
                        alert("Failed to send email. Please try again.");
                    });

                // Show success message
                const successMsg = document.createElement('div');
                successMsg.className = 'success-message';
                successMsg.textContent = 'Form submitted successfully!';
                form.appendChild(successMsg);

                // Reset form
                setTimeout(() => {
                    form.reset();
                    successMsg.remove();
                }, 3000);
            }
        });
    });
}

// Scroll Animations
function initScrollAnimations() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, { threshold: 0.1 });

  document.querySelectorAll('.animate-on-scroll').forEach(el => observer.observe(el));
}

// Smooth Scroll
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const section = document.querySelector(this.getAttribute('href'));
      if (section) {
        section.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });
}

// Initialize all features
document.addEventListener('DOMContentLoaded', () => {
  initEmailJS();
  initTheme();
  initNavigation();
  handleForms();
  initPriceCalculator();
  initScrollAnimations();
  initSmoothScroll();
});

