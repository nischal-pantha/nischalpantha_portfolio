// Typewriter effect
// Performance API polyfill and fixes
if (!window.performance) window.performance = {};
if (!performance.clearMarks) performance.clearMarks = function(mark) {};
if (!performance.clearMeasures) performance.clearMeasures = function(measure) {};
if (!performance.mark) performance.mark = function(mark) {};
if (!performance.measure) performance.measure = function(measure, start, end) {};

const typewriterText = "Pilot & Founder of NamesTech";
const typewriterElement = document.getElementById('typewriter-text');
let i = 0;

function typeWriter() {
    if (i < typewriterText.length) {
        typewriterElement.innerHTML += typewriterText.charAt(i);
        i++;
        setTimeout(typeWriter, 100);
    }
}

// Start typewriter after header animation
setTimeout(typeWriter, 1000);

// Scroll Progress Bar
window.addEventListener('scroll', () => {
    const scrollTop = window.pageYOffset;
    const docHeight = document.body.offsetHeight - window.innerHeight;
    const scrollPercent = (scrollTop / docHeight) * 100;
    document.getElementById('scroll-progress').style.width = scrollPercent + '%';
});

// Dark Mode Toggle
const themeToggle = document.getElementById('theme-toggle');
const body = document.body;

themeToggle.addEventListener('click', () => {
    body.classList.toggle('dark-mode');
    const icon = themeToggle.querySelector('i');
    if (body.classList.contains('dark-mode')) {
        icon.className = 'fas fa-sun';
        localStorage.setItem('theme', 'dark');
    } else {
        icon.className = 'fas fa-moon';
        localStorage.setItem('theme', 'light');
    }
});

// Load saved theme
const savedTheme = localStorage.getItem('theme');
if (savedTheme === 'dark') {
    body.classList.add('dark-mode');
    themeToggle.querySelector('i').className = 'fas fa-sun';
}

// Hide loading screen
const loadingScreen = document.getElementById('loading-screen');
function hideLoadingScreen() {
    if (!loadingScreen) return;
    try {
        loadingScreen.classList.add('hide');
        loadingScreen.style.opacity = '0';
        loadingScreen.style.pointerEvents = 'none';
        setTimeout(() => {
            loadingScreen.style.display = 'none';
        }, 600);
    } catch (error) {
        console.error('Error hiding loading screen:', error);
        if (loadingScreen) {
            loadingScreen.style.display = 'none';
        }
    }
}

// If DOM is already ready, hide immediately
if (document.readyState === 'complete' || document.readyState === 'interactive') {
    hideLoadingScreen();
}

window.addEventListener('DOMContentLoaded', hideLoadingScreen);
window.addEventListener('load', hideLoadingScreen);

// Fail-safe: hide loading screen after 5 seconds even if load event didn't fire
setTimeout(hideLoadingScreen, 5000);

// Cursor Follower
const cursorFollower = document.getElementById('cursor-follower');
let mouseX = 0, mouseY = 0;
let followerX = 0, followerY = 0;

document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
});

function updateCursorFollower() {
    followerX += (mouseX - followerX) * 0.1;
    followerY += (mouseY - followerY) * 0.1;
    
    cursorFollower.style.left = followerX - 10 + 'px';
    cursorFollower.style.top = followerY - 10 + 'px';
    
    requestAnimationFrame(updateCursorFollower);
}

updateCursorFollower();

// Animated Counters for Skills
function animateCounters() {
    const counters = document.querySelectorAll('.skill-percentage');
    counters.forEach(counter => {
        const target = parseInt(counter.textContent);
        let current = 0;
        const increment = target / 100;
        
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                current = target;
                clearInterval(timer);
            }
            counter.textContent = Math.floor(current) + '%';
            counter.style.opacity = '1';
            counter.style.transform = 'translateY(0)';
        }, 20);
    });
}

// Trigger counters when skills section is in view
const skillsSection = document.getElementById('skills');
const skillsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animateCounters();
            skillsObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

skillsObserver.observe(skillsSection);

// Ripple effect on buttons and interactive elements
function createRipple(e) {
    const button = e.currentTarget;
    const ripple = document.createElement('span');
    const rect = button.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = e.clientX - rect.left - size / 2;
    const y = e.clientY - rect.top - size / 2;
    
    ripple.style.position = 'absolute';
    ripple.style.width = ripple.style.height = size + 'px';
    ripple.style.left = x + 'px';
    ripple.style.top = y + 'px';
    ripple.style.background = 'rgba(255, 255, 255, 0.5)';
    ripple.style.borderRadius = '50%';
    ripple.style.animation = 'ripple-animation 0.6s ease-out';
    ripple.style.pointerEvents = 'none';
    
    button.style.position = 'relative';
    button.style.overflow = 'hidden';
    button.appendChild(ripple);
    
    setTimeout(() => ripple.remove(), 600);
}

document.querySelectorAll('button').forEach(button => {
    button.addEventListener('click', createRipple);
});

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        target.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    });
});

