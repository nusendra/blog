import DefaultLayout from '~/layouts/Default.vue'
import '~/assets/style.min.css'

export default function (Vue, { head }) {
  Vue.component('Layout', DefaultLayout)
}
