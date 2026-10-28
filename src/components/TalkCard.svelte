<script>
	let {
		thumbnailUrl,
		thumbnailAlt,
		tag,
		title,
		description,
		slideUrl
	} = $props();
</script>

<div class="xl:w-1/4 md:w-1/2 p-4 flex">
	<div class="bg-gray-200 p-6 rounded-lg flex flex-col w-full">
		<img
			class="aspect-square rounded w-full object-cover object-center mb-6"
			src={thumbnailUrl}
			alt={thumbnailAlt}
		/>
		<h3 class="tracking-widest text-indigo-500 text-xs font-medium title-font">
			{tag}
		</h3>
		<h2 class="text-lg text-gray-900 font-medium title-font mb-4">
			{title}
		</h2>
		<p class="leading-relaxed text-base flex-grow">
			{description}
		</p>
		{#if slideUrl}
			<div class="flex flex-row-reverse">
				<a
					href={slideUrl}
					target="_blank"
					rel="noopener noreferrer"
					class="rounded focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-600 focus-visible:ring-offset-2 focus-visible:ring-offset-gray-200"
				>
					<button
						class="mt-3 text-black bg-yellow-400 border-0 py-1 px-5 hover:bg-indigo-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-600 focus-visible:ring-offset-2 focus-visible:ring-offset-gray-200 rounded text-md"
						>Slide</button
					></a
				>
			</div>
		{/if}
	</div>
</div>
