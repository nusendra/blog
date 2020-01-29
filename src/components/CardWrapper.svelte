<svelte:head>
  <title>Sapper Blog Template</title>
</svelte:head>

<section class="cards-wrapper">
  <slot />
</section>

<style>
.cards-wrapper {
  display: grid;
  justify-content: center;
  align-items: center;
  grid-template-columns: 1fr 1fr 1fr;
  grid-gap: 4rem;
  padding: 4rem;
  margin: 0 auto;
  width: max-content;
}

/* MEDIA QUERIES */
@media screen and (max-width: 1285px) {
  .cards-wrapper {
    grid-template-columns: 1fr 1fr;
  }
}

@media screen and (max-width: 900px) {
  .cards-wrapper {
    grid-template-columns: 1fr;
  }
}

@media screen and (max-width: 500px) {
  .cards-wrapper {
    padding: 4rem 2rem;
  }
}
</style>
