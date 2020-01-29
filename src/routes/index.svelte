<script>
  export let posts;
  let showItem = 6;

  function add() {
    showItem += 6;
  }
</script>

<script context="module">
  export function preload({ params, query }) {
    return this.fetch(`blog.json`).then(r => r.json()).then(posts => {
      return { posts };
    });
  }
</script>

<div id="homepage">
    <div class="container">
        <div class="small">
            <div class="page-title">
                <div class="name">
                    <h1>Nusendra Hanggarawan</h1></div>
                <div class="job">
                    <h2>Software Engineer</h2></div>
            </div>
            <hr>
            <div class="column">
                <div class="full">
                    <p>I'm a software engineer who worked mostly with JavaScript language, Frontend and Backend. Sometimes I code in PHP too, using Lumen framework to build an API Services.</p>
                    <p>
                      About / What am I doing right now
                    </p>
                </div>
            </div>
        </div>
    </div>
    <div class="container">
        <div class="small">
            <div class="column">
                <div class="label with-spacing">BLOG POSTS
                    <div class="wide">
                      {#each posts as { title, printDate }, index}
                      <div class="blog-title"><a href="/post/tips">{ printDate } { title }</a></div>
                      {/each}
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
<!--   {#each posts.slice(0, showItem) as { title, excerpt, printDate }, index} -->
<!--     <Card -->
<!--       title={ title } -->
<!--       excerpt={ excerpt } -->
<!--       date={ printDate } -->
<!--     /> -->

<!--     <!-1- {#if (index + 1) % 6 === 0} -1-> -->
<!--   {/each} -->

<!-- <button on:click={add}>test</button> -->
