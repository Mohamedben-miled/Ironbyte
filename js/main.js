// Enhanced Mobile Menu
const mobileMenu = {
    container: document.querySelector('.nav-links-container'),
    trigger: document.querySelector('.mobile-nav-trigger'),
    links: document.querySelectorAll('.nav-links a'),
    isOpen: false,

    init() {
        this.trigger.addEventListener('click', () => this.toggle());
        this.setupCloseOnClick();
        this.setupClickOutside();
        window.addEventListener('resize', () => {
            if (window.innerWidth > 768 && this.isOpen) {
                this.close();
            }
        });
    },

    toggle() {
        this.isOpen = !this.isOpen;
        this.container.classList.toggle('active');
        this.trigger.classList.toggle('active');
        document.body.style.overflow = this.isOpen ? 'hidden' : '';
    },

    close() {
        this.isOpen = false;
        this.container.classList.remove('active');
        this.trigger.classList.remove('active');
        document.body.style.overflow = '';
    },

    setupCloseOnClick() {
        this.links.forEach(link => {
            link.addEventListener('click', () => {
                if (this.isOpen) this.close();
            });
        });
    },

    setupClickOutside() {
        document.addEventListener('click', (e) => {
            if (this.isOpen && 
                !this.container.contains(e.target) && 
                !this.trigger.contains(e.target)) {
                this.close();
            }
        });
    }
};

// Initialize mobile menu
mobileMenu.init();

// Smooth scrolling with offset for fixed header
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const headerOffset = 80;
            const elementPosition = target.offsetTop;
            const offsetPosition = elementPosition - headerOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Enhanced scroll animations with performance optimizations
const animatedElements = {
    init() {
        this.observeElements();
        this.setupParallax();
    },

    observeElements() {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('visible');
                        this.handleSpecialAnimations(entry.target);
                    }
                });
            },
            { threshold: 0.2, rootMargin: '-50px' }
        );

        document.querySelectorAll('.section-header, .service-card, .tech-item, .model-item, .story-logo, .contact-info')
            .forEach(el => observer.observe(el));
    },

    handleSpecialAnimations(element) {
        if (element.classList.contains('model-item')) {
            element.style.animationDelay = `${Math.random() * 0.5}s`;
        }
    },

    setupParallax() {
        let ticking = false;
        window.addEventListener('scroll', () => {
            if (!ticking) {
                window.requestAnimationFrame(() => {
                    const scrolled = window.pageYOffset;
                    this.updateParallaxElements(scrolled);
                    ticking = false;
                });
                ticking = true;
            }
        });
    },

    updateParallaxElements(scrolled) {
        const storySection = document.querySelector('.story-section');
        if (storySection) {
            const bounds = storySection.getBoundingClientRect();
            if (bounds.top < window.innerHeight && bounds.bottom > 0) {
                const models = storySection.querySelectorAll('.model-shape');
                models.forEach((model, index) => {
                    const speed = 0.1 + (index * 0.05);
                    model.style.transform = `translateY(${scrolled * speed}px) rotate(${scrolled * 0.02}deg)`;
                });
            }
        }
    }
};

// Initialize animations
animatedElements.init();

// Create a single IntersectionObserver instance
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            
            // Handle special animations based on element type
            if (entry.target.classList.contains('model-item')) {
                entry.target.style.animationDelay = `${Math.random() * 0.5}s`;
            }
            
            // Enable parallax only when section is visible
            if (entry.target.classList.contains('parallax-section')) {
                entry.target.dataset.parallaxActive = 'true';
            }
        } else if (entry.target.classList.contains('parallax-section')) {
            entry.target.dataset.parallaxActive = 'false';
        }
    });
}, { threshold: 0.2, rootMargin: '-50px' });

// Optimized scroll handler
let scrolling = false;
window.addEventListener('scroll', () => {
    if (!scrolling) {
        scrolling = true;
        requestAnimationFrame(() => {
            const scrolled = window.pageYOffset;
            document.querySelectorAll('[data-parallax-active="true"]').forEach(section => {
                if (section.classList.contains('story-section')) {
                    section.style.backgroundImage = `linear-gradient(135deg, 
                        var(--secondary) ${scrolled * 0.02}px, 
                        rgba(26, 26, 26, 0.95) ${scrolled * 0.03}px)`;
                } else {
                    section.style.backgroundPosition = `center ${scrolled * 0.02}px`;
                }
            });
            scrolling = false;
        });
    }
});

