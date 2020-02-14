<script context="module">
  export async function preload({ params, query }) {
    // the `slug` parameter is available because
    // this file is called [slug].html
    const res = await this.fetch(`post/${params.slug}.json`);
    const data = await res.json();

    if (res.status === 200) {
      return { post: data };
    } else {
      this.error(res.status, data.message);
    }
  }
</script>

<script>
  import Bio from '../../components/Bio.svelte'
  export let post
</script>

<svelte:head>
  <title>{post.title}</title>
</svelte:head>

<div class="article">
  <div class="container">
    <div class="small home-description">
      <div class="blog-title-big">{post.title}</div>
      <div title="Published at" class="meta">{post.printDate}</div>
      <div title="Published at" class="meta">{post.printReadingTime}</div>
    </div>
  </div>
  <div class="container">
    <div class="small">
      <div class="column">
        <div class="post-content">
          <p>{@html post.html}</p>
        </div>
      </div>
    </div>
  </div>
</div>

<style>
.home-description {
  margin-top: -70px;
}
</style>
