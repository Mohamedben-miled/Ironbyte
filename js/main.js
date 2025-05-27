// Preloader
document.addEventListener('DOMContentLoaded', () => {
    const preloader = document.querySelector('.preloader');
    const preloaderProgress = document.querySelector('.preloader-progress');
    const preloaderText = document.querySelector('.preloader-text');

    // Simulate loading progress
    let progress = 0;
    const interval = setInterval(() => {
        progress += Math.random() * 10;
        if (progress > 100) progress = 100;

        preloaderProgress.style.width = `${progress}%`;

        if (progress < 30) {
            preloaderText.textContent = 'Loading resources...';
        } else if (progress < 60) {
            preloaderText.textContent = 'Initializing interface...';
        } else if (progress < 90) {
            preloaderText.textContent = 'Almost ready...';
        } else {
            preloaderText.textContent = 'Ready!';
        }

        if (progress === 100) {
            clearInterval(interval);
            setTimeout(() => {
                preloader.classList.add('fade-out');
                setTimeout(() => {
                    preloader.style.display = 'none';
                }, 500);
            }, 500);
        }
    }, 200);
});

// Smooth scrolling with enhanced easing
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        const target = document.querySelector(targetId);

        if (target) {
            // Close mobile menu if open
            if (document.querySelector('.nav-links.active')) {
                document.querySelector('.nav-links').classList.remove('active');
                document.querySelector('.mobile-nav-trigger').classList.remove('active');
            }

            // Get header height for offset
            const headerHeight = document.querySelector('header').offsetHeight;
            const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - headerHeight;

            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });

            // Update URL without page reload
            history.pushState(null, null, targetId);
        }
    });
});

// Header scroll effect
const header = document.querySelector('header');
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});

// Enhanced Intersection Observer for section animations
const sections = document.querySelectorAll('section');
const sectionHeaders = document.querySelectorAll('.section-header');
const options = {
    root: null,
    threshold: 0.1,
    rootMargin: '-100px'
};

// Observer for sections
const sectionObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');

            // Animate section header
            const header = entry.target.querySelector('.section-header');
            if (header) {
                header.classList.add('animate');
            }

            // Animate service cards if this is the services section
            if (entry.target.classList.contains('services')) {
                animateServiceCards();
            }

            // Animate tech items if this is the technologies section
            if (entry.target.classList.contains('technologies')) {
                animateTechItems();
            }

            // Animate story elements if this is the story section
            if (entry.target.classList.contains('story-section')) {
                animateStoryElements();
            }
        }
    });
}, options);

// Initialize section observations
sections.forEach(section => {
    section.classList.add('invisible');
    sectionObserver.observe(section);
});

// Animate service cards with staggered delay
function animateServiceCards() {
    const cards = document.querySelectorAll('.service-card');
    cards.forEach((card, index) => {
        setTimeout(() => {
            card.classList.add('animate');
        }, index * 150);
    });
}

// Animate tech items with staggered delay
function animateTechItems() {
    const items = document.querySelectorAll('.tech-item');
    items.forEach((item, index) => {
        setTimeout(() => {
            item.classList.add('animate');
        }, index * 150);
    });
}

// Animate story elements
function animateStoryElements() {
    const storyElements = document.querySelectorAll('.story-image, .vision-statement, .company-intro, .highlight-item, .mission');
    storyElements.forEach((element, index) => {
        setTimeout(() => {
            element.classList.add('animate');
        }, index * 200);
    });
}

// Enhanced mobile menu functionality
const mobileNavTrigger = document.querySelector('.mobile-nav-trigger');
const navLinks = document.querySelector('.nav-links');

