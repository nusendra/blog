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
            .label BLOG POSTS
              .wide(v-for="{ node } in $page.allBlogPost.edges")
                .blog-title
                  router-link(:to="node.path") {{ node.title }}
                  br
                  .meta(:title="node.date")
              hr
              br
              Pager(:info="$page.allBlogPost.pageInfo")
</template>

<page-query>
  query Home ($page: Int) {
    allBlogPost (page: $page, perPage: 10) @paginate {
      pageInfo {
        totalPages
        currentPage
      }
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
import { Pager } from 'gridsome'

export default {
  components: { Pager }
}
</script>
