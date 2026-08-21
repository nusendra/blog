import { error } from "@sveltejs/kit";

const allPostFiles = import.meta.glob("/src/routes/post/*/*.md");

export const load = async ({ url }) => {
	const slug = url.pathname.replace(/^\/post\//, "").replace(/\/$/, "");
	const resolver = allPostFiles[`/src/routes/post/${slug}/+page.md`];

	if (resolver) {
		const { metadata } = await resolver();
		if (metadata?.draft) error(404, "Not found");
	}

	return {};
};
