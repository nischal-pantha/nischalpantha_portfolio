/* ================================================
   APPLE-INSPIRED PORTFOLIO - ADVANCED ANIMATIONS
   ================================================ */

// Initialize GSAP
gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

// ================================================
// LOADING ANIMATION
// ================================================

function initLoadingScreen() {
    const loadingScreen = document.getElementById('loading-screen');
    
    window.addEventListener('load', () => {
        gsap.to(loadingScreen, {
            duration: 0.6,
            opacity: 0,
            pointerEvents: 'none',
            onComplete: () => {
                loadingScreen.classList.add('hide');
            }
        });
    });
}

// ================================================
// CUSTOM CURSOR
// ================================================

function initCustomCursor() {
    const customCursor = document.getElementById('custom-cursor');
    const cursorPoint = customCursor.querySelector('.cursor-point');
    const cursorRing = customCursor.querySelector('.cursor-ring');
    
    let mouseX = 0;
    let mouseY = 0;
    let isHoveringInteractive = false;
    
    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        
        // Move cursor immediately
        gsap.to(customCursor, {
            left: mouseX,
            top: mouseY,
            duration: 0,
            overwrite: 'auto'
        });
        
        // Check if hovering over interactive elements
        const target = e.target;
        const isInteractive = 
            target.tagName === 'BUTTON' ||
            target.tagName === 'A' ||
            target.classList.contains('nav-link') ||
            target.classList.contains('btn') ||
            target.closest('.btn') ||
            target.closest('.nav-link');
        
        if (isInteractive !== isHoveringInteractive) {
            isHoveringInteractive = isInteractive;
            
            if (isInteractive) {
                gsap.to(cursorRing, {
                    scale: 1.5,
                    borderColor: 'rgba(60, 165, 250, 0.8)',
                    duration: 0.3
                });
                gsap.to(cursorPoint, {
                    scale: 1.5,
                    duration: 0.3
                });
            } else {
                gsap.to(cursorRing, {
                    scale: 1,
                    borderColor: 'rgba(59, 130, 246, 1)',
                    duration: 0.3
                });
                gsap.to(cursorPoint, {
                    scale: 1,
                    duration: 0.3
                });
            }
        }
    });
    
    // Hide cursor on leave
    document.addEventListener('mouseleave', () => {
        gsap.to(customCursor, {
            opacity: 0,
            duration: 0.3
        });
    });
    
    document.addEventListener('mouseenter', () => {
        gsap.to(customCursor, {
            opacity: 1,
            duration: 0.3
        });
    });
}

// ================================================
// NAVIGATION SCROLL EFFECT
// ================================================

function initNavbarScroll() {
    const navbar = document.querySelector('.navbar');
    const scrollProgress = document.querySelector('.scroll-progress');
    
    window.addEventListener('scroll', () => {
        const scrollPercentage = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
        scrollProgress.style.width = scrollPercentage + '%';
        
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
        
        updateActiveNavLink();
    });
}

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

// ================================================
// SMOOTH SCROLL FOR ANCHOR LINKS
// ================================================

function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            // Skip if it's just "#" or if link is external
            if (!href || href === '#') return;
            
            e.preventDefault();
            const targetId = href.substring(1);
            const target = document.getElementById(targetId);
            
            console.log('🔗 Navigating to: ' + targetId, target ? '✓ Found' : '✗ Not found');
            
            if (target) {
                try {
                    // Try using GSAP ScrollToPlugin (smooth)
                    if (typeof gsap !== 'undefined' && gsap.to) {
                        console.log('↓ Using GSAP smooth scroll');
                        gsap.to(window, {
                            scrollTo: {
                                y: target,
                                autoKill: false
                            },
                            duration: 0.8,
                            ease: 'power3.inOut'
                        });
                    } else {
                        // Fallback to native smooth scroll
                        console.log('↓ Using native smooth scroll (GSAP not available)');
                        target.scrollIntoView({ 
                            behavior: 'smooth',
                            block: 'start'
                        });
                    }
                } catch (error) {
                    console.log('⚠️ Smooth scroll error, using fallback:', error);
                    // Final fallback
                    target.scrollIntoView({ 
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }
        });
    });
}

// ================================================
// HERO ANIMATIONS
// ================================================

function initHeroAnimations() {
    const timeline = gsap.timeline({
        defaults: { ease: 'power3.out' }
    });
    
    // Badge animation
    timeline.from('.hero-badge', {
        duration: 0.8,
        opacity: 0,
        y: -20,
        rotation: -5
    }, 0.2);
    
    // Title animation with stagger
    timeline.from('.hero-title .text-line', {
        duration: 1,
        opacity: 0,
        y: 50,
        skewY: 10,
        stagger: 0.06,
        letterSpacing: '10px'
    }, 0.3);
    
    // Subtitle animation
    timeline.from('.hero-subtitle', {
        duration: 0.8,
        opacity: 0,
        y: 20
    }, 0.5);
    
    // Description animation
    timeline.from('.hero-description', {
        duration: 0.8,
        opacity: 0,
        y: 20
    }, 0.6);
    
    // CTA buttons animation
    timeline.from('.hero-cta .btn', {
        duration: 0.8,
        opacity: 0,
        y: 20,
        stagger: 0.2
    }, 0.7);
    
    // Profile card animation
    timeline.from('.profile-card', {
        duration: 1,
        opacity: 0,
        x: 60,
        scale: 0.8
    }, 0.4);
    
    // Scroll indicator animation
    timeline.from('.scroll-indicator', {
        duration: 0.8,
        opacity: 0,
        y: 20
    }, 0.9);
}

