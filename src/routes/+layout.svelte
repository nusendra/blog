<script>
	import "../app.css";
	import "../tailwind.css";

	import MyHeader from "../components/Header.svelte";
	import MyFooter from "../components/Footer.svelte";
</script>

<MyHeader />

<div class="flex flex-col h-screen">
	<div class="mb-auto">
		<slot />
	</div>
	<MyFooter />
</div>
