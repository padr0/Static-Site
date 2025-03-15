const fs = require('fs');
const path = require('path');
const marked = require('marked');
const matter = require('gray-matter');

// Configure marked options
marked.setOptions({
  gfm: true,
  breaks: true,
  smartLists: true,
  smartypants: true
});

// Template for blog posts
const blogPostTemplate = (content, frontMatter) => `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${frontMatter.title} | My Static Site</title>
    <link rel="stylesheet" href="../../css/styles.css">
</head>
<body>
    <header>
        <nav>
            <div class="logo">My Site</div>
            <ul class="nav-links">
                <li><a href="../../index.html">Home</a></li>
                <li><a href="../../blog/index.html">Blog</a></li>
                <li><a href="../../pages/about.html">About</a></li>
                <li><a href="../../pages/faq.html">FAQ</a></li>
                <li><a href="../../pages/contact.html">Contact</a></li>
            </ul>
        </nav>
    </header>

    <main>
        <section class="page-content">
            <div class="container">
                <article class="markdown-content">
                    <h1>${frontMatter.title}</h1>
                    <span class="blog-date">${frontMatter.date}</span>
                    ${content}
                </article>
            </div>
        </section>
    </main>

    <footer>
        <div class="container">
            <p>&copy; 2023 My Static Site. All rights reserved.</p>
        </div>
    </footer>

    <script src="../../js/main.js"></script>
</body>
</html>
`;

// Template for pages
const pageTemplate = (content, frontMatter) => `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${frontMatter.title} | My Static Site</title>
    <link rel="stylesheet" href="../css/styles.css">
</head>
<body>
    <header>
        <nav>
            <div class="logo">My Site</div>
            <ul class="nav-links">
                <li><a href="../index.html">Home</a></li>
                <li><a href="../blog/index.html">Blog</a></li>
                <li><a href="about.html">About</a></li>
                <li><a href="faq.html">FAQ</a></li>
                <li><a href="contact.html">Contact</a></li>
            </ul>
        </nav>
    </header>

    <main>
        <section class="page-content">
            <div class="container">
                <div class="markdown-content">
                    ${content}
                </div>
            </div>
        </section>
    </main>

    <footer>
        <div class="container">
            <p>&copy; 2023 My Static Site. All rights reserved.</p>
        </div>
    </footer>

    <script src="../js/main.js"></script>
</body>
</html>
`;

// Process blog posts
function processBlogPosts() {
  const postsDir = path.join(__dirname, 'blog', 'posts');
  const outputDir = path.join(__dirname, 'blog', 'posts');
  
  // Create output directory if it doesn't exist
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }
  
  // Get all markdown files
  const files = fs.readdirSync(postsDir).filter(file => file.endsWith('.md'));
  
  // Process each file
  files.forEach(file => {
    const filePath = path.join(postsDir, file);
    const fileContent = fs.readFileSync(filePath, 'utf8');
    
    // Parse front matter
    const { content, data } = matter(fileContent);
    
    // Convert markdown to HTML
    const htmlContent = marked.parse(content);
    
    // Create HTML file
    const htmlFilePath = path.join(outputDir, file.replace('.md', '.html'));
    const htmlFileContent = blogPostTemplate(htmlContent, data);
    
    fs.writeFileSync(htmlFilePath, htmlFileContent);
    console.log(`Processed: ${file} -> ${file.replace('.md', '.html')}`);
  });
}

// Process pages
function processPages() {
  const pagesDir = path.join(__dirname, 'pages');
  const outputDir = path.join(__dirname, 'pages');
  
  // Create output directory if it doesn't exist
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }
  
  // Get all markdown files
  const files = fs.readdirSync(pagesDir).filter(file => file.endsWith('.md'));
  
  // Process each file
  files.forEach(file => {
    const filePath = path.join(pagesDir, file);
    const fileContent = fs.readFileSync(filePath, 'utf8');
    
    // Parse front matter
    const { content, data } = matter(fileContent);
    
    // Convert markdown to HTML
    const htmlContent = marked.parse(content);
    
    // Create HTML file
    const htmlFilePath = path.join(outputDir, file.replace('.md', '.html'));
    const htmlFileContent = pageTemplate(htmlContent, data);
    
    fs.writeFileSync(htmlFilePath, htmlFileContent);
    console.log(`Processed: ${file} -> ${file.replace('.md', '.html')}`);
  });
}

// Run the build process
console.log('Building site...');
processBlogPosts();
processPages();
console.log('Build complete!'); 