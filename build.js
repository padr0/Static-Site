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

// Create directory if it doesn't exist
function ensureDirectoryExists(dirPath) {
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
  }
}

// Copy file from src to dist
function copyFile(src, dest) {
  ensureDirectoryExists(path.dirname(dest));
  fs.copyFileSync(src, dest);
  console.log(`Copied: ${src} -> ${dest}`);
}

// Template for blog posts
const blogPostTemplate = (content, frontMatter) => `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${frontMatter.title} | My Static Site</title>
    <link rel="stylesheet" href="../../assets/css/styles.css">
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

    <script src="../../assets/js/main.js"></script>
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
    <link rel="stylesheet" href="../assets/css/styles.css">
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

    <script src="../assets/js/main.js"></script>
</body>
</html>
`;

// Process blog posts
function processBlogPosts() {
  const postsDir = path.join(__dirname, 'src', 'content', 'blog', 'posts');
  const outputDir = path.join(__dirname, 'dist', 'blog', 'posts');
  
  // Create output directory if it doesn't exist
  ensureDirectoryExists(outputDir);
  
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
    
    ensureDirectoryExists(path.dirname(htmlFilePath));
    fs.writeFileSync(htmlFilePath, htmlFileContent);
    console.log(`Processed: ${file} -> ${file.replace('.md', '.html')}`);
  });
}

// Process pages
function processPages() {
  const pagesDir = path.join(__dirname, 'src', 'content', 'pages');
  const outputDir = path.join(__dirname, 'dist', 'pages');
  
  // Create output directory if it doesn't exist
  ensureDirectoryExists(outputDir);
  
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
    
    ensureDirectoryExists(path.dirname(htmlFilePath));
    fs.writeFileSync(htmlFilePath, htmlFileContent);
    console.log(`Processed: ${file} -> ${file.replace('.md', '.html')}`);
  });
}

// Copy static assets
function copyStaticAssets() {
  // Copy CSS files
  const cssDir = path.join(__dirname, 'src', 'assets', 'css');
  const cssDest = path.join(__dirname, 'dist', 'assets', 'css');
  ensureDirectoryExists(cssDest);
  
  fs.readdirSync(cssDir).forEach(file => {
    copyFile(
      path.join(cssDir, file),
      path.join(cssDest, file)
    );
  });
  
  // Copy JS files
  const jsDir = path.join(__dirname, 'src', 'assets', 'js');
  const jsDest = path.join(__dirname, 'dist', 'assets', 'js');
  ensureDirectoryExists(jsDest);
  
  fs.readdirSync(jsDir).forEach(file => {
    copyFile(
      path.join(jsDir, file),
      path.join(jsDest, file)
    );
  });
  
  // Copy HTML files from src
  const srcDir = path.join(__dirname, 'src');
  const htmlFiles = [
    'index.html',
    'blog/index.html'
  ];
  
  htmlFiles.forEach(file => {
    const srcPath = path.join(srcDir, file);
    const destPath = path.join(__dirname, 'dist', file);
    
    if (fs.existsSync(srcPath)) {
      ensureDirectoryExists(path.dirname(destPath));
      copyFile(srcPath, destPath);
    }
  });
  
  // Copy any images if they exist
  const imgDir = path.join(__dirname, 'src', 'assets', 'images');
  const imgDest = path.join(__dirname, 'dist', 'assets', 'images');
  
  if (fs.existsSync(imgDir)) {
    ensureDirectoryExists(imgDest);
    fs.readdirSync(imgDir).forEach(file => {
      copyFile(
        path.join(imgDir, file),
        path.join(imgDest, file)
      );
    });
  }
}

// Clean dist directory
function cleanDist() {
  const distDir = path.join(__dirname, 'dist');
  if (fs.existsSync(distDir)) {
    fs.rmSync(distDir, { recursive: true, force: true });
    console.log('Cleaned dist directory');
  }
  ensureDirectoryExists(distDir);
}

// Run the build process
console.log('Building site...');
cleanDist();
copyStaticAssets();
processBlogPosts();
processPages();
console.log('Build complete!'); 