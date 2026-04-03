// ============================================
// MODERN PORTFOLIO - INTERACTIVE JS
// ============================================

// Performance API polyfill and fixes
if (!window.performance) window.performance = {};
if (!performance.clearMarks) performance.clearMarks = function(mark) {};
if (!performance.clearMeasures) performance.clearMeasures = function(measure) {};
if (!performance.mark) performance.mark = function(mark) {};
if (!performance.measure) performance.measure = function(measure, start, end) {};

// ========== LOADING SCREEN ==========

function hideLoadingScreen() {
    const loadingScreen = document.getElementById('loading-screen');
    setTimeout(() => {
        loadingScreen.classList.add('hide');
        setTimeout(() => {
            loadingScreen.style.display = 'none';
        }, 500);
    }, 800);
}

window.addEventListener('load', hideLoadingScreen);

// ========== TYPEWRITER EFFECT ==========

const typewriterText = "Pilot & Founder of NamesTech";
const typewriterElement = document.getElementById('typewriter-text');
let typewriterIndex = 0;

function typeWriter() {
    if (typewriterIndex < typewriterText.length) {
        typewriterElement.textContent += typewriterText.charAt(typewriterIndex);
        typewriterIndex++;
        setTimeout(typeWriter, 60);
    }
}

setTimeout(typeWriter, 1200);

// ========== SCROLL PROGRESS BAR ==========

window.addEventListener('scroll', () => {
    const scrollTop = window.pageYOffset;
    const docHeight = document.body.offsetHeight - window.innerHeight;
    const scrollPercent = (scrollTop / docHeight) * 100;
    document.getElementById('scroll-progress').style.width = scrollPercent + '%';
    
    // Navbar scroll effect
    const navbar = document.querySelector('.navbar');
    if (scrollTop > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
    
    // Active nav link
    updateActiveNavLink();
});

// ========== ACTIVE NAV LINK ==========

function updateActiveNavLink() {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-link');
    
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 200;
        const sectionHeight = section.clientHeight;
        if (window.pageYOffset >= sectionTop && window.pageYOffset < sectionTop + sectionHeight) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').slice(1) === current) {
            link.classList.add('active');
        }
    });
}

// ========== SMOOTH SCROLL ==========

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// ========== THEME TOGGLE ==========

const themeToggle = document.getElementById('theme-toggle');

themeToggle.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
    const isDark = document.body.classList.contains('dark-mode');
    const icon = themeToggle.querySelector('i');
    
    if (isDark) {
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
    document.body.classList.add('dark-mode');
    themeToggle.querySelector('i').className = 'fas fa-sun';
}

// ========== CURSOR FOLLOWER ==========

const cursorFollower = document.getElementById('cursor-follower');
let mouseX = 0, mouseY = 0;
let followerX = 0, followerY = 0;

document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    
    // Add active state on buttons/links
    const target = e.target;
    if (target.tagName === 'BUTTON' || target.tagName === 'A' || target.classList.contains('nav-link')) {
        cursorFollower.classList.add('active');
    } else {
        cursorFollower.classList.remove('active');
    }
});

function updateCursorFollower() {
    followerX += (mouseX - followerX) * 0.15;
    followerY += (mouseY - followerY) * 0.15;
    
    cursorFollower.style.left = followerX - 15 + 'px';
    cursorFollower.style.top = followerY - 15 + 'px';
    
    requestAnimationFrame(updateCursorFollower);
}

updateCursorFollower();

// ========== INTERSECTION OBSERVER ==========

const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('in-view');
            
            // Animate skill bars
            if (entry.target.id === 'skills') {
                animateSkillBars();
            }
        }
    });
}, observerOptions);

document.querySelectorAll('section').forEach(section => {
    observer.observe(section);
});

// ========== SKILL BAR ANIMATION ==========

