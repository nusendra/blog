import getPosts from "./post/_posts";

const siteUrl = "https://nusendra.com";

const renderXmlRssFeed = (posts) => `<?xml version="1.0" encoding="UTF-8" ?>
<rss xmlns:dc="http://purl.org/dc/elements/1.1/" xmlns:content="http://purl.org/rss/1.0/modules/content/" xmlns:atom="http://www.w3.org/2005/Atom" version="2.0">
<channel>
    <title><![CDATA[Nusendra's Blog]]></title>
    <link>${siteUrl}</link>
  <description><![CDATA[A Nusendra's blog. Talk about web and tech things.]]></description>
  <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <image>
        <url>${siteUrl}/images/profile-photo.jpg</url>
        <title><![CDATA[Nusendra's Blog]]></title>
        <link>${siteUrl}</link>
    </image>
    ${posts
      .map(
        (post) => `
        <item>
            <title>${post.title}</title>
      <link>${siteUrl}/${post.slug}</link>
      <guid isPermaLink="false">${siteUrl}/${post.slug}</guid>
            <description><![CDATA[${post.description}]]></description>
            <pubDate>${new Date(post.date).toUTCString()}</pubDate>
        </item>
    `
      )
      .join("\n")}
</channel>
</rss>`;

export function get(req, res) {
  res.writeHead(200, {
    "Cache-Control": `max-age=0, s-max-age=${600}`, // 10 minutes
    "Content-Type": "application/rss+xml",
  });

  const posts = getPosts.map((post) => {
    return {
      title: post.title,
      date: post.date,
      description: post.description,
      slug: post.slug,
    };
  });
  const feed = renderXmlRssFeed(posts);
  res.end(feed);
}
