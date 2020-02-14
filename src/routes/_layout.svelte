<div>
  <main>
    <div id="homepage">
      <div class="container">
        <div class="small">
          <div class="page-title">
            <div class="name">
              <h1>Nusendra Hanggarawan</h1>
            </div>
            <span>Home / About / Now / Youtube</span>
            <hr />
          </div>
        </div>
      </div>
      <slot />
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
