export const load = async ({ url }) => {
	const response = await fetch(`${url.origin}/api/posts`);
	const posts = await response.json();

	return {
		posts: posts.slice(0, 5),
	};
};
