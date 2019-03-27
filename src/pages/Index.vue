<template lang='pug'>
  Layout
    #homepage
      .container
        .small
          .page-title
            .name Nusendra Hanggarawan
            .job Software Engineer
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
            span(v-for="(item,index) in chunk" :key="index")
              .left(v-if="item[0]")
                .blog-title
                  g-link(:to="item[0].node.path") {{ item[0].node.title }}
                p {{ item[0].node.description }}
              .right(v-if="item[1]")
                .blog-title
                  g-link(:to="item[1].node.path") {{ item[1].node.title }}
                p {{ item[1].node.description }}
                  .sailboat(v-if="index == chunk.length - 1")
</template>

<page-query>
  query Home ($page: Int) {
    allPost (page: $page) {
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
  },
  computed: {
    chunk() {
      const arr = this.$page.allPost.edges;
      const chunk = (arr, j) => arr.reduce((a,b,i,g) => !(i % j) ? a.concat([g.slice(i,i+j)]) : a, []);
      return chunk(arr, 2);
    }
  }
}
</script>
