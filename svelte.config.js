/** @type {import('@sveltejs/kit').Config} */
import adapter from "@sveltejs/adapter-static";
import { mdsvex } from "mdsvex";
import preprocess from "svelte-preprocess";

const config = {
	extensions: [".svelte", ".md", ".svelte.md"],
	preprocess: [
		mdsvex({
			extensions: [".svelte.md", ".md", ".svx"],
			layout: {
				blog: "./src/components/MarkdownLayout.svelte",
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
