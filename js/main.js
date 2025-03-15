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
}); 