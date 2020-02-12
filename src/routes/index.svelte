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
  let showItem = 20;

  function add() {
    showItem += 20;
  }

  let y;
  let i;
  let o;
</script>

<svelte:window bind:scrollY={y} bind:innerHeight={i} bind:outerHeight={o}/>

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
            {#each posts.slice(0, showItem) as { title, printDate }, index}
              <div class="blog-title">
                <a href="/post/tips">{printDate} {title}</a>
                y {y}
                i {i}
                o {o}
              </div>
            {/each}
          </div>
        </div>
      </div>
    </div>
  </div>
</div>

<button on:click={add}>test</button>
