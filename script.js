// ================================
// Mobile Menu Toggle
// ================================
const mobileMenuBtn = document.getElementById('mobileMenuBtn');
const navMenu = document.getElementById('navMenu');

if (mobileMenuBtn) {
    const closeMenu = () => {
        navMenu.classList.remove('active');
        mobileMenuBtn.classList.remove('active');
        document.body.classList.remove('menu-open');
    };

    mobileMenuBtn.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        mobileMenuBtn.classList.toggle('active');
        // Lock the page behind so only the menu scrolls while it's open.
        document.body.classList.toggle('menu-open', navMenu.classList.contains('active'));
    });

    // Close mobile menu when clicking on a nav link or the CTA button
    navMenu.querySelectorAll('.nav-link, .btn-primary').forEach(link => {
        link.addEventListener('click', closeMenu);
    });

    // Close mobile menu when clicking outside
    document.addEventListener('click', (e) => {
        if (navMenu.classList.contains('active') &&
            !navMenu.contains(e.target) && !mobileMenuBtn.contains(e.target)) {
            closeMenu();
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
// Hero lead form (short, above the fold). Submits to the same endpoint and
// redirects to /thank-you on success so the existing conversion tracking fires.
// ================================
const heroForm = document.getElementById('heroForm');
if (heroForm) {
    heroForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        if (!validateScope(heroForm)) return;

        const data = Object.fromEntries(new FormData(heroForm).entries());
        const codeEl = document.getElementById('heroPhoneCode');
        if (codeEl) data.phone = codeEl.value + ' ' + (data.phone || '').trim();

        const submitBtn = heroForm.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;
        submitBtn.textContent = 'Submitting...';
        submitBtn.disabled = true;
        try {
            const response = await fetch('/api/leads', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data)
            });
            const result = await response.json();
            if (response.ok) {
                window.location.href = '/thank-you';
            } else {
                alert('❌ ' + (result.error || 'There was an error. Please try again, WhatsApp us, or call us directly.'));
            }
        } catch (error) {
            console.error('Error:', error);
            alert('❌ Could not connect to the server. Please try WhatsApp or call us directly.');
        } finally {
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
        }
    });
}

// Hero form: two-step navigation (case details -> contact details).
(function () {
    const form = document.getElementById('heroForm');
    if (!form) return;
    const step1 = form.querySelector('.form-step[data-step="1"]');
    const step2 = form.querySelector('.form-step[data-step="2"]');
    if (!step1 || !step2) return;
    const ind1 = form.querySelector('.form-step-indicator[data-step="1"]');
    const ind2 = form.querySelector('.form-step-indicator[data-step="2"]');
    const fill = document.getElementById('heroProgressFill');
    const contBtn = form.querySelector('.form-continue-btn');
    const backBtn = form.querySelector('.form-back-btn');
    function show(n) {
        step1.style.display = n === 1 ? '' : 'none';
        step2.style.display = n === 2 ? '' : 'none';
        if (ind1) ind1.style.display = n === 1 ? '' : 'none';
        if (ind2) ind2.style.display = n === 2 ? '' : 'none';
        if (fill) fill.style.width = n === 2 ? '100%' : '50%';
    }
    show(1);
    if (contBtn) contBtn.addEventListener('click', function () {
        if (!validateScope(step1)) return;
        show(2);
        const f = step2.querySelector('input, select, textarea');
        if (f) { try { f.focus(); } catch (e) {} }
    });
    if (backBtn) backBtn.addEventListener('click', function () { show(1); });
})();

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

