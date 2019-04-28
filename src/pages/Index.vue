<template lang='pug'>
  Layout
    #homepage
      .container
        .small
          Header
          hr
          .column
            .left
              p I'm a software engineer who worked mostly with JavaScript language, Frontend and Backend. Sometimes I code in PHP too, using Lumen framework to build an API Services.
            .right
              Menu
      .container
        .small
          .column
            BlogPost(:posts="$page.allBlogPost.edges" :pagination="$page.allBlogPost.pageInfo")
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
          tags {
            title
            path
          }
        }
      }
    }
  }
</page-query>

<script>
import Header from '../components/Header'
import Menu from '../components/Menu'
import BlogPost from '../components/BlogPost'

export default {
  components: {
    Header,
    Menu,
    BlogPost
  },
  metaInfo: {
    title: 'Software Engineer'
  }
}
</script>
