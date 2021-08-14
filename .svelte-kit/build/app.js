import { respond } from '@sveltejs/kit/ssr';
import root from './generated/root.svelte';
import { set_paths, assets } from './runtime/paths.js';
import { set_prerendering } from './runtime/env.js';
import * as user_hooks from "./hooks.js";

const template = ({ head, body }) => "<!DOCTYPE html>\n<html lang=\"en\">\n\t<head>\n\t\t<meta charset=\"utf-8\" />\n\t\t<link rel=\"icon\" href=\"/favicon.png\" />\n\t\t<meta name=\"viewport\" content=\"width=device-width, initial-scale=1\" />\n\t\t" + head + "\n\t</head>\n\t<body>\n\t\t<div id=\"svelte\">" + body + "</div>\n\t</body>\n</html>\n";

let options = null;

const default_settings = { paths: {"base":"","assets":""} };

// allow paths to be overridden in svelte-kit preview
// and in prerendering
export function init(settings = default_settings) {
	set_paths(settings.paths);
	set_prerendering(settings.prerendering || false);

	const hooks = get_hooks(user_hooks);

	options = {
		amp: false,
		dev: false,
		entry: {
			file: assets + "/_app/start-c1589911.js",
			css: [assets + "/_app/assets/start-8077b9bf.css"],
			js: [assets + "/_app/start-c1589911.js",assets + "/_app/chunks/vendor-52401ce2.js"]
		},
		fetched: undefined,
		floc: false,
		get_component_path: id => assets + "/_app/" + entry_lookup[id],
		get_stack: error => String(error), // for security
		handle_error: (error, request) => {
			hooks.handleError({ error, request });
			error.stack = options.get_stack(error);
		},
		hooks,
		hydrate: true,
		initiator: undefined,
		load_component,
		manifest,
		paths: settings.paths,
		prerender: true,
		read: settings.read,
		root,
		service_worker: null,
		router: true,
		ssr: true,
		target: "#svelte",
		template,
		trailing_slash: "never"
	};
}

const d = decodeURIComponent;
const empty = () => ({});

const manifest = {
	assets: [{"file":"favicon.png","size":1571,"type":"image/png"}],
	layout: ".svelte-kit/build/components/layout.svelte",
	error: ".svelte-kit/build/components/error.svelte",
	routes: [
		{
						type: 'page',
						pattern: /^\/$/,
						params: empty,
						a: [".svelte-kit/build/components/layout.svelte", "src/routes/index.svelte"],
						b: [".svelte-kit/build/components/error.svelte"]
					},
		{
						type: 'page',
						pattern: /^\/test-blog-md\/?$/,
						params: empty,
						a: [".svelte-kit/build/components/layout.svelte", "src/routes/test-blog-md/index.md"],
						b: [".svelte-kit/build/components/error.svelte"]
					},
		{
						type: 'endpoint',
						pattern: /^\/([^/]+?)\.json$/,
						params: (m) => ({ slug: d(m[1])}),
						load: () => import("../../src/routes/[slug].json.js")
					},
		{
						type: 'page',
						pattern: /^\/([^/]+?)\/?$/,
						params: (m) => ({ slug: d(m[1])}),
						a: [".svelte-kit/build/components/layout.svelte", "src/routes/[slug].svelte"],
						b: [".svelte-kit/build/components/error.svelte"]
					}
	]
};

// this looks redundant, but the indirection allows us to access
// named imports without triggering Rollup's missing import detection
const get_hooks = hooks => ({
	getSession: hooks.getSession || (() => ({})),
	handle: hooks.handle || (({ request, resolve }) => resolve(request)),
	handleError: hooks.handleError || (({ error }) => console.error(error.stack)),
	serverFetch: hooks.serverFetch || fetch
});

const module_lookup = {
	".svelte-kit/build/components/layout.svelte": () => import("./components/layout.svelte"),".svelte-kit/build/components/error.svelte": () => import("./components/error.svelte"),"src/routes/index.svelte": () => import("../../src/routes/index.svelte"),"src/routes/test-blog-md/index.md": () => import("../../src/routes/test-blog-md/index.md"),"src/routes/[slug].svelte": () => import("../../src/routes/[slug].svelte")
};

const metadata_lookup = {".svelte-kit/build/components/layout.svelte":{"entry":"layout.svelte-96cb8070.js","css":[],"js":["layout.svelte-96cb8070.js","chunks/vendor-52401ce2.js"],"styles":[]},".svelte-kit/build/components/error.svelte":{"entry":"error.svelte-9244150a.js","css":[],"js":["error.svelte-9244150a.js","chunks/vendor-52401ce2.js"],"styles":[]},"src/routes/index.svelte":{"entry":"pages/index.svelte-9d541552.js","css":[],"js":["pages/index.svelte-9d541552.js","chunks/vendor-52401ce2.js"],"styles":[]},"src/routes/test-blog-md/index.md":{"entry":"pages/test-blog-md/index.md-56539985.js","css":[],"js":["pages/test-blog-md/index.md-56539985.js","chunks/vendor-52401ce2.js"],"styles":[]},"src/routes/[slug].svelte":{"entry":"pages/[slug].svelte-08a7f087.js","css":[],"js":["pages/[slug].svelte-08a7f087.js","chunks/vendor-52401ce2.js"],"styles":[]}};

async function load_component(file) {
	const { entry, css, js, styles } = metadata_lookup[file];
	return {
		module: await module_lookup[file](),
		entry: assets + "/_app/" + entry,
		css: css.map(dep => assets + "/_app/" + dep),
		js: js.map(dep => assets + "/_app/" + dep),
		styles
	};
}

export function render(request, {
	prerender
} = {}) {
	const host = request.headers["host"];
	return respond({ ...request, host }, options, { prerender });
}