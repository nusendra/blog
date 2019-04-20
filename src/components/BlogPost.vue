<template lang='pug'>
  .label BLOG POSTS
    .wide(v-for="{ node } in posts")
      .blog-title
        router-link(:to="node.path") {{ node.title }}
        br
        .meta(:title="node.date")
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
