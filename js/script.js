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

// Mobile menu functionality
const mobileNavTrigger = document.querySelector('.mobile-nav-trigger');
const navLinks = document.querySelector('.nav-links');

if (mobileNavTrigger && navLinks) {
    mobileNavTrigger.addEventListener('click', () => {
        mobileNavTrigger.classList.toggle('active');
        navLinks.classList.toggle('active');
    });
}

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
        
        // Auto-advance slides every 5 seconds
        setInterval(nextSlide, 5000);
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
