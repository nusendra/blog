<script>
	import CourseList from "../../components/CourseList.svelte";
</script>

<div class="relative isolate overflow-hidden bg-white">
	<div
		class="mx-auto max-w-7xl px-6 pt-10 pb-24 sm:pb-32 lg:flex lg:py-20 lg:px-8"
	>
		<div class="mx-auto max-w-2xl lg:mx-0 lg:max-w-xl lg:flex-shrink-0 lg:pt-8">
			<h1
				class="mt-10 text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl"
			>
				Mau belajar Typescript, Express dan Vue.js dari dasar banget bro?
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

<section class="text-gray-600 body-font bg-gray-100">
	<div class="container px-5 py-24 mx-auto">
		<CourseList />
	</div>
</section>
