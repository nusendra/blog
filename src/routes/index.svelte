<script>
	import YoutubeCard from "../components/YoutubeCard.svelte";
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
		<div class="flex flex-wrap -m-4">
			<YoutubeCard
				imageSource="https://i.ibb.co/tm5QJcr/VUE3-ADVANCE-1.png"
				imageAlt="vue3 advance"
				titleTag="Frontend, Vuejs"
				title="Vue3 Tingkat Lanjut"
				totalVideos="13"
			/>
			<YoutubeCard
				imageSource="https://i.ibb.co/v1x0J5R/VUE3-ADVANCE.png"
				imageAlt="vue3 composition api"
				titleTag="Frontend, Vuejs"
				title="Vue3 Composition API"
				totalVideos="13"
			/>
			<YoutubeCard
				imageSource="https://i.ibb.co/7JfFFRv/vue3-dasar.png"
				imageAlt="vue3 dasar"
				titleTag="Frontend, Vuejs"
				title="Vue3 Tingkat Dasar"
				totalVideos="30"
			/>
			<YoutubeCard
				imageSource="https://i.ibb.co/n0xjW1L/ts-design-pattern.png"
				imageAlt="typescript design pattern"
				titleTag="Backend, TypeScript"
				title="TypeScript Design Pattern"
				totalVideos="18"
			/>
			<YoutubeCard
				imageSource="https://i.ibb.co/brf0Cpt/ts-oop.png"
				imageAlt="typescript oop"
				titleTag="Backend, TypeScript"
				title="TypeScript OOP"
				totalVideos="30"
			/>
			<YoutubeCard
				imageSource="https://i.ibb.co/LRqWHtz/ts-express.png"
				imageAlt="typescript expressjs"
				titleTag="Backend, TypeScript"
				title="TypeScript & ExpressJS"
				totalVideos="25"
			/>
			<YoutubeCard
				imageSource="https://i.ibb.co/YZLBtYT/ts-dasar.png"
				imageAlt="typescript dasar"
				titleTag="Backend, TypeScript"
				title="TypeScript Tingkat Dasar"
				totalVideos="25"
			/>
		</div>
	</div>
</section>

<section class="text-gray-600 body-font overflow-hidden">
	<div class="container px-5 py-24 mx-auto">
		<div class="-my-8 divide-y-2 divide-gray-100">
			<h1
				class="sm:text-3xl text-2xl font-medium title-font mb-2 text-gray-900"
			>
				Pitchfork Kickstarter Taxidermy
			</h1>
			<div class="py-8 flex flex-wrap md:flex-nowrap">
				<div class="md:w-64 md:mb-0 mb-6 flex-shrink-0 flex flex-col">
					<span class="font-semibold title-font text-gray-700">CATEGORY</span>
					<span class="mt-1 text-gray-500 text-sm">12 Jun 2019</span>
				</div>
				<div class="md:flex-grow">
					<h2 class="text-2xl font-medium text-gray-900 title-font mb-2">
						Bitters hashtag waistcoat fashion axe chia unicorn
					</h2>
					<p class="leading-relaxed">
						Glossier echo park pug, church-key sartorial biodiesel vexillologist
						pop-up snackwave ramps cornhole. Marfa 3 wolf moon party messenger
						bag selfies, poke vaporware kombucha lumbersexual pork belly
						polaroid hoodie portland craft beer.
					</p>
					<a class="text-indigo-500 inline-flex items-center mt-4"
						>Learn More
						<svg
							class="w-4 h-4 ml-2"
							viewBox="0 0 24 24"
							stroke="currentColor"
							stroke-width="2"
							fill="none"
							stroke-linecap="round"
							stroke-linejoin="round"
						>
							<path d="M5 12h14" />
							<path d="M12 5l7 7-7 7" />
						</svg>
					</a>
				</div>
			</div>
			<div class="py-8 flex flex-wrap md:flex-nowrap">
				<div class="md:w-64 md:mb-0 mb-6 flex-shrink-0 flex flex-col">
					<span class="font-semibold title-font text-gray-700">CATEGORY</span>
					<span class="mt-1 text-gray-500 text-sm">12 Jun 2019</span>
				</div>
				<div class="md:flex-grow">
					<h2 class="text-2xl font-medium text-gray-900 title-font mb-2">
						Meditation bushwick direct trade taxidermy shaman
					</h2>
					<p class="leading-relaxed">
						Glossier echo park pug, church-key sartorial biodiesel vexillologist
						pop-up snackwave ramps cornhole. Marfa 3 wolf moon party messenger
						bag selfies, poke vaporware kombucha lumbersexual pork belly
						polaroid hoodie portland craft beer.
					</p>
					<a class="text-indigo-500 inline-flex items-center mt-4"
						>Learn More
						<svg
							class="w-4 h-4 ml-2"
							viewBox="0 0 24 24"
							stroke="currentColor"
							stroke-width="2"
							fill="none"
							stroke-linecap="round"
							stroke-linejoin="round"
						>
							<path d="M5 12h14" />
							<path d="M12 5l7 7-7 7" />
						</svg>
					</a>
				</div>
			</div>
			<div class="py-8 flex flex-wrap md:flex-nowrap">
				<div class="md:w-64 md:mb-0 mb-6 flex-shrink-0 flex flex-col">
					<span class="font-semibold title-font text-gray-700">CATEGORY</span>
					<span class="text-sm text-gray-500">12 Jun 2019</span>
				</div>
				<div class="md:flex-grow">
					<h2 class="text-2xl font-medium text-gray-900 title-font mb-2">
						Woke master cleanse drinking vinegar salvia
					</h2>
					<p class="leading-relaxed">
						Glossier echo park pug, church-key sartorial biodiesel vexillologist
						pop-up snackwave ramps cornhole. Marfa 3 wolf moon party messenger
						bag selfies, poke vaporware kombucha lumbersexual pork belly
						polaroid hoodie portland craft beer.
					</p>
					<a class="text-indigo-500 inline-flex items-center mt-4"
						>Learn More
						<svg
							class="w-4 h-4 ml-2"
							viewBox="0 0 24 24"
							stroke="currentColor"
							stroke-width="2"
							fill="none"
							stroke-linecap="round"
							stroke-linejoin="round"
						>
							<path d="M5 12h14" />
							<path d="M12 5l7 7-7 7" />
						</svg>
					</a>
				</div>
			</div>
		</div>
	</div>
</section>
