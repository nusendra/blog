<script>
	import BlogList from "../../components/BlogList.svelte";
	export let data;
</script>

<section class="text-gray-600 body-font overflow-hidden">
	<div class="container px-5 py-24 mx-auto">
		<div class="-my-8 divide-y-2 divide-gray-100">
			{#each data.posts as item, i}
				<BlogList
					tags={item.tags.join(", ")}
					date={item.formatDistance}
					description={item.description}
				>
					<h2 class="text-2xl font-medium text-gray-900 title-font mb-2">
						<a href="/work-log/{item.slug}">{item.title}</a>
					</h2>
				</BlogList>
			{/each}
		</div>
	</div>
</section>
