/** @type {import('@sveltejs/kit').Config} */
import { mdsvex, escapeSvelte } from "mdsvex";
import preprocess from "svelte-preprocess";
import adapter from "@sveltejs/adapter-static";
import { createHighlighter } from 'shiki';
import fs from 'node:fs';
import matter from 'gray-matter';

// Draft posts throw a 404 in src/routes/post/+layout.server.js so they never get
// written to the build output. Collect their paths here so the prerenderer can
// accept those 404s while still failing the build on any other broken link.
const draftPaths = fs
	.readdirSync('src/routes/post', { withFileTypes: true })
	.filter((entry) => entry.isDirectory())
	.filter((entry) => {
		const file = `src/routes/post/${entry.name}/+page.md`;
		return fs.existsSync(file) && matter(fs.readFileSync(file, 'utf-8')).data.draft;
	})
	.map((entry) => `/post/${entry.name}`);

const theme = 'github-dark';
const highlighter = await createHighlighter({
	themes: [theme],
	langs: ['javascript', 'typescript', 'php', 'vim', 'vue', 'bash', 'ini', 'rust', 'toml', 'yaml']
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
		prerender: {
			handleHttpError: ({ status, path, message }) => {
				if (status === 404 && draftPaths.includes(path)) return;
				throw new Error(message);
			},
		},
	},
};

export default config;