// Active navigation highlighting
const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('nav a');

window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (pageYOffset >= sectionTop - sectionHeight / 3) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').slice(1) === current) {
            link.classList.add('active');
        }
    });
});

// Intersection Observer for scroll animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('in-view');
            
            // Animate child elements with stagger
            const children = entry.target.querySelectorAll('.skill, .timeline-item, .testimonial');
            anime({
                targets: children,
                opacity: [0, 1],
                translateY: [30, 0],
                delay: anime.stagger(200),
                duration: 800,
                easing: 'cubicBezier(0.25, 0.46, 0.45, 0.94)'
            });
        }
    });
}, observerOptions);

// Observe all sections
document.querySelectorAll('section').forEach(section => {
    observer.observe(section);
});

// Anime.js animations - wrapped in try-catch for safety
try {
    anime({
        targets: 'header',
        translateY: [-100, 0],
        opacity: [0, 1],
        duration: 1200,
        easing: 'cubicBezier(0.25, 0.46, 0.45, 0.94)'
    });

    anime({
        targets: '.logo-img',
        scale: [0, 1],
        rotate: [0, 360],
        duration: 2000,
        easing: 'cubicBezier(0.25, 0.46, 0.45, 0.94)'
    });
} catch (error) {
    console.warn('Animation error:', error);
}

// Staggered testimonial animations
const testimonialObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            anime({
                targets: entry.target,
                scale: [0.8, 1],
                opacity: [0, 1],
                duration: 800,
                easing: 'easeOutExpo'
            });
        }
    });
}, { threshold: 0.3 });

document.querySelectorAll('.testimonial').forEach(testimonial => {
    testimonialObserver.observe(testimonial);
});

// Animate skill bars on scroll
const skillObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const fills = entry.target.querySelectorAll('.skill-fill');
            fills.forEach(fill => {
                const width = fill.getAttribute('data-width');
                anime({
                    targets: fill,
                    width: width,
                    duration: 2000,
                    easing: 'cubicBezier(0.25, 0.46, 0.45, 0.94)'
                });
            });
        }
    });
});

document.querySelectorAll('.skill-bar').forEach(bar => {
    skillObserver.observe(bar);
});

// Ripple effect on buttons
function createRipple(e) {
    const button = e.currentTarget;
    const ripple = document.createElement('span');
    const rect = button.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = e.clientX - rect.left - size / 2;
    const y = e.clientY - rect.top - size / 2;
    
    ripple.style.position = 'absolute';
    ripple.style.width = ripple.style.height = size + 'px';
    ripple.style.left = x + 'px';
    ripple.style.top = y + 'px';
    ripple.style.background = 'rgba(255, 255, 255, 0.5)';
    ripple.style.borderRadius = '50%';
    ripple.style.animation = 'ripple-animation 0.6s ease-out';
    ripple.style.pointerEvents = 'none';
    
    button.style.position = 'relative';
    button.style.overflow = 'hidden';
    button.appendChild(ripple);
    
    setTimeout(() => ripple.remove(), 600);
}

document.querySelectorAll('button').forEach(button => {
    button.addEventListener('click', createRipple);
});

// Enhanced hover glow for skill cards
document.querySelectorAll('.skill').forEach(skill => {
    skill.addEventListener('mouseenter', () => {
        anime({
            targets: skill,
            boxShadow: '0 0 30px rgba(102, 126, 234, 0.6)',
            duration: 400,
            easing: 'easeOutQuad'
        });
    });
    
    skill.addEventListener('mouseleave', () => {
        anime({
            targets: skill,
            boxShadow: '0 8px 25px rgba(0, 0, 0, 0.15)',
            duration: 400,
            easing: 'easeOutQuad'
        });
    });
});

// Input focus animations
const formInputs = document.querySelectorAll('form input, form textarea');
formInputs.forEach((input) => {
    input.addEventListener('focus', () => {
        anime({
            targets: input,
            borderColor: '#667eea',
            duration: 300,
            easing: 'easeOutQuad'
        });
    });
    
    input.addEventListener('blur', () => {
        anime({
            targets: input,
            borderColor: '#e1e5e9',
            duration: 300,
            easing: 'easeOutQuad'
        });
    });
});

// Smooth reveal for paragraphs
document.querySelectorAll('section > p').forEach((p, index) => {
    p.style.opacity = '0';
    anime({
        targets: p,
        opacity: 1,
        duration: 800,
        delay: index * 100,
        easing: 'easeOutQuad'
    });
});

// Add ripple animation keyframe
const styleSheet = document.createElement('style');
styleSheet.textContent = `
    @keyframes ripple-animation {
        0% {
            transform: scale(0);
            opacity: 1;
        }
        100% {
            transform: scale(4);
            opacity: 0;
        }
    }
    
    @keyframes shimmer {
        0% { transform: translateX(-100%); }
        100% { transform: translateX(100%); }
    }
`;
document.head.appendChild(styleSheet);

