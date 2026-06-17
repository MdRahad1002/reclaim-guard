// ================================
// Mobile Menu Toggle
// ================================
const mobileMenuBtn = document.getElementById('mobileMenuBtn');
const navMenu = document.getElementById('navMenu');

if (mobileMenuBtn) {
    mobileMenuBtn.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        mobileMenuBtn.classList.toggle('active');
    });

    // Close mobile menu when clicking on a nav link or the CTA button
    const navLinks = navMenu.querySelectorAll('.nav-link, .btn-primary');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
            mobileMenuBtn.classList.remove('active');
        });
    });

    // Close mobile menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!navMenu.contains(e.target) && !mobileMenuBtn.contains(e.target)) {
            navMenu.classList.remove('active');
            mobileMenuBtn.classList.remove('active');
        }
    });
}

// ================================
// Smooth Scrolling for Anchor Links
// ================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offsetTop = target.offsetTop - 80; // Account for fixed navbar
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// ================================
// FAQ Accordion
// ================================
const faqItems = document.querySelectorAll('.faq-item');

faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');
    // The second FAQ section uses native <details>/<summary> (no .faq-question) skip those.
    if (!question) return;

    question.addEventListener('click', () => {
        // Close other open items
        faqItems.forEach(otherItem => {
            if (otherItem !== item && otherItem.classList.contains('active')) {
                otherItem.classList.remove('active');
            }
        });
        
        // Toggle current item
        item.classList.toggle('active');
    });
});

// ================================
// Contact Form Submission
// ================================
const contactForm = document.getElementById('contactForm');

if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        // Validate all fields (both steps) before submitting
        if (!validateScope(contactForm)) return;

        // Get form data
        const formData = new FormData(contactForm);
        const data = Object.fromEntries(formData.entries());
        // Combine country code + phone number
        const phoneCodeEl = document.getElementById('phoneCode');
        if (phoneCodeEl) {
            data.phone = phoneCodeEl.value + ' ' + (data.phone || '').trim();
        }
        
        // Show loading state
        const submitBtn = contactForm.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;
        submitBtn.textContent = 'Submitting...';
        submitBtn.disabled = true;
        
        try {
            const response = await fetch('/api/leads', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data)
            });
            
            const result = await response.json();
            
            if (response.ok) {
                // Redirect to thank-you page
                window.location.href = '/thank-you';
            } else {
                alert('❌ ' + (result.error || 'There was an error submitting your form. Please try again or contact us directly at support@reclaim-guard.com'));
            }
        } catch (error) {
            console.error('Error:', error);
            alert('❌ Could not connect to server. Please ensure the server is running or contact us directly at support@reclaim-guard.com');
        } finally {
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
        }
    });
}

// ================================
// Multi-step Contact Form
// ================================
// Validate every required field inside `scope`; focus + report the first
// invalid one. Works with the form's `novalidate` attribute (hidden steps
// would otherwise throw "invalid control is not focusable" on submit).
function validateScope(scope) {
    const fields = scope.querySelectorAll('input[required], select[required], textarea[required]');
    for (const field of fields) {
        if (!field.checkValidity()) {
            field.reportValidity();
            field.focus();
            return false;
        }
    }
    return true;
}

(function initMultiStepForm() {
    const form = document.getElementById('contactForm');
    if (!form) return;
    const steps = form.querySelectorAll('.form-step');
    const indicators = form.querySelectorAll('.form-step-indicator');
    const fill = form.querySelector('#formProgressFill');
    const continueBtn = form.querySelector('.form-continue-btn');
    const backBtn = form.querySelector('.form-back-btn');
    if (steps.length < 2 || !continueBtn) return;

    function showStep(n) {
        steps.forEach(s => { s.style.display = (s.dataset.step === String(n)) ? '' : 'none'; });
        indicators.forEach(i => { i.style.display = (i.dataset.step === String(n)) ? '' : 'none'; });
        if (fill) fill.style.width = (n === 2) ? '100%' : '50%';
    }

    continueBtn.addEventListener('click', () => {
        const step1 = form.querySelector('.form-step[data-step="1"]');
        if (!validateScope(step1)) return;
        showStep(2);
        // Bring the form heading back into view on the smaller second step.
        form.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });

    if (backBtn) {
        backBtn.addEventListener('click', () => {
            showStep(1);
            form.scrollIntoView({ behavior: 'smooth', block: 'start' });
        });
    }

    showStep(1);
})();

// ================================
// Navbar Background on Scroll
// ================================
const navbar = document.querySelector('.navbar');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    // Add shadow when scrolled
    if (currentScroll > 50) {
        navbar.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.15)';
    } else {
        navbar.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.1)';
    }
    
    lastScroll = currentScroll;
});

// ================================
// Animate Elements on Scroll
// ================================
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe service cards, testimonials, and other elements
const animatedElements = document.querySelectorAll('.service-card, .testimonial-card, .tech-feature, .process-step');
animatedElements.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});

// ================================
// Counter Animation for Stats
// ================================
function animateCounter(element, target, suffix = '') {
    let current = 0;
    const increment = target / 50;
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = target + suffix;
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(current) + suffix;
        }
    }, 30);
}

// Trigger counter animation when stats come into view
const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting && !entry.target.dataset.animated) {
            const statNumbers = entry.target.querySelectorAll('.stat-number, .stat-value, .tech-stat-number');
            statNumbers.forEach(stat => {
                const text = stat.textContent;
                const match = text.match(/[\d,]+/);
                if (match) {
                    const number = parseInt(match[0].replace(/,/g, ''));
                    const suffix = text.replace(/[\d,]+/, '');
                    animateCounter(stat, number, suffix);
                }
            });
            entry.target.dataset.animated = 'true';
        }
    });
}, { threshold: 0.5 });