// ================================================
// SECTION SCROLL ANIMATIONS
// ================================================

function initSectionAnimations() {
    const sections = document.querySelectorAll('section:not(.hero)');
    
    sections.forEach((section) => {
        // Fade in and slide up animation
        gsap.from(section, {
            scrollTrigger: {
                trigger: section,
                start: 'top 80%',
                markers: false
            },
            duration: 0.8,
            opacity: 0,
            y: 50,
            ease: 'power3.out'
        });
        
        // Add stagger animation to cards within sections
        const cards = section.querySelectorAll('.about-card, .skill-card, .timeline-item, .testimonial-card');
        if (cards.length > 0) {
            gsap.from(cards, {
                scrollTrigger: {
                    trigger: section,
                    start: 'top 70%'
                },
                duration: 0.6,
                opacity: 0,
                y: 30,
                stagger: 0.1,
                ease: 'power2.out'
            });
        }
    });
}

// ================================================
// SKILL BARS ANIMATION
// ================================================

function initSkillBarAnimation() {
    const skillProgress = document.querySelectorAll('.skill-progress');
    
    // Set initial CSS custom properties from data attributes
    skillProgress.forEach(element => {
        const progress = element.getAttribute('data-progress');
        if (progress) {
            element.style.setProperty('--progress', progress + '%');
        }
    });
    
    const skillCards = document.querySelectorAll('.skill-card');
    
    skillCards.forEach(card => {
        const skillProgress = card.querySelector('.skill-progress');
        
        ScrollTrigger.create({
            trigger: card,
            onEnter: () => {
                card.classList.add('in-view');
            }
        });
    });
}

// ================================================
// CARD HOVER EFFECT (3D TILT)
// ================================================

function initCardHoverEffect() {
    const cards = document.querySelectorAll(
        '.about-card, .skill-card, .timeline-item, .testimonial-card, .project-showcase'
    );
    
    cards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = (y - centerY) * 0.05;
            const rotateY = (centerX - x) * 0.05;
            
            gsap.to(card, {
                rotationX: rotateX,
                rotationY: rotateY,
                transformPerspective: 1000,
                duration: 0.3,
                overwrite: 'auto'
            });
        });
        
        card.addEventListener('mouseleave', () => {
            gsap.to(card, {
                rotationX: 0,
                rotationY: 0,
                duration: 0.3
            });
        });
    });
}

// ================================================
// THEME TOGGLE
// ================================================

function initThemeToggle() {
    const themeToggle = document.getElementById('theme-toggle');
    const html = document.documentElement;
    
    // Check for saved theme preference or default to 'dark'
    const savedTheme = localStorage.getItem('theme') || 'dark';
    if (savedTheme === 'light') {
        html.style.colorScheme = 'light';
        document.body.classList.add('light-mode');
        themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
    } else {
        html.style.colorScheme = 'dark';
        document.body.classList.remove('light-mode');
        themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
    }
    
    themeToggle.addEventListener('click', () => {
        const isLight = document.body.classList.toggle('light-mode');
        const theme = isLight ? 'light' : 'dark';
        localStorage.setItem('theme', theme);
        html.style.colorScheme = theme;
        
        // Animate icon
        gsap.to(themeToggle, {
            rotation: 360,
            duration: 0.6,
            ease: 'back.out'
        });
        
        // Update icon
        themeToggle.innerHTML = isLight 
            ? '<i class="fas fa-moon"></i>' 
            : '<i class="fas fa-sun"></i>';
    });
}

// ================================================
// PARTICLE CANVAS
// ================================================

