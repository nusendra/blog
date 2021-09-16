/** @type {import('@sveltejs/kit').Config} */
import { mdsvex } from "mdsvex";
import preprocess from "svelte-preprocess";
import adapter from "@sveltejs/adapter-static";

const config = {
	extensions: [".svelte", ".md", ".svelte.md"],
	preprocess: [
		mdsvex({
			extensions: [".svelte.md", ".md", ".svx"],
			layout: {
				post: "./src/components/MarkdownLayout.svelte",
			},
		}),
		preprocess({
			scss: {
				prependData: "@import 'src/lib/styles/variables.scss';",
			},
		}),
	],
	kit: {
		adapter: adapter(),
		// hydrate the <div id="svelte"> element in src/app.html
		target: "#svelte",
		vite: {
			ssr: {
				noExternal: Object.keys({}),
			},
		},
	},
};

export default config;
