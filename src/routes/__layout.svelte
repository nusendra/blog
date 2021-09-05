<script>
	import "../app.css";
	import "../tailwind.css";

	import MyHeader from "../components/Header.svelte";
	import MyFooter from "../components/Footer.svelte";
</script>

<MyHeader />
<slot />
<MyFooter />
