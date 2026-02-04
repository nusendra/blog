/** @type {import('@sveltejs/kit').Config} */
import { mdsvex, escapeSvelte } from "mdsvex";
import preprocess from "svelte-preprocess";
import adapter from "@sveltejs/adapter-static";
import { createHighlighter } from 'shiki';

const theme = 'github-dark';
const highlighter = await createHighlighter({
	themes: [theme],
	langs: ['javascript', 'typescript', 'php', 'vim', 'vue', 'bash', 'ini']
});

const config = {
	extensions: [".svelte", ".md", ".svelte.md"],
	preprocess: [
		mdsvex({
			extensions: [".svelte.md", ".md", ".svx"],
			layout: {
				post: "./src/components/MarkdownLayout.svelte",
				"work-log": "./src/components/MarkdownLayout.svelte",
			},
			highlight: {
				highlighter: async (code, lang = 'text') => {
					const html = escapeSvelte(highlighter.codeToHtml(code, { lang, theme }));
					return `{@html \`${html}\` }`;
				}
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
	},
};

export default config;
