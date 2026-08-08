// Simple Reveal Animation using Intersection Observer
document.addEventListener("DOMContentLoaded", () => {
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Add reveal class to all sections
    const elementsToReveal = document.querySelectorAll('.section, .bento-card, .timeline-item');
    
    elementsToReveal.forEach((el, i) => {
        el.style.opacity = "0";
        el.style.transform = "translateY(24px)";
        // Add a slight stagger effect based on index for grouped items like bento-cards
        const delay = (i % 3) * 0.1;
        el.style.transition = `opacity 0.6s cubic-bezier(0.16, 1, 0.3, 1) ${delay}s, transform 0.6s cubic-bezier(0.16, 1, 0.3, 1) ${delay}s`;
        observer.observe(el);
    });

    // Handle class addition for CSS transitions
    document.addEventListener('transitionend', (e) => {
        if (e.target.classList.contains('visible')) {
            e.target.style.opacity = "";
            e.target.style.transform = "";
            e.target.style.transition = "";
        }
    });

    // Override the style for elements with 'visible' class
    const style = document.createElement('style');
    style.innerHTML = `
        .visible {
            opacity: 1 !important;
            transform: translateY(0) !important;
        }
    `;
    document.head.appendChild(style);
});
