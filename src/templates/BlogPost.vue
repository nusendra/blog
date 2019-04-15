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
          // .meta(title='Tags') {{ tags }}
          // .meta(title='Published at') {{ date }}
          // .meta(title='Views') 123
      .container
        .small
          .column
            p(v-html="$page.blogPost.content")
</template>

<script>
export default {
  metaInfo () {
    return {
      title: this.$page.blogPost.title
    }
  }
}
</script>

<page-query>
  query BlogPost ($path: String!) {
    blogPost (path: $path) {
      title
      date (format: "D MMMM, YYYY")
      content
      image
    }
  }
</page-query>
