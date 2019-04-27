<template lang='pug'>
  .resume
    .label.with-spacing Explore this blog
    ul
      li
        .company
          router-link(to="about") Who am I?
        .company
          router-link(to="now") What am I doing right now?
        .company
          router-link(to="contact") Get in touch with me
</template>