// Modal for projects
const modal = document.createElement('div');
modal.id = 'modal';
modal.innerHTML = `
    <div class="modal-content">
        <span class="close">&times;</span>
        <h2>Skybound Details</h2>
        <p>Skybound is a cutting-edge app designed for pilots. It includes advanced features for training, planning, and operations.</p>
    </div>
`;
document.body.appendChild(modal);

const projectsButton = document.querySelector('#projects button');
if (projectsButton) {
    projectsButton.addEventListener('click', () => {
        modal.style.display = 'block';
    });
}

const closeButton = document.querySelector('.close');
if (closeButton) {
    closeButton.addEventListener('click', () => {
        modal.style.display = 'none';
    });
}

window.addEventListener('click', (e) => {
    if (e.target == modal) {
        modal.style.display = 'none';
    }
});

// Form validation and feedback
const contactForm = document.getElementById('contact-form');
const submitBtn = contactForm ? contactForm.querySelector('button[type="submit"]') : null;
const formFeedback = document.getElementById('form-feedback');

if (contactForm && submitBtn) {
    contactForm.addEventListener('submit', (e) => {
        const name = document.getElementById('name').value.trim();
        const email = document.getElementById('email').value.trim();
        const message = document.getElementById('message').value.trim();

        if (!name || !email || !message) {
            e.preventDefault();
            showFormFeedback('Please fill in all fields.', 'error');
            return;
        }

        if (!isValidEmail(email)) {
            e.preventDefault();
            showFormFeedback('Please enter a valid email address.', 'error');
            return;
        }

        submitBtn.disabled = true;
        submitBtn.textContent = 'Sending...';
        showFormFeedback('Sending message...', 'success');
    });
}

function showFormFeedback(message, type) {
    formFeedback.textContent = message;
    formFeedback.className = `form-feedback ${type}`;
    setTimeout(() => {
        formFeedback.textContent = '';
        formFeedback.className = 'form-feedback';
    }, 5000);
}

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Enhanced animations
anime({
    translateY: [50, 0],
    opacity: [0, 1],
    duration: 800,
    delay: anime.stagger(200),
    easing: 'easeOutExpo'
});

anime({
    targets: 'footer',
    opacity: [0, 1],
    duration: 1000,
    delay: 1500,
    easing: 'easeOutExpo'
});

// Text animation for section titles
function animateText(element, text) {
    element.textContent = '';
    let i = 0;
    const timer = setInterval(() => {
        if (i < text.length) {
            element.textContent += text.charAt(i);
            i++;
        } else {
            clearInterval(timer);
        }
    }, 50);
}

// Animate section titles on scroll
const titleObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const title = entry.target.querySelector('h2');
            if (title && !title.hasAttribute('data-animated')) {
                const originalText = title.textContent;
                animateText(title, originalText);
                title.setAttribute('data-animated', 'true');
            }
        }
    });
}, { threshold: 0.5 });

document.querySelectorAll('section').forEach(section => {
    titleObserver.observe(section);
});

// Enhanced hover effects
document.querySelectorAll('.skill').forEach(skill => {
    skill.addEventListener('mouseenter', () => {
        anime({
            targets: skill,
            scale: 1.05,
            duration: 300,
            easing: 'easeOutExpo'
        });
    });
    
    skill.addEventListener('mouseleave', () => {
        anime({
            targets: skill,
            scale: 1,
            duration: 300,
            easing: 'easeOutExpo'
        });
    });
});

// Particle Background
const canvas = document.getElementById('particle-canvas');
const ctx = canvas.getContext('2d');
let particles = [];

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}

function createParticles() {
    particles = [];
    const particleCount = Math.floor(window.innerWidth / 8);
    for (let i = 0; i < particleCount; i++) {
        particles.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            vx: (Math.random() - 0.5) * 0.3,
            vy: (Math.random() - 0.5) * 0.3,
            size: Math.random() * 3 + 1,
            opacity: Math.random() * 0.3 + 0.1,
            hue: Math.random() * 360
        });
    }
}

function updateParticles() {
    particles.forEach(particle => {
        particle.x += particle.vx;
        particle.y += particle.vy;

        if (particle.x < 0 || particle.x > canvas.width) particle.vx *= -1;
        if (particle.y < 0 || particle.y > canvas.height) particle.vy *= -1;
    });
}

function drawParticles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach(particle => {
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fillStyle = `hsla(${particle.hue}, 70%, 60%, ${particle.opacity})`;
        ctx.fill();
        
        // Add glow effect
        ctx.shadowBlur = 10;
        ctx.shadowColor = `hsla(${particle.hue}, 70%, 60%, 0.5)`;
    });
    ctx.shadowBlur = 0;
}

function animateParticles() {
    updateParticles();
    drawParticles();
    requestAnimationFrame(animateParticles);
}

window.addEventListener('resize', () => {
    resizeCanvas();
    createParticles();
});

resizeCanvas();
createParticles();
animateParticles();