<script>
	import "../app.css";
	import "../tailwind.css";

	import MyHeader from "../components/Header.svelte";
	import MyFooter from "../components/Footer.svelte";
	/**
	 * @typedef {Object} Props
	 * @property {import('svelte').Snippet} [children]
	 */

	/** @type {Props} */
	let { children } = $props();
</script>

<MyHeader />

<div class="flex flex-col h-screen">
	<div class="mb-auto">
		{@render children?.()}
	</div>
	<MyFooter />
</div>

<div
	class="absolute inset-x-0 top-[-10rem] transform-gpu
	overflow-hidden blur-3xl sm:top-[-20rem]"
>
	<svg
		class="relative left-[calc(50%-11rem)] -z-10 h-[21.1875rem]
		max-w-none -translate-x-1/2 rotate-[30deg] sm:left-[calc(50%-30rem)] sm:h-[42.375rem]"
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
