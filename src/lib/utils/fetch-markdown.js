export const fetchMarkdown = async (allPostFiles) => {
	const iterablePostFiles = Object.entries(allPostFiles);

	const allPosts = await Promise.all(
		iterablePostFiles.map(async ([path, resolver]) => {
			const { metadata } = await resolver();
			const { title, date, slug, description, tags, is_featured, draft } = metadata;

			return {
				title,
				date,
				slug,
				description,
				tags,
				is_featured,
				draft,
			};
		})
	);

	return allPosts.filter((post) => !post.draft);
};
