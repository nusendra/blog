<script context="module">
  export function preload({ params, query }) {
    return this.fetch(`post.json`)
      .then(r => r.json())
      .then(posts => {
        return { posts };
      });
  }
</script>

<script>
  import { onMount } from "svelte";
  import { posts as postStore, chunkedPosts as chunkedPostsStore} from "../stores";
  import Pagination from "../components/Pagination.svelte";

  export let posts;
  let chunkedPosts;

  onMount(() => {
    postStore.set(posts);
  });

  chunkedPostsStore.subscribe(value => {
    chunkedPosts = value;
  });
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
            {#each chunkedPosts as { title, printDate, slug }, index}
              <div class="blog-title">
                <a href="/post/{slug}">{printDate} {title}</a>
              </div>
            {/each}
          </div>
        </div>
      </div>
      <p>
      <hr />
      <Pagination posts={posts}/>
    </div>
  </div>
</div>
