export async function load({ fetch }) {
	const url = `/work-log.json`;
	const res = await fetch(url);
	const posts = await res.json();
	return {
		posts: posts,
	};
}
