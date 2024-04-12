import { fetchMarkdown, responseOptions, sortPosts } from "$lib/utils";

export const GET = async () => {
	const allPostFiles = import.meta.glob("/src/routes/[lang=lang]/blog/*/*.md");
	const posts = await fetchMarkdown(allPostFiles);

	return new Response(JSON.stringify(sortPosts(posts)), responseOptions);
};
