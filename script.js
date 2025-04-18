// Hamburger Menu Toggle
document.addEventListener('DOMContentLoaded', () => {
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');

    hamburger.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        hamburger.classList.toggle('active');
    });

    navLinks.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
            hamburger.classList.remove('active');
        });
    });
});

// Smooth scroll with offset
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        const navbarHeight = document.querySelector('.navbar').offsetHeight;
        const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - navbarHeight;
        
        window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
        });
    });
});

// Scroll to home on page load
document.addEventListener('DOMContentLoaded', () => {
    const homeSection = document.querySelector('#home');
    const navbarHeight = document.querySelector('.navbar').offsetHeight;
    const targetPosition = homeSection.getBoundingClientRect().top + window.pageYOffset - navbarHeight;
    
    window.scrollTo({
        top: targetPosition,
        behavior: 'smooth'
    });
}, { once: true });

// Form validation
document.addEventListener('DOMContentLoaded', () => {
    const form = document.querySelector('.contact-form');
    form.addEventListener('submit', (e) => {
        const name = form.querySelector('input[name="name"]').value.trim();
        const email = form.querySelector('input[name="email"]').value.trim();
        const message = form.querySelector('textarea[name="message"]').value.trim();
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!name || !email || !message) {
            e.preventDefault();
            alert('Please fill out all fields.');
            return;
        }
        if (!emailRegex.test(email)) {
            e.preventDefault();
            alert('Please enter a valid email address.');
            return;
        }
    });
});

// Slider functionality with touch support
const sliders = {
    delhi: { currentSlide: 0, totalSlides: 3 },
    mumbai: { currentSlide: 0, totalSlides: 3 },
    kolkata: { currentSlide: 0, totalSlides: 3 },
    chennai: { currentSlide: 0, totalSlides: 3 },
    bangalore: { currentSlide: 0, totalSlides: 3 }
};

function changeSlide(n, location) {
    const slider = document.getElementById(`${location}-slider`).querySelector('.slider');
    const slides = slider.querySelectorAll('.slide');
    
    sliders[location].currentSlide = (sliders[location].currentSlide + n + slides.length) % slides.length;
    
    slider.style.transform = `translateX(-${sliders[location].currentSlide * 100}%)`;
    slider.style.transition = 'transform 0.6s ease-in-out';
}

// Touch swipe support for sliders
document.querySelectorAll('.slider-container').forEach(container => {
    const slider = container.querySelector('.slider');
    let touchStartX = 0;
    let touchEndX = 0;

    slider.addEventListener('touchstart', e => {
        touchStartX = e.changedTouches[0].screenX;
        slider.style.transition = 'none'; // Disable transition during touch
    });

    slider.addEventListener('touchend', e => {
        touchEndX = e.changedTouches[0].screenX;
        const location = container.id.split('-')[0];
        if (touchStartX - touchEndX > 50) {
            changeSlide(1, location); // Swipe left
        } else if (touchEndX - touchStartX > 50) {
            changeSlide(-1, location); // Swipe right
        }
        slider.style.transition = 'transform 0.6s ease-in-out'; // Re-enable transition
    });
});

// Number counter animation with easing
function animateNumbers() {
    const numbers = document.querySelectorAll('.number');
    numbers.forEach(number => {
        const target = +number.getAttribute('data-target');
        let start = 0;
        const duration = 2000;
        const startTime = performance.now();

        function easeInOutQuad(t) {
            return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
        }

        function updateNumber(currentTime) {
            const progress = Math.min((currentTime - startTime) / duration, 1);
            const easedProgress = easeInOutQuad(progress);
            const current = start + (target - start) * easedProgress;

            if (progress < 1) {
                number.textContent = Math.floor(current).toLocaleString();
                requestAnimationFrame(updateNumber);
            } else {
                number.textContent = target > 1000 ? (target / 100000).toFixed(0) + ' Lakh' : target.toLocaleString();
            }
        }

        const observer = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting) {
                requestAnimationFrame(updateNumber);
                observer.unobserve(number.parentElement);
            }
        }, { threshold: 0.5 });

        observer.observe(number.parentElement);
    });
}

// Enhanced Scroll Reveal
ScrollReveal({
    reset: false,
    distance: '60px',
    duration: 1000,
    easing: 'cubic-bezier(0.5, 0, 0.1, 1)',
    interval: 200,
    once: true
});

ScrollReveal().reveal('.hero-content', {
    origin: 'top',
    opacity: 0,
    scale: 0.9,
    rotate: { x: 10, y: 0, z: 0 }
});

ScrollReveal().reveal('.number-card, .content-card', {
    origin: 'bottom',
    opacity: 0,
    scale: 0.95
});

ScrollReveal().reveal('.slider-container', {
    origin: 'left',
    opacity: 0,
    distance: '80px'
});

// Auto-rotate slides with smooth transition
setInterval(() => {
    Object.keys(sliders).forEach(location => {
        changeSlide(1, location);
    });
}, 5000);

// Initialize animations
document.addEventListener('DOMContentLoaded', animateNumbers, { once: true });
