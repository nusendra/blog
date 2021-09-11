const c = [
	() => import("../../../src/routes/__layout.svelte"),
	() => import("../components/error.svelte"),
	() => import("../../../src/routes/index.svelte"),
	() => import("../../../src/routes/blog/2018-01-15-berkenalan-dengan-vuejs.md"),
	() => import("../../../src/routes/blog/test-blog.md")
];

const d = decodeURIComponent;

export const routes = [
	// src/routes/index.svelte
	[/^\/$/, [c[0], c[2]], [c[1]]],

	// src/routes/blog/2018-01-15-berkenalan-dengan-vuejs.md
	[/^\/blog\/2018-01-15-berkenalan-dengan-vuejs\/?$/, [c[0], c[3]], [c[1]]],

	// src/routes/blog/test-blog.md
	[/^\/blog\/test-blog\/?$/, [c[0], c[4]], [c[1]]],

	// src/routes/[slug].json.js
	[/^\/([^/]+?)\.json$/]
];

// we import the root layout/error components eagerly, so that
// connectivity errors after initialisation don't nuke the app
export const fallback = [c[0](), c[1]()];