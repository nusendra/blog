import DefaultLayout from '~/layouts/Default.vue';
import VueFirestore from 'vue-firestore';
import VueDisqus from 'vue-disqus';
import '~/assets/style.min.css';

export default function (Vue, { head }) {
  Vue.use(VueDisqus);
  Vue.use(VueFirestore);
  Vue.component('Layout', DefaultLayout);

  head.link.push(
    {
      href:
        'https://cdnjs.cloudflare.com/ajax/libs/prism/1.16.0/themes/prism-tomorrow.min.css',
      rel: 'stylesheet'
    },
    {
      href: 'https://fonts.googleapis.com/css?family=Leckerli+One|Karla',
      rel: 'stylesheet'
    }
  );

  head.meta.push(
    { name: 'robots', content: 'index,follow' },
    { name: 'googlebot', content: 'index,follow' },
    { name: 'google-site-verification', content: 'FTUgjnGVYX1mfONGgk5FZkmKgeTti6_LLJ3q_-WiUE0' },
    { name: 'theme-color', content: '#b0c5e8' },
    { name: 'author', content: 'Nusendra Hanggarawan' },
    { name: 'mobile-web-app-capable', content: 'yes' },
    { name: 'twitter:card', content: 'summary' },
    { name: 'twitter:site', content: '@nusendra_' },
    { name: 'twitter:creator', content: '@nusendra_' },
    { name: 'twitter:url', content: 'https://twitter.com/nusendra_' },
    { name: 'twitter:title', content: 'Nusendra' },
    { name: 'twitter:description', content: 'Personal web blog yang memuat konten seputar kehidupan programmer dan aktifitas ngoding' },
    { name: 'google', content: 'nositelinkssearchbox' },
    { name: 'google', content: 'notranslate' }
  );
}
