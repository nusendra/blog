<script context="module">
  export function preload({ params, query }) {
    return this.fetch(`blog.json`)
      .then(r => r.json())
      .then(posts => {
        return { posts };
      });
  }
</script>

<script>
  export let posts;

  let currentPage = 1;
  let numberPerPage = 20;

  $: begin = (currentPage - 1) * numberPerPage;
  $: end = begin + numberPerPage;
  $: postList = posts.slice(begin, end);

  const numberOfPages = () => {
    return Math.ceil(posts.length / numberPerPage);
  }

  const next = () => {
    currentPage += 1;
  }

  const previous = () => {
    currentPage -= 1;
  }

  const first = () => {
    currentPage = 1;
  }

  const last = () => {
    currentPage = numberOfPages();
  }
</script>

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
      <div class="column">
        <div class="full">
          <p>
            I'm a software engineer who worked mostly with JavaScript language,
            Frontend and Backend. Sometimes I code in PHP too, using Lumen
            framework to build an API Services.
          </p>
        </div>
      </div>
    </div>
  </div>
  <div class="container">
    <div class="small">
      <div class="column">
        <div class="label with-spacing">
          BLOG POSTS
          <div class="wide">
            {#each postList as { title, printDate }, index}
              <div class="blog-title">
                <a href="/post/tips">{printDate} {title}</a>
              </div>
            {/each}
          </div>
        </div>
      </div>
      <p>
      <hr />
      <small>Page : {currentPage}</small>
      <button on:click={first} disabled={currentPage == 1}>First</button>
      <button on:click={previous} disabled={currentPage == 1}>Previous</button>
      <button on:click={next} disabled={currentPage == numberOfPages()}>Next</button>
      <button on:click={last} disabled={currentPage == numberOfPages()}>Last</button>
    </div>
  </div>
</div>
