<script context="module">
	export async function load({ page, fetch }) {
		const url = `posts.json`;
		const res = await fetch(url);
		const posts = await res.json();

		return {
			props: {
				posts: posts.slice(0, 3),
			},
		};
	}
</script>

<script>
	import CourseList from "../components/CourseList.svelte";
	import BlogList from "../components/BlogList.svelte";

	export let posts;
</script>

<section class="text-gray-600 body-font bg-gray-100">
	<div class="container px-5 py-24 mx-auto">
		<div class="flex flex-wrap w-full mb-20">
			<div class="lg:w-1/2 w-full mb-6 lg:mb-0">
				<h1
					class="sm:text-3xl text-2xl font-medium title-font mb-2 text-gray-900"
				>
					Latest Youtube Playlists
				</h1>
			</div>
			<p class="lg:w-1/2 w-full leading-relaxed text-gray-500">
				Saya membuat playlist youtube yang membahas mengenai programming mulai
				dari dasar hingga bisa diimplementasikan ke dunia nyata. Video yang saya
				buat adalah seputar JavaScript, TypeScript, Design Pattern, dan Vuejs.
				Semoga playlist dibawah ini berguna untuk teman teman semuanya.
			</p>
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
			{#each posts as item, i}
				<BlogList
					slug={item.slug}
					tags={item.tags.join(", ")}
					date={item.formatDistance}
					title={item.title}
					description={item.description}
				/>
			{/each}
		</div>
	</div>
</section>
