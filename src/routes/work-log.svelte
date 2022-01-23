 <script context="module">
	export async function load({ fetch }) {
		const url = `/work-log.json`;
		const res = await fetch(url);
		const posts = await res.json();
		return {
			props: {
				posts: posts,
			},
		};
	}
</script>

<script>
	import BlogList from "../components/BlogList.svelte";
	export let posts;
</script>

<section class="text-gray-600 body-font overflow-hidden">
	<div class="container px-5 py-24 mx-auto">
		<div class="-my-8 divide-y-2 divide-gray-100">
			{#each posts as item, i}
				<BlogList
					slug="/work-log/{item.slug}"
					tags={item.tags.join(", ")}
					date={item.formatDistance}
					title={item.title}
					description={item.description}
				/>
			{/each}
		</div>
	</div>
</section>
