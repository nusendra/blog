const c = [
	() => import("../../../src/routes/__layout.svelte"),
	() => import("../components/error.svelte"),
	() => import("../../../src/routes/index.svelte"),
	() => import("../../../src/routes/blog/2018-01-16-berkenalan-dengan-vuejs.md")
];

const d = decodeURIComponent;

export const routes = [
	// src/routes/index.svelte
	[/^\/$/, [c[0], c[2]], [c[1]]],

	// src/routes/posts.json.js
	[/^\/posts\.json$/],

	// src/routes/blog/2018-01-16-berkenalan-dengan-vuejs.md
	[/^\/blog\/2018-01-16-berkenalan-dengan-vuejs\/?$/, [c[0], c[3]], [c[1]]],

	// src/routes/[slug].json.js
	[/^\/([^/]+?)\.json$/]
];

// we import the root layout/error components eagerly, so that
// connectivity errors after initialisation don't nuke the app
export const fallback = [c[0](), c[1]()];