<script>
	/* throw new Error("@migration task: Add data prop (https://github.com/sveltejs/kit/discussions/5774#discussioncomment-3292707)"); */

	import CourseList from "../components/CourseList.svelte";
	import BlogList from "../components/BlogList.svelte";

	export let data;
</script>

<section class="text-gray-600 body-font bg-gray-100">
	<div class="container px-5 py-24 mx-auto">
		<div class="flex flex-wrap w-full mb-10">
			<div class="lg:w-1/2 w-full mb-6 lg:mb-0">
				<h1
					class="sm:text-3xl text-2xl font-medium title-font mb-2 text-gray-900"
				>
					Latest Youtube Playlists
				</h1>
			</div>
		</div>
		<CourseList />
	</div>
</section>

<section class="text-gray-600 body-font overflow-hidden">
	<div class="container px-5 py-24 mx-auto">
		<div class="-my-8 divide-y-2 divide-gray-100">
			<h1
				class="sm:text-3xl text-2xl font-medium title-font mb-2 text-gray-900"
			>
				Latest Blog Posts
			</h1>
			{#each data.posts as item, i}
				<BlogList
					slug={item.slug}
					tags={item.tags.join(", ")}
					date={item.formatDistance}
					title={item.title}
					description={item.description}
				>
					<h2 class="text-2xl font-medium text-gray-900 title-font mb-2">
						<a href="/post/{item.slug}">{item.title}</a>
					</h2>
				</BlogList>
			{/each}
		</div>
	</div>
</section>
