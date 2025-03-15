---
title: Getting Started with Static Sites
date: June 1, 2023
description: Learn how to build a simple static site using HTML, CSS, and JavaScript without any complex frameworks.
---

# Getting Started with Static Sites

Static websites are making a comeback, and for good reason. They're fast, secure, and simple to maintain. In this post, we'll explore how to build a static site from scratch using just HTML, CSS, and JavaScript.

## Why Go Static?

Before diving into the how, let's talk about why you might want to build a static site:

1. **Speed**: Static sites load incredibly fast because there's no server-side processing or database queries.
2. **Security**: With no database or server-side code, there are fewer vulnerabilities to exploit.
3. **Simplicity**: Static sites are easier to understand, build, and maintain.
4. **Cost**: Hosting static sites is often free or very inexpensive.

## Basic Structure

A simple static site typically includes:

- HTML files for content
- CSS files for styling
- JavaScript files for interactivity
- Assets like images and fonts

Here's a basic project structure:

```
my-static-site/
├── index.html
├── css/
│   └── styles.css
├── js/
│   └── main.js
├── images/
└── blog/
    ├── index.html
    └── posts/
```

## HTML Basics

Your HTML files provide the structure and content of your site. Here's a simple example:

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>My Static Site</title>
    <link rel="stylesheet" href="css/styles.css">
</head>
<body>
    <header>
        <!-- Navigation goes here -->
    </header>
    
    <main>
        <!-- Main content goes here -->
    </main>
    
    <footer>
        <!-- Footer content goes here -->
    </footer>
    
    <script src="js/main.js"></script>
</body>
</html>
```

## Adding Style with CSS

CSS brings your site to life with colors, layout, and visual effects:

```css
/* Base styles */
body {
    font-family: 'Segoe UI', sans-serif;
    line-height: 1.6;
    color: #333;
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 20px;
}

header {
    padding: 1rem 0;
    border-bottom: 1px solid #eee;
}

/* Add more styles as needed */
```

## Enhancing with JavaScript

JavaScript adds interactivity to your static site:

```javascript
document.addEventListener('DOMContentLoaded', () => {
    // Your JavaScript code here
    const button = document.querySelector('.menu-toggle');
    button.addEventListener('click', () => {
        document.body.classList.toggle('menu-open');
    });
});
```

## Conclusion

Building a static site doesn't have to be complicated. With just HTML, CSS, and a bit of JavaScript, you can create a fast, secure, and beautiful website. In future posts, we'll explore how to add more advanced features like a blog with Markdown support and contact forms.

Stay tuned! 