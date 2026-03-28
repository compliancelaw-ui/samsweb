// Sam's OATH Website - Simple JavaScript

// Mobile Menu Toggle
document.addEventListener('DOMContentLoaded', function() {
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    const navCta = document.querySelector('.nav-cta');
    
    if (menuToggle) {
        menuToggle.addEventListener('click', function() {
            // Toggle mobile menu (you'll add mobile menu styles later)
            navLinks.classList.toggle('active');
            if (navCta) {
                navCta.classList.toggle('active');
            }
            menuToggle.classList.toggle('active');
        });
    }
    
    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href !== '#' && href.length > 1) {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }
        });
    });
});