function animateSkillBars() {
    const skillFills = document.querySelectorAll('.skill-fill');
    const skillPercentages = document.querySelectorAll('.skill-percentage');
    
    skillFills.forEach((fill) => {
        const width = fill.getAttribute('data-width');
        const percentage = parseInt(width);
        let current = 0;
        
        const interval = setInterval(() => {
            current += Math.ceil(percentage / 50);
            if (current >= percentage) {
                current = percentage;
                clearInterval(interval);
            }
            fill.style.width = current + '%';
        }, 20);
    });
    
    skillPercentages.forEach((percentage, index) => {
        setTimeout(() => {
            percentage.style.opacity = '1';
            percentage.style.transform = 'translateY(0)';
        }, index * 100);
    });
}

// ========== FORM HANDLING ==========

const contactForm = document.getElementById('contact-form');
const formFeedback = document.getElementById('form-feedback');
const submitBtn = document.getElementById('submit-btn');

if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const name = document.getElementById('name').value.trim();
        const email = document.getElementById('email').value.trim();
        const message = document.getElementById('message').value.trim();
        
        // Validation
        if (!name || !email || !message) {
            showFormFeedback('Please fill in all fields', 'error');
            return;
        }
        
        if (!isValidEmail(email)) {
            showFormFeedback('Please enter a valid email', 'error');
            return;
        }
        
        submitBtn.disabled = true;
        const originalText = submitBtn.textContent;
        submitBtn.textContent = 'Sending...';
        
        try {
            const response = await fetch('/contact', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                body: `name=${encodeURIComponent(name)}&email=${encodeURIComponent(email)}&message=${encodeURIComponent(message)}`
            });
            
            if (response.ok) {
                showFormFeedback('Message sent successfully!', 'success');
                contactForm.reset();
            } else {
                showFormFeedback('Error sending message', 'error');
            }
        } catch (error) {
            showFormFeedback('Error sending message', 'error');
        } finally {
            submitBtn.disabled = false;
            submitBtn.textContent = originalText;
        }
    });
}

function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function showFormFeedback(message, type) {
    formFeedback.textContent = message;
    formFeedback.className = `form-feedback show ${type}`;
    
    setTimeout(() => {
        formFeedback.classList.remove('show');
    }, 4000);
}

// ========== PARTICLE BACKGROUND ==========

const canvas = document.getElementById('particle-canvas');
const ctx = canvas.getContext('2d');
let particles = [];

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}

function createParticles() {
    particles = [];
    const particleCount = Math.floor(window.innerWidth / 12);
    
    for (let i = 0; i < particleCount; i++) {
        particles.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            vx: (Math.random() - 0.5) * 0.3,
            vy: (Math.random() - 0.5) * 0.3,
            size: Math.random() * 2 + 0.5,
            opacity: Math.random() * 0.3 + 0.1
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
    
    particles.forEach((particle, index) => {
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(59, 130, 246, ${particle.opacity})`;
        ctx.fill();
        
        // Draw lines between nearby particles
        particles.forEach((otherParticle, otherIndex) => {
            if (otherIndex <= index) return;
            
            const dx = particle.x - otherParticle.x;
            const dy = particle.y - otherParticle.y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            
            if (distance < 100) {
                ctx.strokeStyle = `rgba(59, 130, 246, ${0.1 * (1 - distance / 100)})`;
                ctx.lineWidth = 0.5;
                ctx.beginPath();
                ctx.moveTo(particle.x, particle.y);
                ctx.lineTo(otherParticle.x, otherParticle.y);
                ctx.stroke();
            }
        });
    });
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

// ========== PAGE ANIMATIONS ==========

// Animate sections on scroll
const sections = document.querySelectorAll('section');
sections.forEach((section, index) => {
    section.style.opacity = '0';
    section.style.transform = 'translateY(40px)';
    
    const observerAnimations = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }, index * 100);
                observerAnimations.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });
    
    observerAnimations.observe(section);
});

// Hover effects for cards
document.querySelectorAll('.skill, .timeline-item, .testimonial').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transition = 'all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)';
    });
});

console.log('✨ Portfolio loaded successfully!');