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
});

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

// Slider functionality
const sliders = {
    delhi: { currentSlide: 0, totalSlides: 3 },
    mumbai: { currentSlide: 0, totalSlides: 3 },
    kolkata: { currentSlide: 0, totalSlides: 3 },
    chennai: { currentSlide: 0, totalSlides: 3 },
    bangalore: { currentSlide: 0, totalSlides: 3 }
};

function changeSlide(n, location) {
    const slider = document.getElementById(`${location}-slider`);
    const slides = slider.querySelectorAll('.slide');
    
    sliders[location].currentSlide = 
        (sliders[location].currentSlide + n + slides.length) % slides.length;
    
    slider.style.transform = `translateX(-${sliders[location].currentSlide * 100}%)`;
}

// Number counter animation
function animateNumbers() {
    const numbers = document.querySelectorAll('.number');
    numbers.forEach(number => {
        const target = +number.getAttribute('data-target');
        const increment = target / 100;
        let current = 0;

        const updateNumber = () => {
            current += increment;
            if (current < target) {
                number.textContent = Math.ceil(current).toLocaleString();
                requestAnimationFrame(updateNumber);
            } else {
                number.textContent = target > 1000 ? 
                    (target/100000).toFixed(0) + ' Lakh' : target;
            }
        };
        
        const observer = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting) {
                updateNumber();
                observer.unobserve(number.parentElement);
            }
        }, { threshold: 0.5 });
        
        observer.observe(number.parentElement);
    });
}

// Scroll Reveal
ScrollReveal().reveal('.hero-content, .section', {
    delay: 200,
    distance: '50px',
    origin: 'bottom',
    interval: 200
});

ScrollReveal().reveal('.number-card, .content-card', {
    delay: 300,
    distance: '30px',
    origin: 'bottom',
    interval: 200
});

// Auto-rotate slides
setInterval(() => {
    Object.keys(sliders).forEach(location => {
        changeSlide(1, location);
    });
}, 5000);

// Initialize number animation
document.addEventListener('DOMContentLoaded', animateNumbers);