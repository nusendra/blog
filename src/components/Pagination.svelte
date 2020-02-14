<script>
  import { posts as postStore, chunkedPosts as chunkedPostsStore} from "../stores";

  export let posts = [];
  let currentPage = 1;
  let numberPerPage = 20;
  let begin = 0;
  let end = begin + numberPerPage;

  let chunkedPosts = [];

  const updatePage = () => {
    begin = (currentPage - 1) * numberPerPage;
    end = begin + numberPerPage;
    chunkedPostsStore.set(posts.slice(begin, end));
  }

  postStore.subscribe(value => {
    posts = value;
    updatePage();
  });

  chunkedPostsStore.subscribe(value => {
    chunkedPosts = value;
  });

  const numberOfPages = () => {
    return Math.ceil(posts.length / numberPerPage);
  }

  const next = () => {
    currentPage += 1;
    updatePage();
  }

  const previous = () => {
    currentPage -= 1;
    updatePage();
  }

  const first = () => {
    currentPage = 1;
    updatePage();
  }

  const last = () => {
    currentPage = numberOfPages();
    updatePage();
  }
</script>

<small>Page : {currentPage}</small>
<button on:click={first} disabled={currentPage == 1}>First</button>
<button on:click={previous} disabled={currentPage == 1}>Previous</button>
<button on:click={next} disabled={currentPage == numberOfPages()}>Next</button>
<button on:click={last} disabled={currentPage == numberOfPages()}>Last</button>
