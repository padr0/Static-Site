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

// Create dist directory if it doesn't exist
if (!fs.existsSync('dist')) {
  fs.mkdirSync('dist');
}

// Copy static assets (CSS, JS, images)
copyDir('src/assets', 'dist/assets');

// Process HTML files (excluding index.html)
const htmlFiles = getFilesInDir('src', '.html').filter(file => path.basename(file) !== 'index.html');
htmlFiles.forEach(file => {
  const content = fs.readFileSync(file, 'utf8');
  const outputPath = file.replace('src', 'dist');
  ensureDirExists(path.dirname(outputPath));
  
  // If it's a template file, process it
  if (content.includes('{{content}}')) {
    // This is a template file, skip processing it directly
    return;
  }
  
  fs.writeFileSync(outputPath, content);
});

// Copy index.html directly (no template processing)
if (fs.existsSync('src/index.html')) {
  fs.copyFileSync('src/index.html', 'dist/index.html');
} else {
  console.warn('Warning: src/index.html not found. Creating a template-based index.html');
  // Create a basic index.html with template parts
  createIndexWithTemplate();
}

// Process Markdown files
const mdFiles = getFilesInDir('src/content', '.md');
const template = fs.readFileSync('src/template.html', 'utf8');

mdFiles.forEach(file => {
  const content = fs.readFileSync(file, 'utf8');
  const { data, content: markdown } = matter(content);
  const html = marked.parse(markdown);
  
  let page = template.replace('{{content}}', html);
  
  // Replace any frontmatter variables
  Object.keys(data).forEach(key => {
    page = page.replace(`{{${key}}}`, data[key]);
  });
  
  const outputPath = file
    .replace('src/content', 'dist')
    .replace('.md', '.html');
  
  ensureDirExists(path.dirname(outputPath));
  fs.writeFileSync(outputPath, page);
});

// Helper functions
function copyDir(src, dest) {
  ensureDirExists(dest);
  const entries = fs.readdirSync(src, { withFileTypes: true });
  
  for (let entry of entries) {
    const srcPath = path.join(src, entry.name);
    const destPath = path.join(dest, entry.name);
    
    if (entry.isDirectory()) {
      copyDir(srcPath, destPath);
    } else {
      ensureDirExists(path.dirname(destPath));
      fs.copyFileSync(srcPath, destPath);
    }
  }
}

function getFilesInDir(dir, extension) {
  if (!fs.existsSync(dir)) {
    return [];
  }
  
  let results = [];
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  
  for (let entry of entries) {
    const fullPath = path.join(dir, entry.name);
    
    if (entry.isDirectory()) {
      results = results.concat(getFilesInDir(fullPath, extension));
    } else if (entry.isFile() && (!extension || fullPath.endsWith(extension))) {
      results.push(fullPath);
    }
  }
  
  return results;
}

function ensureDirExists(dir) {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
}

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

// Create index.html with template parts but custom content
function createIndexWithTemplate() {
  // Create a basic index content file if it doesn't exist
  const indexContentPath = path.join(__dirname, 'src', 'index-content.html');
  if (!fs.existsSync(indexContentPath)) {
    const basicIndexContent = `
<div class="hero">
  <h1>Welcome to My Static Site</h1>
  <p>A simple and elegant static site generator</p>
</div>

<section class="features">
  <div class="container">
    <h2>Features</h2>
    <div class="feature-grid">
      <div class="feature">
        <h3>Markdown Support</h3>
        <p>Write content in Markdown and convert it to HTML automatically.</p>
      </div>
      <div class="feature">
        <h3>Templates</h3>
        <p>Use templates for consistent layouts across your site.</p>
      </div>
      <div class="feature">
        <h3>Custom HTML</h3>
        <p>Edit the index page directly with HTML for complete control.</p>
      </div>
    </div>
  </div>
</section>

<section class="cta">
  <div class="container">
    <h2>Get Started</h2>
    <p>Check out the blog or learn more about this project.</p>
    <div class="buttons">
      <a href="blog/index.html" class="button">Read the Blog</a>
      <a href="pages/about.html" class="button button-outline">About</a>
    </div>
  </div>
</section>`;
    fs.writeFileSync(indexContentPath, basicIndexContent);
    console.log(`Created: ${indexContentPath}`);
  }

  // Read the index content
  const indexContent = fs.readFileSync(indexContentPath, 'utf8');

  // Create the full index.html with template parts
  const indexHtml = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Home | My Static Site</title>
    <link rel="stylesheet" href="assets/css/styles.css">
</head>
<body>
    <header>
        <nav>
            <div class="logo">My Site</div>
            <ul class="nav-links">
                <li><a href="index.html">Home</a></li>
                <li><a href="blog/index.html">Blog</a></li>
                <li><a href="pages/about.html">About</a></li>
                <li><a href="pages/faq.html">FAQ</a></li>
                <li><a href="pages/contact.html">Contact</a></li>
            </ul>
        </nav>
    </header>

    <main>
        ${indexContent}
    </main>

    <footer>
        <div class="container">
            <p>&copy; 2023 My Static Site. All rights reserved.</p>
        </div>
    </footer>

    <script src="assets/js/main.js"></script>
</body>
</html>`;

  fs.writeFileSync(path.join(__dirname, 'dist', 'index.html'), indexHtml);
  console.log('Created index.html with template parts and custom content');
}

// Run the build process
console.log('Building site...');
cleanDist();
copyStaticAssets();
processBlogPosts();
processPages();
console.log('Build complete!'); 