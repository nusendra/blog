<script>
  import Header from "../components/Header.svelte";
</script>

<div>
  <main>
    <div id="homepage">
      <Header />
      <slot />

      <!-- The link below is just for allow expost static post -->
      <a href='post'></a>
    </div>
  </main>

  <footer class="container" style="margin-top: 50px;">
    <div class="footer">
      <div class="container">
        <div class="small">
          <div class="social">
            <span>
              &copy; {new Date().getFullYear()} Nusendra.com Powered by
              <a href="https://sapper.svelte.dev" target="_blank">Sapper</a>
              .
            </span>
          </div>
        </div>
      </div>
    </div>
  </footer>
</div>