function initParticleCanvas() {
    const canvas = document.getElementById('particle-canvas');
    const ctx = canvas.getContext('2d');
    let particles = [];
    
    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    
    function createParticles() {
        particles = [];
        const particleCount = Math.floor(window.innerWidth / 15);
        
        for (let i = 0; i < particleCount; i++) {
            particles.push({
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height,
                vx: (Math.random() - 0.5) * 0.2,
                vy: (Math.random() - 0.5) * 0.2,
                size: Math.random() * 1.5 + 0.5,
                opacity: Math.random() * 0.2 + 0.05,
                pulseRate: Math.random() * 0.02 + 0.01
            });
        }
    }
    
    function updateParticles() {
        particles.forEach(particle => {
            particle.x += particle.vx;
            particle.y += particle.vy;
            particle.opacity += particle.pulseRate;
            
            if (particle.opacity > 0.4) particle.pulseRate = -0.01;
            if (particle.opacity < 0.05) particle.pulseRate = 0.01;
            
            if (particle.x < 0) particle.x = canvas.width;
            if (particle.x > canvas.width) particle.x = 0;
            if (particle.y < 0) particle.y = canvas.height;
            if (particle.y > canvas.height) particle.y = 0;
        });
    }
    
    function drawParticles() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        particles.forEach((particle, index) => {
            // Draw particle
            ctx.beginPath();
            ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
            const isDark = !document.body.classList.contains('light-mode');
            ctx.fillStyle = isDark
                ? `rgba(59, 130, 246, ${particle.opacity})`
                : `rgba(14, 165, 233, ${particle.opacity})`;
            ctx.fill();
            
            // Draw connections
            particles.forEach((otherParticle, otherIndex) => {
                if (otherIndex <= index) return;
                
                const dx = particle.x - otherParticle.x;
                const dy = particle.y - otherParticle.y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                
                if (distance < 120) {
                    ctx.strokeStyle = isDark
                        ? `rgba(59, 130, 246, ${0.08 * (1 - distance / 120)})`
                        : `rgba(14, 165, 233, ${0.08 * (1 - distance / 120)})`;
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
}

// ================================================
// FORM HANDLING
// ================================================

function initFormHandling() {
    const contactForm = document.getElementById('contact-form');
    if (!contactForm) return;
    
    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const name = document.getElementById('name').value.trim();
        const email = document.getElementById('email').value.trim();
        const subject = document.getElementById('subject').value.trim();
        const message = document.getElementById('message').value.trim();
        const submitBtn = contactForm.querySelector('button[type="submit"]');
        
        // Validation
        if (!name || !email || !subject || !message) {
            showFormFeedback('Please fill in all fields', 'error');
            return;
        }
        
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            showFormFeedback('Please enter a valid email', 'error');
            return;
        }
        
        // Disable button and show loading state
        submitBtn.disabled = true;
        const originalText = submitBtn.querySelector('span').textContent;
        
        gsap.to(submitBtn.querySelector('i'), {
            rotation: 360,
            duration: 1,
            repeat: -1,
            ease: 'none'
        });
        
        try {
            const response = await fetch('/contact', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                body: `name=${encodeURIComponent(name)}&email=${encodeURIComponent(email)}&subject=${encodeURIComponent(subject)}&message=${encodeURIComponent(message)}`
            });
            
            if (response.ok) {
                showFormFeedback('Message sent successfully! 🎉', 'success');
                contactForm.reset();
            } else {
                showFormFeedback('Error sending message', 'error');
            }
        } catch (error) {
            console.error('Form submission error:', error);
            showFormFeedback('Error sending message. Please try again.', 'error');
        } finally {
            submitBtn.disabled = false;
            submitBtn.querySelector('span').textContent = originalText;
            gsap.killTweensOf(submitBtn.querySelector('i'));
            submitBtn.querySelector('i').style.transform = 'none';
        }
    });
}

function showFormFeedback(message, type) {
    const formFeedback = document.getElementById('form-feedback');
    formFeedback.textContent = message;
    formFeedback.className = `form-feedback show ${type}`;
    
    gsap.from(formFeedback, {
        duration: 0.3,
        opacity: 0,
        y: -10
    });
    
    setTimeout(() => {
        gsap.to(formFeedback, {
            duration: 0.3,
            opacity: 0,
            onComplete: () => {
                formFeedback.classList.remove('show');
            }
        });
    }, 4000);
}

// ================================================
// INITIALIZE ALL ANIMATIONS
// ================================================

function initAll() {
    // Wait for DOM to be fully loaded
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
    
    function init() {
        initLoadingScreen();
        initCustomCursor();
        initNavbarScroll();
        initMobileMenu();
        initSmoothScroll();
        initHeroAnimations();
        initSectionAnimations();
        initSkillBarAnimation();
        initCardHoverEffect();
        initThemeToggle();
        initParticleCanvas();
        initFormHandling();
        
        // Debug info
        console.log('✨ Apple-style portfolio loaded successfully!');
        console.log('📱 Navigation links: ' + document.querySelectorAll('a[href^="#"]').length);
        console.log('🔗 GSAP ScrollToPlugin loaded: ' + (typeof ScrollToPlugin !== 'undefined'));
        console.log('📍 Sections found: ' + document.querySelectorAll('section').length);
        
        // Verify all navigation targets exist
        const navLinks = document.querySelectorAll('a[href^="#"]');
        navLinks.forEach(link => {
            const targetId = link.getAttribute('href').substring(1);
            const target = document.getElementById(targetId);
            if (!target) {
                console.warn('⚠️ Missing section for link: #' + targetId);
            }
        });
    }
}

// ================================================
// MOBILE MENU
// ================================================

function initMobileMenu() {
    const hamburger = document.getElementById('nav-hamburger');
    const navMenu = document.querySelector('.nav-menu');
    
    if (!hamburger || !navMenu) return;
    
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });
    
    // Close menu when clicking on a link
    navMenu.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });
}

// Start initialization
initAll();

// Refresh ScrollTrigger on window resize
window.addEventListener('resize', () => {
    ScrollTrigger.refresh();
});
