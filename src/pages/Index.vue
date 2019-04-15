<template lang='pug'>
  Layout
    #homepage
      .container
        .small
          .page-title
            .name Nusendra Hanggarawan
            .job Software Engineer
          hr
          .column
            .left
              p I'm a software engineer who worked mostly with JavaScript language, Frontend and Backend. Sometimes I code in PHP too, using Lumen framework to build an API Services.
            .right
              .resume
                .label Explore this blog
                ul
                  li
                    .company Who am I?
                    .company What am I doing right now?
                    .company Read my blog posts
                    .company Get in touch with me
      .container
        .small
          .column
            .label Latest Blog
            .wide(v-for='(item, index) in this.$page.allBlogPost.edges ' :key='index')
              .blog-title
                g-link(:to="item.node.path") {{ item.node.title }}
                br
                .meta(:title="item.node.date + ' | 0 views'")
</template>

<page-query>
  query Home ($page: Int) {
    allBlogPost (page: $page) {
      edges {
        node {
          _id
          title
          date (format: "D MMMM, YYYY")
          description
          path
        }
      }
    }
  }
</page-query>

<script>
export default {
  metaInfo: {
    title: 'Home'
  }
}
</script>
