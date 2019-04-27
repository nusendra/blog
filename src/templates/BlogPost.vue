<template lang='pug'>
  Layout
    .article
      .container
        .small
          .page-title
            h3
              a(href='/') Nusendra Hanggarawan
          hr
          .blog-title-big {{ $page.blogPost.title }}
          .meta(title='Published at') {{ $page.blogPost.date }}
          // .meta(title='Views') 123
      .container
        .small
          .column
            .post-content
              p(v-html="$page.blogPost.content")
              br
              vue-disqus(shortname="https-nusendra-com" :identifier="$page.blogPost.title")
</template>

<page-query>
  query BlogPost ($path: String!) {
    blogPost (path: $path) {
      title
      date (format: "D MMMM, YYYY")
      content
    }
  }
</page-query>
