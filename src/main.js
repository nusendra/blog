import DefaultLayout from '~/layouts/Default.vue'
import '~/assets/style.min.css'

export default function (Vue, { head }) {
  Vue.component('Layout', DefaultLayout)
  head.link.push({
    href:
      'https://cdnjs.cloudflare.com/ajax/libs/prism/1.15.0/themes/prism-tomorrow.min.css',
    rel: 'stylesheet'
  })
}
