<script>
	import { format, parseISO } from "date-fns";
	export let description;
	export let date;
	export let tags;
	export let title;
	export let slug;

	const parsedDate = parseISO(date);
	const formattedDate = format(parsedDate, "PPP");
</script>

<article
	class="group relative flex flex-col items-start transition ease-in-out delay-30 hover:-translate-y-1 hover:scale-110 hover:bg-blue-50 duration-300 p-5 hover:rounded-lg"
>
	<h2
		class="text-base font-semibold tracking-tight text-zinc-800 dark:text-zinc-100"
	>
		<div
			class="absolute -inset-x-4 -inset-y-6 z-0 scale-95 bg-zinc-50 opacity-0 transition group-hover:scale-100 group-hover:opacity-100 dark:bg-zinc-800/50 sm:-inset-x-6 sm:rounded-2xl"
		/>
		<a href={slug}><span
				class="absolute -inset-x-4 -inset-y-6 z-20 sm:-inset-x-6 sm:rounded-2xl"
			/><span class="relative z-10 text-xl">{title}</span></a
		>
	</h2>
	<time
		class="relative z-10 order-first mb-3 flex items-center text-sm
								text-zinc-400 text-gray-400"
		datetime={formattedDate}
		>{formattedDate}
		{#each tags as tag}
			<a
				href="#"
				class="relative z-10 rounded-full bg-blue-50 px-2 py-1 ml-2 font-medium
        text-gray-600">{tag}</a
			>
		{/each}
	</time>
	<p class="relative z-10 mt-2 text-md text-zinc-600">
		{description}
	</p>
	<div
		aria-hidden="true"
		class="relative z-10 mt-4 flex items-center text-sm font-medium text-teal-500"
	>
		Read article<svg
			viewBox="0 0 16 16"
			fill="none"
			aria-hidden="true"
			class="ml-1 h-4 w-4 stroke-current"
			><path
				d="M6.75 5.75 9.25 8l-2.5 2.25"
				stroke-width="1.5"
				stroke-linecap="round"
				stroke-linejoin="round"
			/></svg
		>
	</div>
</article>
