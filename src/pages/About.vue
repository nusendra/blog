<template lang='pug'>
  Layout
    #homepage
      .container
        .small
          Header
          hr
          .column
            .left-profile
              img.center(src='https://cdn.staticaly.com/img/raw.githubusercontent.com/nusendra/blog/master/static/profile.png' style="width:150px;height:150px;")
            .right-profile
              p Hi, my name is Nusendra Hanggarawan, a software engineer, blogger, JavaScript enthusiast, technical community activist and movie addict.
              p Wanna know more? Click 
                a(href='/contact') here
              br
              p back to 
                a(href='/') Home
</template>

<script>
import Header from '../components/Header'

export default {
  components: { Header }
}
</script>

<style scoped>
.left-profile {
  vertical-align: top;
  width: 30%;
  display: inline-block;
  padding-right: 30px;
  box-sizing: border-box
}
.right-profile {
  vertical-align: top;
  width: 70%;
  display: inline-block;
  padding-left: 30px;
  box-sizing: border-box
}
</style>
