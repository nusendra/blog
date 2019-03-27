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
          .name {{ $page.post.title }}
          .meta(title='Tags') {{ tags }}
          .meta(title='Published at') {{ date }}
          .meta(title='Views') 123
      .container
        .small
          .column
            p(v-html="$page.post.content")
</template>

<page-query>
query Post ($path: String!) {
  post (path: $path) {
    title
    date
    tags
    description
    content
  }
}
</page-query>

<script>
import moment from 'moment';

export default {
  metaInfo() {
    return {
      title: this.$page.post.title
    };
  },
  computed: {
    tags() {
      return this.$page.post.tags.join(",");
    },
    date() {
      return moment(this.$page.post.date).fromNow();
    }
  }
};
</script>
