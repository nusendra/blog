<template lang='pug'>
  body
    slot
    .footer
      .container
        .small
          .social
            ul
              li.linkedin
                a(href='https://www.linkedin.com/in/nusendra-hanggarawan-79854990/')
              li.instagram
                a(href='https://www.instagram.com/nusendra_/')
              li.email
                a(href='mailto:admin@nusendra.com') Feel free to mail me.
</template>

<static-query>
query {
  metaData {
    siteName
  }
}
</static-query>