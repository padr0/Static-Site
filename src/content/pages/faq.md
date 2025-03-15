---
title: Frequently Asked Questions
---

# Frequently Asked Questions

## General Questions

### What is a static website?

A static website consists of HTML, CSS, and JavaScript files that are delivered to the user exactly as they are stored. Unlike dynamic websites, static sites don't rely on server-side processing or databases to generate content on-the-fly.

### What are the benefits of static websites?

Static websites offer several advantages:
- **Speed**: They load faster because there's no server-side processing
- **Security**: With no database or server-side code, there are fewer security vulnerabilities
- **Reliability**: Static sites are less likely to crash or experience downtime
- **Simplicity**: They're easier to build, maintain, and understand
- **Cost**: Hosting static sites is typically less expensive

### Can I have dynamic features on a static site?

Yes! While the site itself is static, you can add dynamic features using JavaScript and third-party services. For example:
- Comments via Disqus or similar services
- Forms using Formspree or Netlify Forms
- Search functionality with tools like Lunr.js
- E-commerce capabilities with Snipcart or similar services

## Technical Questions

### How do I update content on a static site?

To update content on a static site, you typically:
1. Edit the HTML, CSS, or JavaScript files
2. Rebuild the site if you're using a static site generator
3. Upload the updated files to your web server

With this project, we use Markdown for content and a simple build process to convert it to HTML.

### Do I need to know programming to maintain a static site?

It depends on the complexity of your site. For basic updates to content written in Markdown, you don't need programming knowledge. For more complex changes to the site's structure or functionality, some knowledge of HTML, CSS, and JavaScript is helpful.

### What tools do I need to build a static site?

At minimum, you need:
- A text editor (like VS Code, Sublime Text, or even Notepad)
- A web browser for testing
- A way to upload files to your web server (FTP client or Git)

For this project, we also use:
- Node.js for the build process
- Markdown for content creation
- A few simple npm packages for Markdown conversion

### How do I deploy a static site?

There are many ways to deploy a static site:
- Traditional web hosting (upload via FTP)
- GitHub Pages
- Netlify
- Vercel
- AWS S3
- Firebase Hosting

Most of these services offer free tiers that are perfect for personal or small business sites.

## Content Questions

### Can I have a blog on a static site?

Absolutely! This site includes a blog section. The blog posts are written in Markdown and converted to HTML during the build process.

### How do I add images and other media?

You can add images and other media files to your static site by:
1. Adding the files to your project directory (e.g., in an "images" folder)
2. Referencing them in your HTML or Markdown files

For example, in Markdown:
```markdown
![Alt text](/images/my-image.jpg)
```

### Can I have comments on my blog posts?

Yes, you can add comments to a static site using third-party services like Disqus, Utterances (GitHub-based comments), or similar tools.

## Still Have Questions?

If you have a question that's not answered here, please [contact us](/pages/contact.html) and we'll be happy to help! 