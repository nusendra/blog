<script>
  import { stores } from '@sapper/app';
  const { page } = stores();
  $: {
    if (typeof gtag !== 'undefined') {
      gtag('config', 'UA-110929778-1', {
        page_path: $page.path,
      });
    }
  }
</script>
