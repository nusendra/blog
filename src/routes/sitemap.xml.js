const fs = require('fs');
const path = require('path');
const cwd = process.cwd();
const matter = require('gray-matter');
const formatDate = require('date-fns/format');

const BASE_URL = 'https://nusendra.com'; // TO CHANGE
const pages = [''];
const POSTS_DIR = path.join(cwd, 'src/routes/blog/posts/');
const EXCERPT_SEPARATOR = '<!-- more -->';

fs.readdirSync('./src/routes').forEach(file => {
  file = file.split('.')[0];
  if (file.charAt(0) !== '_' && file !== 'sitemap' && file !== 'index') {
    pages.push(file);
  }
});

const posts = fs
  .readdirSync(POSTS_DIR)
  .filter(fileName => /\.md$/.test(fileName))
  .map(fileName => {
    const fileMd = fs.readFileSync(path.join(POSTS_DIR, fileName), 'utf8');
    const { data, content: rawContent } = matter(fileMd);
    const { title, date, slug } = data;
    let content = rawContent;
    let excerpt = '';

    if (rawContent.indexOf(EXCERPT_SEPARATOR) !== -1) {
      const splittedContent = rawContent.split(EXCERPT_SEPARATOR);
      excerpt = splittedContent[0];
      content = splittedContent[1];
    }

    const printDate = formatDate(new Date(date), 'YYYY-MM-DD');

    return {
      title: title || slug,
      slug,
      date,
      printDate,
    };
  });

const render = (pages, posts) => `<?xml version="1.0" encoding="UTF-8" ?>
<urlset xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9 http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd">
  ${pages
    .map(
      page => `
    <url><loc>${BASE_URL}/${page}</loc><priority>0.85</priority></url>
  `,
    )
    .join('\n')}
  ${posts
    .map(
      post => `
    <url>
      <loc>${BASE_URL}/blog/${post.slug}</loc>
      <priority>0.69</priority>
    </url>
  `,
    )
    .join('\n')}
</urlset>
`;

export function get(req, res, next) {
  res.setHeader('Cache-Control', `max-age=0, s-max-age=${600}`); // 10 minutes
  res.setHeader('Content-Type', 'application/rss+xml');

  const sitemap = render(pages, posts);
  res.end(sitemap);
}
