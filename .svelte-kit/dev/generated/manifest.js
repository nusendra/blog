const c = [
	() => import("../../../src/routes/__layout.svelte"),
	() => import("../components/error.svelte"),
	() => import("../../../src/routes/index.svelte"),
	() => import("../../../src/routes/post/struktur-folder-laravel-55.md"),
	() => import("../../../src/routes/post/berkenalan-dengan-vuejs.md")
];

const d = decodeURIComponent;

export const routes = [
	// src/routes/index.svelte
	[/^\/$/, [c[0], c[2]], [c[1]]],

	// src/routes/posts.json.js
	[/^\/posts\.json$/],

	// src/routes/post/struktur-folder-laravel-55.md
	[/^\/post\/struktur-folder-laravel-55\/?$/, [c[0], c[3]], [c[1]]],

	// src/routes/post/berkenalan-dengan-vuejs.md
	[/^\/post\/berkenalan-dengan-vuejs\/?$/, [c[0], c[4]], [c[1]]]
];

// we import the root layout/error components eagerly, so that
// connectivity errors after initialisation don't nuke the app
export const fallback = [c[0](), c[1]()];