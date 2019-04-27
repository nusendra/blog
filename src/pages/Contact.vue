<template lang='pug'>
  Layout
    #homepage
      .container
        .small
          Header
          hr
          .column
            .wide
              .small
              p Jangan malu malu untuk terhubung dengan saya. Silakan hubungi saya kapan saja..
              p
                ol
                  li
                    a(target="_blank" rel="noopener noreferrer" href="https://t.me/nusendra") Telegram
                  li
                    a(target="_blank" rel="noopener noreferrer" href="https://twitter.com/nusendra_") Twitter
                  li
                    a(target="_blank" rel="noopener noreferrer" href="https://www.linkedin.com/in/nusendra-hanggarawan-79854990/") LinkedIn
                  li
                    a(target="_blank" rel="noopener noreferrer" href="https://www.instagram.com/nusendra_/") Instagram
                  li
                    a(target="_blank" rel="noopener noreferrer" href="mailto:admin@nusendra.com") Email
                  li
                    a(target="_blank" rel="noopener noreferrer" href="https://www.facebook.com/andraeinstein") Facebook
                  li
                    a(target="_blank" rel="noopener noreferrer" href="https://medium.com/@nusendra") Medium
              p back to
                a(href='/')  Home
</template>

<script>
import Header from '../components/Header'

export default {
  components: { Header }
}
</script>
