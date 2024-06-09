<script>
	export let title;
	export let tools;
	export let imageUrl;
	export let imageAlt;
	export let types;
	export let description;
	export let details;
	export let projectUrl;
</script>

<div class="prose prose-lg prose-indigo mx-auto mt-24 text-gray-500">
	<div class="lg:col-start-3 lg:row-end-1">
		<h2 class="sr-only">{title}</h2>
		<div class="rounded-lg bg-gray-50 shadow-sm ring-1 ring-gray-900/5">
			<dl class="flex flex-wrap">
				<div class="flex-auto pl-6 pt-6">
					<dd class="mt-1 text-base font-semibold leading-6 text-gray-900">{title}</dd>
					<dt class="text-sm font-semibold leading-6 text-gray-900">Tools : {tools}</dt>
				</div>
				<div class="flex-none self-end px-6 pt-4">
					<dt class="sr-only">Project Type</dt>
						{#each types as item, i}
							<dd class="inline-flex items-center rounded-md bg-{item.color}-50 px-2 py-1
								text-xs font-medium text-{item.color}-700 ring-1 ring-inset
								ring-{item.color}-600/20 mx-1">{item.type}</dd>
						{/each}
				</div>

				<img src={imageUrl} alt={imageAlt} class="p-4"/>

				<div class="flex w-full flex-none gap-x-4 border-t border-gray-900/5 px-6 pt-6">
					<dt class="flex-none">
						<span class="sr-only">Description</span>
						<svg width="24" height="18" viewBox="0 0 24 18" aria-hidden="true" class="flex-shrink-0 text-gray-300">
							<path d="M0 18h8.7v-5.555c-.024-3.906 1.113-6.841 2.892-9.68L6.452 0C3.188 2.644-.026 7.86 0 12.469V18zm12.408 0h8.7v-5.555C21.083 8.539 22.22 5.604 24 2.765L18.859 0c-3.263 2.644-6.476 7.86-6.451 12.469V18z" fill="currentColor" />
						</svg>
					</dt>
					<dd class="text-sm leading-6 text-gray-900">
						<div class="font-medium">{description}</div>
						<div class="font-normalm mt-1">{details}</div>
					</dd>
				</div>
			</dl>
			<div class="mt-6 border-t border-gray-900/5 px-6 py-6">
				<a href={projectUrl} class="text-sm font-semibold leading-6 text-gray-900" target="_blank">Go to project page<span aria-hidden="true">&rarr;</span></a>
			</div>
		</div>
	</div>
</div>