if (mobileNavTrigger && navLinks) {
    // Toggle menu when clicking the trigger
    mobileNavTrigger.addEventListener('click', () => {
        mobileNavTrigger.classList.toggle('active');
        navLinks.classList.toggle('active');
        document.body.classList.toggle('menu-open');
    });

    // Close menu when clicking a link
    navLinks.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            mobileNavTrigger.classList.remove('active');
            navLinks.classList.remove('active');
            document.body.classList.remove('menu-open');
        });
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (navLinks.classList.contains('active') &&
            !navLinks.contains(e.target) &&
            !mobileNavTrigger.contains(e.target)) {
            mobileNavTrigger.classList.remove('active');
            navLinks.classList.remove('active');
            document.body.classList.remove('menu-open');
        }
    });

    // Add mobile menu styles
    const menuStyle = document.createElement('style');
    menuStyle.textContent = `
        @media (max-width: 768px) {
            .nav-links {
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100vh;
                background: rgba(30, 30, 36, 0.98);
                backdrop-filter: blur(15px);
                -webkit-backdrop-filter: blur(15px);
                display: flex;
                flex-direction: column;
                justify-content: center;
                align-items: center;
                gap: 2.5rem;
                transform: translateX(-100%);
                transition: transform 0.4s cubic-bezier(0.4, 0, 0.2, 1);
                z-index: 999;
            }

            .nav-links.active {
                transform: translateX(0);
            }

            .nav-links a {
                font-size: 1.2rem;
                opacity: 0;
                transform: translateY(20px);
            }

            .nav-links.active a {
                animation: fadeInUp 0.5s forwards;
            }

            .nav-links.active a:nth-child(1) { animation-delay: 0.1s; }
            .nav-links.active a:nth-child(2) { animation-delay: 0.2s; }
            .nav-links.active a:nth-child(3) { animation-delay: 0.3s; }
            .nav-links.active a:nth-child(4) { animation-delay: 0.4s; }

            body.menu-open {
                overflow: hidden;
            }
        }
    `;
    document.head.appendChild(menuStyle);
}

// Enhanced parallax effects
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;

    // Subtle background parallax
    document.body.style.backgroundPositionY = -(scrolled * 0.1) + 'px';

    // Parallax for hero section
    const hero = document.querySelector('.hero');
    if (hero && scrolled < window.innerHeight) {
        const opacity = 1 - (scrolled * 0.002);
        hero.style.opacity = opacity > 0 ? opacity : 0;
    }

    // Parallax for shapes
    const shapes = document.querySelectorAll('.shape');
    shapes.forEach((shape, index) => {
        const speed = (index + 1) * 0.1;
        shape.style.transform = `translateY(${scrolled * speed}px)`;
    });
});

// Enhanced mouse parallax effects
document.addEventListener('mousemove', (e) => {
    // Only apply these effects on larger screens
    if (window.innerWidth > 768) {
        const mouseX = (e.clientX - window.innerWidth / 2);
        const mouseY = (e.clientY - window.innerHeight / 2);

        // Parallax for hero grid
        const grid = document.querySelector('.grid');
        if (grid) {
            grid.style.transform = `rotateX(60deg) translate(${mouseX * 0.01}px, ${mouseY * 0.01}px)`;
        }

        // Parallax for floating elements
        const floatingElements = document.querySelector('.floating-elements');
        if (floatingElements) {
            floatingElements.style.transform = `translate(${mouseX * 0.02}px, ${mouseY * 0.02}px)`;
        }

        // Parallax for shapes
        const shapes = document.querySelectorAll('.shape');
        shapes.forEach((shape, index) => {
            const factor = (index + 1) * 0.03;
            shape.style.transform = `translate(${mouseX * factor}px, ${mouseY * factor}px)`;
        });

        // Subtle parallax for section headers
        const sectionHeaders = document.querySelectorAll('.section-header');
        sectionHeaders.forEach(header => {
            header.style.transform = `translate(${mouseX * 0.005}px, ${mouseY * 0.005}px)`;
        });
    }
});

// Enhanced cursor effects
const cursor = document.querySelector('.cursor');
const cursorFollower = document.querySelector('.cursor-follower');

if (cursor && cursorFollower) {
    // Hide default cursor
    document.body.style.cursor = 'none';

    // Update cursor position
    document.addEventListener('mousemove', (e) => {
        // Set cursor position immediately
        cursor.style.left = e.clientX + 'px';
        cursor.style.top = e.clientY + 'px';

        // Set follower position with delay for trailing effect
        setTimeout(() => {
            cursorFollower.style.left = e.clientX + 'px';
            cursorFollower.style.top = e.clientY + 'px';
        }, 80);
    });

    // Add hover effect on interactive elements
    const interactiveElements = document.querySelectorAll('a, button, .service-card, .tech-item, .highlight-item, input, textarea, .cta-button');

    interactiveElements.forEach(el => {
        el.addEventListener('mouseenter', () => {
            cursor.classList.add('cursor-hover');
            cursorFollower.classList.add('cursor-hover');
            el.style.cursor = 'none';
        });

        el.addEventListener('mouseleave', () => {
            cursor.classList.remove('cursor-hover');
            cursorFollower.classList.remove('cursor-hover');
        });
    });

    // Hide cursor when leaving window
    document.addEventListener('mouseleave', () => {
        cursor.style.opacity = '0';
        cursorFollower.style.opacity = '0';
    });

    // Show cursor when entering window
    document.addEventListener('mouseenter', () => {
        cursor.style.opacity = '1';
        cursorFollower.style.opacity = '1';
    });

    // Disable custom cursor on mobile/touch devices
    if ('ontouchstart' in window) {
        cursor.style.display = 'none';
        cursorFollower.style.display = 'none';
        document.body.style.cursor = 'auto';
    }
}

