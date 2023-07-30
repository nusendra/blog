<script>
	/* throw new Error("@migration task: Add data prop (https://github.com/sveltejs/kit/discussions/5774#discussioncomment-3292707)"); */

	import CourseList from "../components/CourseList.svelte";
	import BlogList from "../components/BlogList.svelte";

	export let data;
</script>

<div class="relative isolate overflow-hidden bg-white">
	<div
		class="mx-auto max-w-7xl px-6 pt-10 pb-24 sm:pb-32 lg:flex lg:py-20 lg:px-8"
	>
		<div class="mx-auto max-w-2xl lg:mx-0 lg:max-w-xl lg:flex-shrink-0 lg:pt-8">
			<h1
				class="mt-10 text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl"
			>
				Mau belajar Typescript, Express dan Vue.js dari dasar?
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

<div class="sm:px-8 mt-24 md:mt-28">
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
								<svg
									viewBox="0 0 24 24"
									fill="none"
									stroke-width="1.5"
									stroke-linecap="round"
									stroke-linejoin="round"
									aria-hidden="true"
									class="h-6 w-6 flex-none"
									><path
										d="M2.75 9.75a3 3 0 0 1 3-3h12.5a3 3 0 0 1 3 3v8.5a3 3 0 0 1-3 3H5.75a3 3 0 0 1-3-3v-8.5Z"
										class="fill-zinc-100 stroke-zinc-400 dark:fill-zinc-100/10 dark:stroke-zinc-500"
									/><path
										d="M3 14.25h6.249c.484 0 .952-.002 1.316.319l.777.682a.996.996 0 0 0 1.316 0l.777-.682c.364-.32.832-.319 1.316-.319H21M8.75 6.5V4.75a2 2 0 0 1 2-2h2.5a2 2 0 0 1 2 2V6.5"
										class="stroke-zinc-400 dark:stroke-zinc-500"
									/></svg
								><span class="ml-3">Work</span>
							</h2>
							<ol class="mt-6 space-y-4">
								<li class="flex gap-4">
									<div
										class="relative mt-1 flex h-10 w-10 flex-none items-center justify-center rounded-full shadow-md shadow-zinc-800/5 ring-1 ring-zinc-900/5 dark:border dark:border-zinc-700/50 dark:bg-zinc-800 dark:ring-0"
									>
										<img
											alt=""
											loading="lazy"
											width="32"
											height="32"
											decoding="async"
											data-nimg="1"
											class="h-7 w-7"
											style="color:transparent"
											src="/_next/static/media/planetaria.ecd81ade.svg"
										/>
									</div>
									<dl class="flex flex-auto flex-wrap gap-x-2">
										<dt class="sr-only">Company</dt>
										<dd
											class="w-full flex-none text-sm font-medium text-zinc-900 dark:text-zinc-100"
										>
											Planetaria
										</dd>
										<dt class="sr-only">Role</dt>
										<dd class="text-xs text-zinc-500 dark:text-zinc-400">
											CEO
										</dd>
										<dt class="sr-only">Date</dt>
										<dd
											class="ml-auto text-xs text-zinc-400 dark:text-zinc-500"
											aria-label="2019 until Present"
										>
											<time datetime="2019">2019</time>
											<span aria-hidden="true">—</span>
											<time datetime="2023">Present</time>
										</dd>
									</dl>
								</li>
								<li class="flex gap-4">
									<div
										class="relative mt-1 flex h-10 w-10 flex-none items-center justify-center rounded-full shadow-md shadow-zinc-800/5 ring-1 ring-zinc-900/5 dark:border dark:border-zinc-700/50 dark:bg-zinc-800 dark:ring-0"
									>
										<img
											alt=""
											loading="lazy"
											width="28"
											height="28"
											decoding="async"
											data-nimg="1"
											class="h-7 w-7"
											style="color:transparent"
											src="/_next/static/media/airbnb.b4000690.svg"
										/>
									</div>
									<dl class="flex flex-auto flex-wrap gap-x-2">
										<dt class="sr-only">Company</dt>
										<dd
											class="w-full flex-none text-sm font-medium text-zinc-900 dark:text-zinc-100"
										>
											Airbnb
										</dd>
										<dt class="sr-only">Role</dt>
										<dd class="text-xs text-zinc-500 dark:text-zinc-400">
											Product Designer
										</dd>
										<dt class="sr-only">Date</dt>
										<dd
											class="ml-auto text-xs text-zinc-400 dark:text-zinc-500"
											aria-label="2014 until 2019"
										>
											<time datetime="2014">2014</time>
											<span aria-hidden="true">—</span>
											<time datetime="2019">2019</time>
										</dd>
									</dl>
								</li>
								<li class="flex gap-4">
									<div
										class="relative mt-1 flex h-10 w-10 flex-none items-center justify-center rounded-full shadow-md shadow-zinc-800/5 ring-1 ring-zinc-900/5 dark:border dark:border-zinc-700/50 dark:bg-zinc-800 dark:ring-0"
									>
										<img
											alt=""
											loading="lazy"
											width="28"
											height="28"
											decoding="async"
											data-nimg="1"
											class="h-7 w-7"
											style="color:transparent"
											src="/_next/static/media/facebook.dd9e7d48.svg"
										/>
									</div>
									<dl class="flex flex-auto flex-wrap gap-x-2">
										<dt class="sr-only">Company</dt>
										<dd
											class="w-full flex-none text-sm font-medium text-zinc-900 dark:text-zinc-100"
										>
											Facebook
										</dd>
										<dt class="sr-only">Role</dt>
										<dd class="text-xs text-zinc-500 dark:text-zinc-400">
											iOS Software Engineer
										</dd>
										<dt class="sr-only">Date</dt>
										<dd
											class="ml-auto text-xs text-zinc-400 dark:text-zinc-500"
											aria-label="2011 until 2014"
										>
											<time datetime="2011">2011</time>
											<span aria-hidden="true">—</span>
											<time datetime="2014">2014</time>
										</dd>
									</dl>
								</li>
								<li class="flex gap-4">
									<div
										class="relative mt-1 flex h-10 w-10 flex-none items-center justify-center rounded-full shadow-md shadow-zinc-800/5 ring-1 ring-zinc-900/5 dark:border dark:border-zinc-700/50 dark:bg-zinc-800 dark:ring-0"
									>
										<img
											alt=""
											loading="lazy"
											width="28"
											height="28"
											decoding="async"
											data-nimg="1"
											class="h-7 w-7"
											style="color:transparent"
											src="/_next/static/media/starbucks.4a5bd050.svg"
										/>
									</div>
									<dl class="flex flex-auto flex-wrap gap-x-2">
										<dt class="sr-only">Company</dt>
										<dd
											class="w-full flex-none text-sm font-medium text-zinc-900 dark:text-zinc-100"
										>
											Starbucks
										</dd>
										<dt class="sr-only">Role</dt>
										<dd class="text-xs text-zinc-500 dark:text-zinc-400">
											Shift Supervisor
										</dd>
										<dt class="sr-only">Date</dt>
										<dd
											class="ml-auto text-xs text-zinc-400 dark:text-zinc-500"
											aria-label="2008 until 2011"
										>
											<time datetime="2008">2008</time>
											<span aria-hidden="true">—</span>
											<time datetime="2011">2011</time>
										</dd>
									</dl>
								</li>
							</ol>
							<a
								class="inline-flex items-center gap-2 justify-center rounded-md py-2 px-3 text-sm outline-offset-2 transition active:transition-none bg-zinc-50 font-medium text-zinc-900 hover:bg-zinc-100 active:bg-zinc-100 active:text-zinc-900/60 dark:bg-zinc-800/50 dark:text-zinc-300 dark:hover:bg-zinc-800 dark:hover:text-zinc-50 dark:active:bg-zinc-800/50 dark:active:text-zinc-50/70 group mt-6 w-full"
								href="/#"
								>Download CV<svg
									viewBox="0 0 16 16"
									fill="none"
									aria-hidden="true"
									class="h-4 w-4 stroke-zinc-400 transition group-active:stroke-zinc-600 dark:group-hover:stroke-zinc-50 dark:group-active:stroke-zinc-50"
									><path
										d="M4.75 8.75 8 12.25m0 0 3.25-3.5M8 12.25v-8.5"
										stroke-width="1.5"
										stroke-linecap="round"
										stroke-linejoin="round"
									/></svg
								></a
							>
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
