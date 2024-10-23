<script>
	import { onMount } from 'svelte';
	/**
	 * @typedef {Object} Props
	 * @property {import('svelte').Snippet} [children]
	 */

	/** @type {Props} */
	let { children } = $props();

	let utterancesEl = $state()
	onMount(() => {
			// have to do this because direct injection using @html doesnt work
			// adapted from https://github.com/utterance/utterances/issues/161#issuecomment-550991248
      const scriptElem = document.createElement("script");
      scriptElem.src = "https://utteranc.es/client.js";
      scriptElem.async = true;
      scriptElem.crossOrigin = "anonymous";
			scriptElem.setAttribute("repo", "nusendra/blog");
			scriptElem.setAttribute("issue-term", "pathname");
      scriptElem.setAttribute("label", "blog-comment");
      scriptElem.setAttribute("theme", "github-light");
      utterancesEl.appendChild(scriptElem);
	})
</script>

<div>
	{@render children?.()}
	<div class="mb-8" bind:this={utterancesEl}></div>
</div>