// Enhanced scroll animations
const observerOptions = {
    threshold: 0.15,
    rootMargin: '0px'
};

const animationObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animated');
            animationObserver.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe elements that need animations
document.querySelectorAll('.contact-info, .contact-form, .story-image, .floating-badge').forEach(el => {
    animationObserver.observe(el);
});

// Enhanced contact form handling
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
    // Add form validation styles
    const formStyle = document.createElement('style');
    formStyle.textContent = `
        .form-group input:invalid:focus,
        .form-group textarea:invalid:focus {
            border-color: #ff4d4d;
            box-shadow: 0 0 0 3px rgba(255, 77, 77, 0.1);
        }

        .success-message {
            background: rgba(74, 144, 226, 0.1);
            border: 1px solid rgba(74, 144, 226, 0.3);
            color: var(--white);
            padding: 1rem;
            border-radius: var(--border-radius-sm);
            margin-top: 1.5rem;
            text-align: center;
            animation: fadeIn 0.5s forwards;
        }
    `;
    document.head.appendChild(formStyle);

    // Handle form submission
    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        // Get form elements
        const nameInput = contactForm.querySelector('#name');
        const emailInput = contactForm.querySelector('#email');
        const messageInput = contactForm.querySelector('#message');
        const submitButton = contactForm.querySelector('button[type="submit"]');

        // Simple validation
        if (!nameInput.value || !emailInput.value || !messageInput.value) {
            return;
        }

        // Show loading state
        submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
        submitButton.disabled = true;

        // Simulate form submission (replace with actual form handling)
        await new Promise(resolve => setTimeout(resolve, 1500));

        // Show success message
        const successMessage = document.createElement('div');
        successMessage.className = 'success-message';
        successMessage.innerHTML = '<i class="fas fa-check-circle"></i> Thank you for your message! We\'ll get back to you soon.';
        contactForm.appendChild(successMessage);

        // Reset form
        contactForm.reset();
        submitButton.innerHTML = 'Send Message';
        submitButton.disabled = false;

        // Remove success message after 5 seconds
        setTimeout(() => {
            successMessage.style.opacity = '0';
            setTimeout(() => {
                successMessage.remove();
            }, 300);
        }, 5000);
    });
}

// Add floating animation to story elements
const storyImages = document.querySelectorAll('.story-image');
storyImages.forEach((image, index) => {
    image.classList.add('story-element');
    image.style.animationDelay = `${index * 0.3}s`;
});

