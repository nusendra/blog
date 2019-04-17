<template lang='pug'>
  Layout
    .article
      .container
        .small
          .page-title
            h3
              a(href='/') Nusendra Hanggarawan
          .column
            .left
              p Home / Now / Contact
          .name {{ $page.blogPost.title }}
          .meta(title='Published at') {{ $page.blogPost.date }}
          // .meta(title='Views') 123
      .container
        .small
          .column
            p(v-html="$page.blogPost.content")
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
