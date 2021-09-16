<script>
	import formatDate from "date-fns/format";

	export let title;
	export let date;
</script>

<svelte:head>
	<title>{title}</title>
	<meta property="og:title" content={title} />
</svelte:head>

<div class="container px-5 py-24 mx-auto flex flex-wrap flex-col">
	<article class="prose prose-lg max-w-none">
		<div class="lg:w-2/3 mx-auto leading-relaxed text-base">
			<h1 class="sm:text-xl text-xl font-medium title-font text-gray-900">
				{title}
			</h1>
			<h4 class="text-sm">
				Published at {formatDate(new Date(date), "yyyy-MM-dd")}
			</h4>
			<hr />
			<slot />
		</div>
	</article>
</div>
