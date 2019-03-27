<template lang='pug'>
  body
    #homepage
      .container
        .small
          .page-title
            h1 Nusendra Hanggarawan
            h2 Software Engineer
      .container
        .small
          .column
            .label Blog Posts
            .left
              h3 New Blog
              p this is the content
            .right
              h3 Oh shit
              p what the fuck u want?
              .sailboat
</template>

<static-query>
query {
  metaData {
    siteName
  }
}
</static-query>