// Case Assessment Wizard: turns the form's case questions into a guided,
// one-question-per-screen flow (clickable options, auto-advance) that feels
// like an assessment, asking for personal details only at the end. It drives
// the existing hidden <select>s so the normal submit handler + conversion
// tracking are reused unchanged. Labels/options are read live from the DOM so
// the wizard stays localized even though i18n applies asynchronously.
(function initAssessmentWizard() {
    const form = document.getElementById('contactForm');
    if (!form) return;
    const step1 = form.querySelector('.form-step[data-step="1"]');
    const step2 = form.querySelector('.form-step[data-step="2"]');
    if (!step1 || !step2) return;

    const qDefs = [{ id: 'amount' }, { id: 'payment' }, { id: 'scamType' }, { id: 'when' }, { contact: true }]
        .filter(d => d.contact || form.querySelector('#' + d.id));
    const total = qDefs.length;
    let idx = 0;
    let inContact = null;

    function strings() {
        const isDE = (document.documentElement.lang || '').toLowerCase().indexOf('de') === 0;
        return isDE
            ? { back: '← Zurück', count: 'Frage %a von %b', contactQ: 'Stehen Sie noch mit den Betrügern in Kontakt?', yes: 'Ja', no: 'Nein', note: 'Noch in Kontakt' }
            : { back: '← Back', count: 'Question %a of %b', contactQ: 'Are you still in contact with them?', yes: 'Yes', no: 'No', note: 'Still in contact' };
    }
    function cleanLabel(s) {
        return (s || '').replace(/\s*\(optional\)\s*/ig, '').replace(/\s*\*\s*$/, '').trim();
    }
    function questionData(def) {
        const T = strings();
        if (def.contact) {
            return { title: T.contactQ, opts: [{ v: 'yes', l: T.yes }, { v: 'no', l: T.no }], selected: inContact };
        }
        const sel = form.querySelector('#' + def.id);
        const label = form.querySelector('label[for="' + def.id + '"]');
        const opts = Array.prototype.slice.call(sel.options).filter(o => o.value).map(o => ({ v: o.value, l: o.textContent }));
        return { title: cleanLabel(label && label.textContent), opts: opts, selected: sel.value };
    }

    // Hide the original step-1 UI + progress; the selects stay in the DOM
    // (display:none still submits their values).
    step1.style.display = 'none';
    step2.style.display = 'none';
    const origProgress = form.querySelector('.form-progress');
    if (origProgress) origProgress.style.display = 'none';

    const wiz = document.createElement('div');
    wiz.className = 'wizard';
    wiz.innerHTML =
        '<div class="wiz-progress"><span class="wiz-progress-fill"></span></div>' +
        '<div class="wiz-count"></div>' +
        '<h4 class="wiz-question"></h4>' +
        '<div class="wiz-options"></div>' +
        '<button type="button" class="wiz-back"></button>';
    step1.parentNode.insertBefore(wiz, step1);

    const elFill = wiz.querySelector('.wiz-progress-fill');
    const elCount = wiz.querySelector('.wiz-count');
    const elQ = wiz.querySelector('.wiz-question');
    const elOpts = wiz.querySelector('.wiz-options');
    const elBack = wiz.querySelector('.wiz-back');

    function render() {
        const T = strings();
        const def = qDefs[idx];
        const data = questionData(def);
        elFill.style.width = Math.round((idx / total) * 100) + '%';
        elCount.textContent = T.count.replace('%a', idx + 1).replace('%b', total);
        elQ.textContent = data.title;
        elOpts.innerHTML = '';
        data.opts.forEach(o => {
            const b = document.createElement('button');
            b.type = 'button';
            b.className = 'wiz-option' + (data.selected === o.v ? ' selected' : '');
            b.textContent = o.l;
            b.addEventListener('click', () => {
                if (def.contact) inContact = o.v;
                else form.querySelector('#' + def.id).value = o.v;
                if (idx < total - 1) { idx++; render(); }
                else { toDetails(); }
            });
            elOpts.appendChild(b);
        });
        elBack.textContent = T.back;
        elBack.style.visibility = idx === 0 ? 'hidden' : 'visible';
    }

    elBack.addEventListener('click', () => { if (idx > 0) { idx--; render(); } });

    function toDetails() {
        wiz.style.display = 'none';
        step2.style.display = '';
        form.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }

    // Details step "Back" returns to the last wizard question.
    const backBtn = step2.querySelector('.form-back-btn');
    if (backBtn) {
        const fresh = backBtn.cloneNode(true);
        backBtn.parentNode.replaceChild(fresh, backBtn);
        fresh.addEventListener('click', function (e) {
            e.preventDefault();
            step2.style.display = 'none';
            wiz.style.display = '';
            idx = total - 1;
            render();
        });
    }

    // Fold the "still in contact" answer into the message field just before
    // the existing submit handler reads it (capture runs before bubble).
    form.addEventListener('submit', function () {
        if (!inContact) return;
        const T = strings();
        const msg = form.querySelector('#message');
        if (!msg) return;
        const note = T.note + ': ' + (inContact === 'yes' ? T.yes : T.no);
        if (msg.value.indexOf(T.note) === -1) msg.value = msg.value ? (note + '. ' + msg.value) : note;
    }, true);

    render();
    setTimeout(render, 500);   // re-read once i18n (async geo) has localized
    setTimeout(render, 1400);
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

if (fab) {
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
}

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
    [['phoneCode', 'phoneFlag'], ['heroPhoneCode', 'heroPhoneFlag']].forEach(([selId, flagId]) => {
        const sel = document.getElementById(selId);
        const flag = document.getElementById(flagId);
        if (!sel || !flag) return;
        sel.addEventListener('change', () => {
            const iso = sel.options[sel.selectedIndex].dataset.iso;
            if (iso) {
                flag.src = `/assets/flags/${iso}.png`;
                flag.alt = iso.toUpperCase();
            }
        });
    });
});
