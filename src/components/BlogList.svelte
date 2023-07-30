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

<!-- <article class="flex max-w-xl flex-col items-start justify-between z-50">
  <div class="flex items-center gap-x-4 text-xs">
    <time datetime={formattedDate} class="text-gray-500">{formattedDate}</time>
    {#each tags as tag}
      <a href="#" class="relative z-10 rounded-full bg-gray-50 px-3 py-1.5 font-medium
        text-gray-600 hover:bg-gray-100">{tag}</a>
    {/each}
  </div>
  <div class="group relative">
    <h3 class="mt-3 text-lg font-semibold leading-6 text-gray-900 group-hover:text-gray-600">
      <a href={`/post/${slug}`}>
        <span class="absolute inset-0"></span>
        {title}
      </a>
    </h3>
    <p class="mt-5 line-clamp-3 text-sm leading-6
      text-gray-600">{description}</p>
  </div>
  <div class="relative mt-8 flex items-center gap-x-4">
    <img src="/profile.webp" alt="" class="h-10 w-10 rounded-full bg-gray-50">
    <div class="text-sm leading-6">
      <p class="font-semibold text-gray-900">
        <a href="#">
          <span class="absolute inset-0"></span>
          Nusendra Hanggarawan
        </a>
      </p>
      <p class="text-gray-600">Author</p>
    </div>
  </div>
</article> -->

<article
	class="group relative flex flex-col items-start transition ease-in-out delay-30 hover:-translate-y-1 hover:scale-110 hover:bg-blue-50 duration-300 p-5 hover:rounded-lg"
>
	<h2
		class="text-base font-semibold tracking-tight text-zinc-800 dark:text-zinc-100"
	>
		<div
			class="absolute -inset-x-4 -inset-y-6 z-0 scale-95 bg-zinc-50 opacity-0 transition group-hover:scale-100 group-hover:opacity-100 dark:bg-zinc-800/50 sm:-inset-x-6 sm:rounded-2xl"
		/>
		<a href={`/post/${slug}`}><span
				class="absolute -inset-x-4 -inset-y-6 z-20 sm:-inset-x-6 sm:rounded-2xl"
			/><span class="relative z-10 text-xl">{title}</span></a
		>
	</h2>
	<time
		class="relative z-10 order-first mb-3 flex items-center text-sm
								text-zinc-400 text-gray-400"
		datetime="2022-09-05"
		>September 5, 2022
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
