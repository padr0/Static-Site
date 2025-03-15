// Main JavaScript file

document.addEventListener('DOMContentLoaded', () => {
    // Set active nav link based on current page
    const currentPage = window.location.pathname;
    const navLinks = document.querySelectorAll('.nav-links a');
    
    navLinks.forEach(link => {
        const linkPath = link.getAttribute('href');
        if (currentPage.endsWith(linkPath)) {
            link.classList.add('active');
        } else if (currentPage.includes('/blog/') && linkPath === 'blog/index.html') {
            link.classList.add('active');
        } else if (currentPage.includes('/pages/') && linkPath.includes(currentPage.split('/').pop())) {
            link.classList.add('active');
        }
    });
    
    // Handle contact form submission if it exists
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        const formStatus = document.getElementById('formStatus');
        
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const formData = new FormData(contactForm);
            const url = contactForm.getAttribute('action');
            
            fetch(url, {
                method: 'POST',
                body: formData,
                headers: {
                    'Accept': 'application/json'
                }
            })
            .then(response => response.json())
            .then(data => {
                formStatus.innerHTML = '<p class="success-message">Thanks for your message! We\'ll get back to you soon.</p>';
                contactForm.reset();
            })
            .catch(error => {
                formStatus.innerHTML = '<p class="error-message">Oops! There was a problem sending your message. Please try again.</p>';
                console.error(error);
            });
        });
    }
}); 