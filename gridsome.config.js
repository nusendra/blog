module.exports = {
  siteName: `Nusendra Hanggarawan`,
  siteUrl: 'https://nusendra.com',
  siteDescription: 'Personal Blog of Nusendra',
  titleTemplate: `%s - Nusendra H.`,
  transformers: {
    remark: {
      externalLinksTarget: '_blank',
      externalLinksRel: ['nofollow', 'noopener', 'noreferrer'],
      anchorClassName: 'icon icon-link',
      plugins: [
        '@gridsome/remark-prismjs'
      ]
    }
  },

  plugins: [
    {
      use: '@gridsome/source-filesystem',
      options: {
        path: 'blog/*.md',
        typeName: 'BlogPost',
        route: '/:slug'
      }
    }
  ]
}
