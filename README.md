# Static Site with HTML, CSS, Javascript, and simple Node Libraries

A simple static site generator that uses Markdown for content creation and minimal Node.js libraries for building HTML pages.

## Features

- Simple landing page with modern design
- Blog section with Markdown support
- About, FAQ, and Contact pages
- Markdown to HTML conversion
- No complex frameworks or dependencies
- Responsive design that works on all devices

## Getting Started

### Prerequisites

- Node.js (v14 or later recommended)
- npm (comes with Node.js)

### Installation

1. Clone this repository or download the files
2. Install dependencies:

```bash
npm install
```

### Building the Site

To convert Markdown files to HTML and build the site:

```bash
npm run build
```

This will process all Markdown files in the `src/content/blog/posts` and `src/content/pages` directories, generate corresponding HTML files, and copy all assets to the `dist` directory.

### Running Locally

To preview the site locally:

```bash
npm run serve
```

This will start a local development server and open the site in your default browser.

For development (build and serve in one command):

```bash
npm run dev
```

## Project Structure

```
static-site/
├── src/                    # Source files
│   ├── index.html          # Landing page
│   ├── blog/
│   │   └── index.html      # Blog listing page
│   ├── assets/
│   │   ├── css/            # Stylesheets
│   │   │   └── styles.css
│   │   ├── js/             # JavaScript files
│   │   │   └── main.js
│   │   └── images/         # Image assets
│   └── content/            # Content files (Markdown)
│       ├── blog/
│       │   └── posts/      # Blog post Markdown files
│       └── pages/          # Static page Markdown files
├── dist/                   # Built files (generated)
├── build.js                # Build script for Markdown conversion
├── package.json            # Project dependencies
└── .gitignore              # Git ignore file
```

## Creating Content

### Adding a Blog Post

1. Create a new Markdown file in the `src/content/blog/posts` directory
2. Include front matter at the top of the file:

```markdown
---
title: Your Post Title
date: Month Day, Year
description: A brief description of your post
---

# Your Post Content Starts Here
```

3. Run `npm run build` to generate the HTML file

### Adding a Page

1. Create a new Markdown file in the `src/content/pages` directory
2. Include front matter at the top of the file:

```markdown
---
title: Your Page Title
---

# Your Page Content Starts Here
```

3. Run `npm run build` to generate the HTML file

## Customization

### Styling

Edit the `src/assets/css/styles.css` file to customize the appearance of your site.

### Templates

The HTML templates for blog posts and pages are defined in the `build.js` file. You can modify these templates to change the structure of the generated HTML files.

## Deployment

This static site can be deployed to any static hosting service:

1. Build the site: `npm run build`
2. Upload the contents of the `dist` directory to your hosting provider

Popular hosting options include:
- GitHub Pages
- Netlify
- Vercel
- AWS S3
- Firebase Hosting

## Plan

1. ✅ Make a simple landing page
2. ✅ Make a template for a blog post
3. ✅ Make a Markdown -> HTML converter
4. Simple Integration for ConvertKit
5. Add a contact form

## License

This project is licensed under the MIT License - see the LICENSE file for details.