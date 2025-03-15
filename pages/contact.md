---
title: Contact Us
---

# Contact Us

We'd love to hear from you! Whether you have questions about static websites, need help with your project, or just want to say hello, feel free to get in touch.

## Contact Form

<div class="contact-form">
  <form id="contactForm" action="https://formspree.io/f/your-formspree-id" method="POST">
    <div class="form-group">
      <label for="name">Name</label>
      <input type="text" id="name" name="name" required>
    </div>
    
    <div class="form-group">
      <label for="email">Email</label>
      <input type="email" id="email" name="email" required>
    </div>
    
    <div class="form-group">
      <label for="subject">Subject</label>
      <input type="text" id="subject" name="subject" required>
    </div>
    
    <div class="form-group">
      <label for="message">Message</label>
      <textarea id="message" name="message" rows="5" required></textarea>
    </div>
    
    <button type="submit" class="btn">Send Message</button>
  </form>
</div>

<div id="formStatus"></div>

## Other Ways to Connect

You can also reach us through:

- **Email**: example@mystaticsite.com
- **Twitter**: [@mystaticsite](https://twitter.com)
- **GitHub**: [mystaticsite](https://github.com)

## FAQ

Before contacting us, you might want to check our [FAQ page](/pages/faq.html) to see if your question has already been answered.

<script>
  document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('contactForm');
    const formStatus = document.getElementById('formStatus');
    
    if (form) {
      form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const formData = new FormData(form);
        const url = form.getAttribute('action');
        
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
          form.reset();
        })
        .catch(error => {
          formStatus.innerHTML = '<p class="error-message">Oops! There was a problem sending your message. Please try again.</p>';
          console.error(error);
        });
      });
    }
  });
</script>

<style>
  .contact-form {
    max-width: 600px;
    margin: 2rem 0;
  }
  
  .form-group {
    margin-bottom: 1.5rem;
  }
  
  label {
    display: block;
    margin-bottom: 0.5rem;
    font-weight: 500;
  }
  
  input, textarea {
    width: 100%;
    padding: 0.75rem;
    border: 1px solid #ddd;
    border-radius: 4px;
    font-family: inherit;
    font-size: 1rem;
  }
  
  textarea {
    resize: vertical;
  }
  
  .success-message {
    color: #28a745;
    padding: 1rem;
    background-color: #d4edda;
    border-radius: 4px;
    margin-top: 1rem;
  }
  
  .error-message {
    color: #dc3545;
    padding: 1rem;
    background-color: #f8d7da;
    border-radius: 4px;
    margin-top: 1rem;
  }
</style> 