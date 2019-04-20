<template lang='pug'>
  Layout
    #homepage
      .container
        .small
          Header
          hr
          .column
            .wide
              span wow about
</template>

<script>
import Header from '../components/Header'

export default {
  components: { Header }
}
</script>
