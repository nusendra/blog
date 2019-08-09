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
      slug
      title
      date (format: "D MMMM, YYYY")
      content
    }
  }
</page-query>

<script>
import { db } from '../libs/firestore';

export default {
  metaInfo() {
    return {
      title: this.$page.blogPost.title
    }
  },
  mounted() {
    this.$binding('slug', db.collection('posts').doc(this.$page.blogPost.slug))
      .then(slug => {
        let views = slug.views;
        let newViews = views + 1;

        // if document found, then increase the views count.
        db.collection('posts').doc(this.$page.blogPost.slug).update({
          views: newViews
        });
      })
      .catch(err => {
        // if document is not exists, then create one.
        db.collection('posts').doc(this.$page.blogPost.slug).set({
          views: 1
        });
      });
  }
}
</script>
