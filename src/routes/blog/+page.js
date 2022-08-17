export async function load({ page, fetch }) {
	const url = `/posts.json`;
	const res = await fetch(url);
	const posts = await res.json();

	return {
		posts: posts,
	};
}