// Testimonial Slider
document.addEventListener('DOMContentLoaded', () => {
    const track = document.querySelector('.testimonial-track');
    const slides = document.querySelectorAll('.testimonial-card');
    const dots = document.querySelectorAll('.testimonial-dot');
    const prevButton = document.querySelector('.testimonial-prev');
    const nextButton = document.querySelector('.testimonial-next');

    if (track && slides.length && dots.length) {
        let currentIndex = 0;

        // Function to update slider position
        const updateSlider = () => {
            track.style.transform = `translateX(-${currentIndex * 100}%)`;

            // Update active dot
            dots.forEach((dot, index) => {
                dot.classList.toggle('active', index === currentIndex);
            });
        };

        // Next slide
        const nextSlide = () => {
            currentIndex = (currentIndex + 1) % slides.length;
            updateSlider();
        };

        // Previous slide
        const prevSlide = () => {
            currentIndex = (currentIndex - 1 + slides.length) % slides.length;
            updateSlider();
        };

        // Event listeners
        nextButton.addEventListener('click', nextSlide);
        prevButton.addEventListener('click', prevSlide);

        // Dot navigation
        dots.forEach((dot, index) => {
            dot.addEventListener('click', () => {
                currentIndex = index;
                updateSlider();
            });
        });

        // Touch/Swipe support for mobile
        let startX = 0;
        let endX = 0;
        let isDragging = false;

        const handleTouchStart = (e) => {
            startX = e.touches[0].clientX;
            isDragging = true;
            track.style.transition = 'none';
        };

        const handleTouchMove = (e) => {
            if (!isDragging) return;
            endX = e.touches[0].clientX;
            const diff = startX - endX;
            const currentTransform = -currentIndex * 100;
            const newTransform = currentTransform - (diff / track.offsetWidth) * 100;
            track.style.transform = `translateX(${newTransform}%)`;
        };

        const handleTouchEnd = () => {
            if (!isDragging) return;
            isDragging = false;
            track.style.transition = 'transform 0.5s ease';

            const diff = startX - endX;
            const threshold = 50; // Minimum swipe distance

            if (Math.abs(diff) > threshold) {
                if (diff > 0) {
                    // Swiped left - next slide
                    nextSlide();
                } else {
                    // Swiped right - previous slide
                    prevSlide();
                }
            } else {
                // Snap back to current slide
                updateSlider();
            }
        };

        // Add touch event listeners
        track.addEventListener('touchstart', handleTouchStart, { passive: true });
        track.addEventListener('touchmove', handleTouchMove, { passive: true });
        track.addEventListener('touchend', handleTouchEnd, { passive: true });

        // Mouse drag support for desktop
        let isMouseDown = false;
        let mouseStartX = 0;

        const handleMouseDown = (e) => {
            isMouseDown = true;
            mouseStartX = e.clientX;
            track.style.transition = 'none';
            track.style.cursor = 'grabbing';
        };

        const handleMouseMove = (e) => {
            if (!isMouseDown) return;
            const diff = mouseStartX - e.clientX;
            const currentTransform = -currentIndex * 100;
            const newTransform = currentTransform - (diff / track.offsetWidth) * 100;
            track.style.transform = `translateX(${newTransform}%)`;
        };

        const handleMouseUp = (e) => {
            if (!isMouseDown) return;
            isMouseDown = false;
            track.style.transition = 'transform 0.5s ease';
            track.style.cursor = 'grab';

            const diff = mouseStartX - e.clientX;
            const threshold = 50;

            if (Math.abs(diff) > threshold) {
                if (diff > 0) {
                    nextSlide();
                } else {
                    prevSlide();
                }
            } else {
                updateSlider();
            }
        };

        // Add mouse event listeners
        track.addEventListener('mousedown', handleMouseDown);
        document.addEventListener('mousemove', handleMouseMove);
        document.addEventListener('mouseup', handleMouseUp);

        // Prevent text selection while dragging
        track.addEventListener('selectstart', (e) => e.preventDefault());

        // Auto-advance slides every 6 seconds (increased for better UX)
        let autoSlideInterval = setInterval(nextSlide, 6000);

        // Pause auto-advance on hover/touch
        track.addEventListener('mouseenter', () => clearInterval(autoSlideInterval));
        track.addEventListener('mouseleave', () => {
            autoSlideInterval = setInterval(nextSlide, 6000);
        });

        track.addEventListener('touchstart', () => clearInterval(autoSlideInterval));
        track.addEventListener('touchend', () => {
            autoSlideInterval = setInterval(nextSlide, 6000);
        });
    }
});

// Add scroll-to-top button
const scrollTopButton = document.createElement('button');
scrollTopButton.className = 'scroll-top-button';
scrollTopButton.innerHTML = '<i class="fas fa-arrow-up"></i>';
document.body.appendChild(scrollTopButton);

// Add scroll-to-top button styles
const scrollTopStyle = document.createElement('style');
scrollTopStyle.textContent = `
    .scroll-top-button {
        position: fixed;
        bottom: 30px;
        right: 30px;
        width: 50px;
        height: 50px;
        border-radius: 50%;
        background: var(--accent);
        color: white;
        border: none;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        opacity: 0;
        transform: translateY(20px);
        transition: all 0.3s ease;
        z-index: 99;
        box-shadow: var(--shadow-md);
    }

    .scroll-top-button.visible {
        opacity: 1;
        transform: translateY(0);
    }

    .scroll-top-button:hover {
        background: var(--accent-dark);
        transform: translateY(-5px);
    }

    @media (max-width: 768px) {
        .scroll-top-button {
            width: 40px;
            height: 40px;
            bottom: 20px;
            right: 20px;
        }
    }
`;
document.head.appendChild(scrollTopStyle);

// Show/hide scroll-to-top button based on scroll position
window.addEventListener('scroll', () => {
    if (window.pageYOffset > 500) {
        scrollTopButton.classList.add('visible');
    } else {
        scrollTopButton.classList.remove('visible');
    }
});

// Scroll to top when button is clicked
scrollTopButton.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});