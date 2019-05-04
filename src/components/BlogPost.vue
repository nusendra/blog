<template lang='pug'>
  .label.with-spacing BLOG POSTS
    .wide(v-for="{ node } in posts")
      .blog-title(v-if='node.draft === null')
        router-link(:to="node.path") {{ node.title }}
        br
        .blog-info {{ node.date }}
        .blog-info(v-for="(item,index) in node.tags") - {{ item.title }}
    hr
    br
    Pager(:info="pagination")
</template>

<script>
import { Pager } from 'gridsome'

export default {
  props: [ 'posts', 'pagination' ],
  components: { Pager }
}
</script>

<style scoped>
.blog-info {
  padding-top: 5px;
  padding-right: 5px;
  font-size: 0.7em;
  display: inline-block;
}
</style>
