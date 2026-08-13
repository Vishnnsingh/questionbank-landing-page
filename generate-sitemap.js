import fs from 'fs';
import path from 'path';

// Define the site URL
const SITE_URL = 'https://prepmagic.in';

// List of all the routes in the application based on App.tsx
const routes = [
  '/',
  '/about',
  '/contact-us',
  '/terms-and-conditions',
  '/refunds-and-cancellations',
  '/privacy-policy',
  '/cbse-question-bank',
  '/bihar-board-question-bank',
  '/class-10-question-bank',
  '/class-12-question-bank',
  '/blog/bihar-board-class-12-previous-year-questions',
  '/blog/cbse-class-10-most-repeated-questions',
  '/signup',
  '/login',
  '/choose-plan'
];

// Generate sitemap XML content
const generateSitemap = () => {
  const currentDate = new Date().toISOString();

  let xml = `<?xml version="1.0" encoding="UTF-8"?>\n`;
  xml += `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n`;

  routes.forEach((route) => {
    // Basic priority logic: root is 1.0, main pages 0.8, others 0.6
    let priority = 0.6;
    let changefreq = 'monthly';
    
    if (route === '/') {
      priority = 1.0;
      changefreq = 'weekly';
    } else if (
      route.includes('question-bank') || 
      route.includes('blog') || 
      route === '/about'
    ) {
      priority = 0.8;
      changefreq = 'weekly';
    }

    xml += `  <url>\n`;
    xml += `    <loc>${SITE_URL}${route === '/' ? '' : route}</loc>\n`;
    xml += `    <lastmod>${currentDate}</lastmod>\n`;
    xml += `    <changefreq>${changefreq}</changefreq>\n`;
    xml += `    <priority>${priority.toFixed(1)}</priority>\n`;
    xml += `  </url>\n`;
  });

  xml += `</urlset>`;

  return xml;
};

// Write sitemap to dist directory (since it's a postbuild script)
// But we should also be able to run it and write to public/ if needed.
// Vite outputs to 'dist'. We'll write directly to dist/sitemap.xml.
const writeSitemap = () => {
  const sitemapContent = generateSitemap();
  const distPath = path.resolve(process.cwd(), 'dist');
  
  // Ensure dist directory exists
  if (!fs.existsSync(distPath)) {
    fs.mkdirSync(distPath, { recursive: true });
  }

  const sitemapPath = path.join(distPath, 'sitemap.xml');
  fs.writeFileSync(sitemapPath, sitemapContent, 'utf-8');
  console.log(`✅ Sitemap successfully generated at ${sitemapPath}`);
};

writeSitemap();
