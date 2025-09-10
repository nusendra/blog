<script>
	/* throw new Error("@migration task: Add data prop (https://github.com/sveltejs/kit/discussions/5774#discussioncomment-3292707)"); */

	import { isBefore, isAfter } from "date-fns";

	import CourseList from "../components/CourseList.svelte";
	import BlogList from "../components/BlogList.svelte";
	import WorkHistoryItem from "../components/WorkHistoryItem.svelte";
	import workHistories from "../lib/utils/work-history";
	import playlist from "../lib/utils/video-playlist";

	let { data } = $props();

	const today = new Date();
	let status = 'Current';
	if (isBefore(today, new Date(data.event.start_date))) {
		status = 'Incoming';
	} else if (isAfter(today, new Date(data.event.end_date))) {
		status = 'Past'
	}
</script>

<div class="relative isolate overflow-hidden bg-white">
	<div
		class="mx-auto max-w-7xl px-6 pt-10 pb-24 sm:pb-32 lg:flex lg:py-20 lg:px-8"
	>
		<div class="mx-auto max-w-2xl lg:mx-0 lg:max-w-xl lg:flex-shrink-0 lg:pt-8">
			<h1
				class="mt-10 text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl"
			>
												Mau belajar Typescript, Express dan Vue.js dari dasar test 123?
			</h1>
			<p class="mt-6 text-lg leading-8 text-gray-600">
				Saya membuat beberapa series / playlist yang berisi video tutorial
				programming di Youtube. Saat ini masih membahas seputar JavaScript,
				Typescript, Express dan Vue.js
			</p>
			<div class="mt-10 flex items-center gap-x-6">
				<a
					href="https://www.youtube.com/@leskoding"
					class="rounded-md bg-blue-500 px-3.5 py-1.5 text-base font-semibold leading-7 text-white shadow-sm
					hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500"
					>Gas Nonton !!</a
				>
				<a
					href="https://leskoding.com"
					target="_blank"
					rel="noopener noreferrer"
					class="text-base font-semibold leading-7 text-gray-900"
					>Ini course apa sih ?<span aria-hidden="true">→</span></a
				>
			</div>
		</div>
		<div
			class="mx-auto mt-16 flex max-w-2xl sm:mt-24 lg:ml-10 lg:mt-0 lg:mr-0 lg:max-w-none lg:flex-none xl:ml-32"
		>
			<div class="max-w-3xl flex-none sm:max-w-5xl lg:max-w-none">
				<div
					class="-m-2 rounded-xl bg-gray-900/5 p-2 ring-1 ring-inset ring-gray-900/10 lg:-m-4 lg:rounded-2xl lg:p-4"
				>
					<img
						src="/playlist.webp"
						alt="App screenshot"
						width="2432"
						height="1442"
						class="w-[76rem] rounded-md shadow-2xl ring-1 ring-gray-900/10"
					/>
				</div>
			</div>
		</div>
	</div>
</div>

<div class="sm:px-8 mt-6 md:mt-6">
	<div class="mx-auto w-full max-w-7xl lg:px-8">
		<div class="relative px-4 sm:px-8 lg:px-12">
			<div class="mx-auto max-w-2xl lg:max-w-5xl">
				<div
					class="mx-auto grid max-w-xl grid-cols-1 gap-y-20 lg:max-w-none lg:grid-cols-2"
				>
					<div class="flex flex-col gap-5 z-50">
						{#each data.posts as item, i}
							<BlogList
								slug={item.slug}
								tags={item.tags}
								date={item.date}
								title={item.title}
								description={item.description}
							/>
						{/each}
					</div>
					<div class="space-y-10 lg:pl-16 xl:pl-24">
						<div
							class="rounded-2xl border border-zinc-100 p-6 dark:border-zinc-700/40"
						>
							<h2
								class="flex text-sm font-semibold text-zinc-900 dark:text-zinc-100"
							>
								<span>{status} Event</span>
							</h2>
							<img
								class="rounded w-full object-cover object-center mb-6 md:mb-0"
								src={data.event.image}
								alt={data.event.alt_image}
							/>
						<p class="mt-2 text-sm text-zinc-700 dark:text-zinc-300">
							{data.event.description} <!-- You can add description or more content here -->
						</p>
						</div>
						<div
							class="rounded-2xl border border-zinc-100 p-6 dark:border-zinc-700/40"
						>
							<h2
								class="flex text-sm font-semibold text-zinc-900 dark:text-zinc-100"
							>
								<span>Video Programming Series (100% Free)</span>
							</h2>
							<ol class="mt-6 space-y-4">
								{#each playlist as item}
									<li class="flex gap-4">
										<dl class="flex flex-auto flex-wrap gap-x-2">
											<dt class="sr-only">Playlist Title</dt>
											<dd
												class="text-sm font-medium text-zinc-500 dark:text-zinc-400 z-50"
											>
												<a
													href={item.url}
													target="_blank"
													rel="noopener noreferrer">{item.title}</a
												>
											</dd>
											<dt class="sr-only">Total Videos</dt>
											<dd
												class="ml-auto text-xs text-zinc-400 dark:text-zinc-500"
											>
												{item.totalVideos}
											</dd>
										</dl>
									</li>
								{/each}
							</ol>
						</div>
						<div
							class="rounded-2xl border border-zinc-100 p-6 dark:border-zinc-700/40"
						>
							<h2
								class="flex text-sm font-semibold text-zinc-900 dark:text-zinc-100"
							>
								<span>Work History</span>
							</h2>
							<ol class="mt-6 space-y-4">
								{#each workHistories as work}
									<WorkHistoryItem
										company={work.company}
										role={work.role}
										date={work.date}
									/>
								{/each}
							</ol>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</div>

<div
	class="absolute inset-x-0 top-[-10rem] transform-gpu
	overflow-hidden blur-3xl sm:top-[50rem]"
>
	<svg
		class="relative left-[calc(50%-11rem)] -z-10 h-[21.1875rem]
		max-w-none -translate-x-1/2 rotate-[30deg] sm:left-[calc(90%-30rem)] sm:h-[42.375rem]"
		viewBox="0 0 1155 678"
		xmlns="http://www.w3.org/2000/svg"
	>
		<path
			fill="url(#45de2b6b-92d5-4d68-a6a0-9b9b2abad533)"
			fill-opacity=".3"
			d="M317.219 518.975L203.852 678 0 438.341l317.219 80.634 204.172-286.402c1.307 132.337 45.083 346.658 209.733 145.248C936.936 126.058 882.053-94.234 1031.02 41.331c119.18 108.451 130.68 295.337 121.53 375.223L855 299l21.173 362.054-558.954-142.079z"
		/>
		<defs>
			<linearGradient
				id="45de2b6b-92d5-4d68-a6a0-9b9b2abad533"
				x1="1155.49"
				x2="-78.208"
				y1=".177"
				y2="474.645"
				gradientUnits="userSpaceOnUse"
			>
				<stop stop-color="#538ef5" />
				<stop offset="1" stop-color="#ff4d4d" />
			</linearGradient>
		</defs>
	</svg>
</div>
