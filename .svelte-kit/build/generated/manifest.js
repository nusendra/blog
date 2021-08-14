const c = [
	() => import("../components/layout.svelte"),
	() => import("../components/error.svelte"),
	() => import("../../../src/routes/index.svelte"),
	() => import("../../../src/routes/test-blog-md/index.md"),
	() => import("../../../src/routes/[slug].svelte")
];

const d = decodeURIComponent;

export const routes = [
	// src/routes/index.svelte
	[/^\/$/, [c[0], c[2]], [c[1]]],

	// src/routes/test-blog-md/index.md
	[/^\/test-blog-md\/?$/, [c[0], c[3]], [c[1]]],

	// src/routes/[slug].json.js
	[/^\/([^/]+?)\.json$/],

	// src/routes/[slug].svelte
	[/^\/([^/]+?)\/?$/, [c[0], c[4]], [c[1]], (m) => ({ slug: d(m[1])})]
];

// we import the root layout/error components eagerly, so that
// connectivity errors after initialisation don't nuke the app
export const fallback = [c[0](), c[1]()];