// Observe stats sections
const statsSections = document.querySelectorAll('.hero-stats, .stats-card, .tech-stats');
statsSections.forEach(section => statsObserver.observe(section));

// ================================
// Form Validation
// ================================
function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

function validatePhone(phone) {
    const re = /^[\d\s\-\+\(\)]+$/;
    return re.test(phone) && phone.replace(/\D/g, '').length >= 10;
}

if (contactForm) {
    const emailInput = contactForm.querySelector('#email');
    const phoneInput = contactForm.querySelector('#phone');
    const amountInput = contactForm.querySelector('#amount');
    
    emailInput.addEventListener('blur', () => {
        if (!validateEmail(emailInput.value)) {
            emailInput.style.borderColor = '#F44336';
            showFieldError(emailInput, 'Please enter a valid email address');
        } else {
            emailInput.style.borderColor = '#00C853';
            removeFieldError(emailInput);
        }
    });
    
    phoneInput.addEventListener('blur', () => {
        if (!validatePhone(phoneInput.value)) {
            phoneInput.style.borderColor = '#F44336';
            showFieldError(phoneInput, 'Please enter a valid phone number');
        } else {
            phoneInput.style.borderColor = '#00C853';
            removeFieldError(phoneInput);
        }
    });
    
    amountInput.addEventListener('blur', () => {
        if (parseInt(amountInput.value) < 0) {
            amountInput.style.borderColor = '#F44336';
            showFieldError(amountInput, 'Please enter a valid amount');
        } else {
            amountInput.style.borderColor = '#00C853';
            removeFieldError(amountInput);
        }
    });
}

function showFieldError(field, message) {
    removeFieldError(field);
    const errorDiv = document.createElement('div');
    errorDiv.className = 'field-error';
    errorDiv.style.color = '#F44336';
    errorDiv.style.fontSize = '0.875rem';
    errorDiv.style.marginTop = '0.25rem';
    errorDiv.textContent = message;
    field.parentElement.appendChild(errorDiv);
}

function removeFieldError(field) {
    const errorDiv = field.parentElement.querySelector('.field-error');
    if (errorDiv) {
        errorDiv.remove();
    }
}

// ================================
// Floating Action Button Hide on Scroll Down
// ================================
const fab = document.querySelector('.fab');
let fabLastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > fabLastScroll && currentScroll > 500) {
        // Scrolling down
        fab.style.transform = 'translateY(100px)';
        fab.style.opacity = '0';
    } else {
        // Scrolling up
        fab.style.transform = 'translateY(0)';
        fab.style.opacity = '1';
    }
    
    fabLastScroll = currentScroll;
});

// ================================
// Lazy Loading for Images (if you add images later)
// ================================
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                if (img.dataset.src) {
                    img.src = img.dataset.src;
                    img.classList.add('loaded');
                    observer.unobserve(img);
                }
            }
        });
    });
    
    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
}

// ================================
// Back to Top Button
// ================================
function createBackToTopButton() {
    const backToTop = document.createElement('button');
    backToTop.innerHTML = '↑';
    backToTop.className = 'back-to-top';
    backToTop.style.cssText = `
        position: fixed;
        bottom: 100px;
        right: 30px;
        width: 50px;
        height: 50px;
        background: #0066FF;
        color: white;
        border: none;
        border-radius: 50%;
        font-size: 1.5rem;
        cursor: pointer;
        opacity: 0;
        visibility: hidden;
        transition: all 0.3s ease;
        z-index: 998;
    `;
    
    document.body.appendChild(backToTop);
    
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 500) {
            backToTop.style.opacity = '1';
            backToTop.style.visibility = 'visible';
        } else {
            backToTop.style.opacity = '0';
            backToTop.style.visibility = 'hidden';
        }
    });
    
    backToTop.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// Create back to top button on desktop
if (window.innerWidth > 768) {
    createBackToTopButton();
}

// ================================
// Performance Optimization
// ================================
// Debounce function for scroll events
function debounce(func, wait) {
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

// ================================
// Cookie Consent
// ================================
// Handled by analytics.js (Google Consent Mode v2 Accept/Reject banner).

// ================================
// Print Page Optimization
// ================================
window.addEventListener('beforeprint', () => {
    document.querySelectorAll('.navbar, .fab, .back-to-top').forEach(el => {
        el.style.display = 'none';
    });
});

window.addEventListener('afterprint', () => {
    document.querySelectorAll('.navbar, .fab, .back-to-top').forEach(el => {
        el.style.display = '';
    });
});

// ================================
// Console Warning
// ================================
console.log('%cCryptoRecovery Legal', 'font-size: 24px; font-weight: bold; color: #0066FF;');
console.log('%c⚠️ Warning: Do not paste any code here unless you know what you are doing. Scammers may try to trick you into compromising your security.', 'font-size: 14px; color: #F44336;');

// ================================
// Initialize on Load
// ================================
document.addEventListener('DOMContentLoaded', () => {
    console.log('Website initialized successfully');
    
    // Set current year in footer if needed
    const yearElements = document.querySelectorAll('.current-year');
    yearElements.forEach(el => {
        el.textContent = new Date().getFullYear();
    });

    // ── Phone flag updates when country code changes ─────────────────────
    const phoneCodeSel = document.getElementById('phoneCode');
    const phoneFlagImg = document.getElementById('phoneFlag');
    if (phoneCodeSel && phoneFlagImg) {
        phoneCodeSel.addEventListener('change', () => {
            const iso = phoneCodeSel.options[phoneCodeSel.selectedIndex].dataset.iso;
            if (iso) {
                phoneFlagImg.src = `https://flagcdn.com/20x15/${iso}.png`;
                phoneFlagImg.alt = iso.toUpperCase();
            }
        });
    }
});
