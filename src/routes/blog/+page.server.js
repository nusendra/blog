export const load = async ({ fetch, url }) => {
	const response = await fetch(`${url.origin}/api/posts`);
	const posts = await response.json();

	const featuredPosts = posts.filter((p) => p.is_featured).slice(0, 5);

	return {
		posts,
		featuredPosts,
	};
};
