export const load = async ({ fetch, url }) => {
	const response = await fetch(`${url.origin}/api/posts`);
	const posts = await response.json();

	return {
		posts,
	};
};
