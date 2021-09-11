<script>
	// These props get filled in from the page's front matter
	export let title
	export let coverImageUrl
</script>

<svelte:head>
	<title>{title}</title>
	<meta property="og:title" content={title} />
	<meta property="og:image" content={coverImageUrl} />
</svelte:head>

<article>
	<h1>{title}</h1>
	<slot />
	<a href="/blog">Back to blog index</a>
</article>