// Initialize observations
document.querySelectorAll('.section-header, .service-card, .tech-item, .model-item, .story-logo, .contact-info').forEach(el => observer.observe(el));
document.querySelectorAll('.story-section, .services, .technologies').forEach(section => {
    section.classList.add('parallax-section');
    observer.observe(section);
});

// Enhanced cursor effects
const cursor = {
    dot: document.querySelector('.cursor'),
    follower: document.querySelector('.cursor-follower'),
    links: document.querySelectorAll('a, button, .service-card, .tech-item'),

    init() {
        if (!this.dot || !this.follower) return;

        document.addEventListener('mousemove', (e) => {
            this.moveCursor(e);
        });

        this.setupInteractions();
    },

    moveCursor(e) {
        requestAnimationFrame(() => {
            this.dot.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
            this.follower.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
        });
    },

    setupInteractions() {
        this.links.forEach(link => {
            link.addEventListener('mouseenter', () => {
                this.dot.classList.add('cursor-hover');
                this.follower.classList.add('cursor-hover');
            });

            link.addEventListener('mouseleave', () => {
                this.dot.classList.remove('cursor-hover');
                this.follower.classList.remove('cursor-hover');
            });
        });
    }
};

// Initialize cursor effects
cursor.init();

// Optimized form handling with validation and feedback
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const submitButton = contactForm.querySelector('button[type="submit"]');
        const formData = new FormData(contactForm);
        
        // Basic validation
        let isValid = true;
        formData.forEach((value, key) => {
            if (!value.trim()) isValid = false;
            if (key === 'email' && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) isValid = false;
        });

        if (!isValid) {
            showFormMessage('Please fill all fields correctly', 'error');
            return;
        }

        // Submit animation
        submitButton.textContent = 'Sending...';
        submitButton.disabled = true;

        try {
            // Simulate form submission (replace with actual form handling)
            await new Promise(resolve => setTimeout(resolve, 1500));
            
            showFormMessage('Message sent successfully!', 'success');
            contactForm.reset();
        } catch (error) {
            showFormMessage('Failed to send message. Please try again.', 'error');
        } finally {
            submitButton.textContent = 'Send Message';
            submitButton.disabled = false;
        }
    });
}

function showFormMessage(message, type) {
    const messageEl = document.createElement('div');
    messageEl.className = `form-message ${type}`;
    messageEl.textContent = message;
    
    const existing = contactForm.querySelector('.form-message');
    if (existing) existing.remove();
    
    contactForm.appendChild(messageEl);
    setTimeout(() => messageEl.remove(), 5000);
}

// Add smooth navbar background transition on scroll
window.addEventListener('scroll', () => {
    if (!scrolling) {
        scrolling = true;
        requestAnimationFrame(() => {
            const nav = document.querySelector('nav');
            const scrolled = window.pageYOffset;
            if (scrolled > 50) {
                nav.style.background = 'linear-gradient(to right, rgba(26, 26, 26, 0.98), rgba(26, 26, 26, 0.95))';
                nav.style.padding = '0.8rem 4rem';
            } else {
                nav.style.background = 'linear-gradient(to right, rgba(26, 26, 26, 0.95), rgba(26, 26, 26, 0.9))';
                nav.style.padding = '1rem 4rem';
            }
            scrolling = false;
        });
    }
});

// Hero section parallax effect
const heroContent = document.querySelector('.hero-content');
window.addEventListener('mousemove', (e) => {
    if (!scrolling && heroContent) {
        scrolling = true;
        requestAnimationFrame(() => {
            const { clientX, clientY } = e;
            const x = (clientX - window.innerWidth / 2) * 0.005;
            const y = (clientY - window.innerHeight / 2) * 0.005;
            heroContent.style.transform = `translate(${x}px, ${y}px)`;
            scrolling = false;
        });
    }
});