<script>
  import CardWrapper from "../components/CardWrapper.svelte"
  import Card from "../components/Card.svelte";

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

<CardWrapper>
  {#each posts.slice(0, showItem) as { title, excerpt, printDate }, index}
    <Card
      title={ title }
      excerpt={ excerpt }
      date={ printDate }
    />

    <!-- {#if (index + 1) % 6 === 0} -->
  {/each}
</CardWrapper>

<button on:click={add}>test</button>
