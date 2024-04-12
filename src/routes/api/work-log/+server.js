import { fetchMarkdown, responseOptions, sortPosts } from "$lib/utils";

export const GET = async () => {
	const allPostFiles = import.meta.glob("/src/routes/[lang=lang]/work-log/*/*.md");
	const posts = await fetchMarkdown(allPostFiles);

	return new Response(JSON.stringify(sortPosts(posts)), responseOptions);
};
