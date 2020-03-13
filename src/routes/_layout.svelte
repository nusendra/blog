<script>
  import GoogleAnalytics from "../components/GoogleAnalytics.svelte";
</script>

<GoogleAnalytics />
<div>
  <main>
    <div id="homepage">
      <div class="container">
        <div class="small">
          <div class="page-title">
            <div class="name">
              <a href="/">
                <h1>Nusendra Hanggarawan</h1>
              </a>
            </div>
            <div>
              <a href=".">Home /</a>
              <a href="about">About /</a>
              <a href="online-course">Online Course</a>
            </div>
            <hr />
          </div>
        </div>
      </div>
      <slot />

      <!-- The link below is just for allow expost static post -->
      <a href="post"></a>
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
