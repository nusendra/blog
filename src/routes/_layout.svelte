<script>
  export let segment;
</script>

<div>
  <main>
    <slot></slot>
  </main>

  <footer class="container">
    <div class="footer">
        <div class="container">
            <div class="small">
                <div class="social">
                    <span>
                      &copy; {new Date().getFullYear()} Nusendra.com
                      Powered by <a href="https://sapper.svelte.dev" target="_blank">Sapper</a>.
                    </span>
                </div>
            </div>
        </div>
    </div>
  </footer>
</div>
