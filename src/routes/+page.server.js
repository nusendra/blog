import { sortPosts } from "$lib/utils";

export const load = async ({ url }) => {
	const blog = await fetch(`${url.origin}/api/posts`);
	const workLog = await fetch(`${url.origin}/api/work-log`);

	let blogPosts = await blog.json();
	let workLogPosts = await workLog.json();

	blogPosts = blogPosts.map((item) => {
		item.slug = `/post/${item.slug}`;
		return item;
	});
	workLogPosts = workLogPosts.map((item) => {
		item.slug = `/work-log/${item.slug}`;
		return item;
	});

	return {
		posts: sortPosts([...workLogPosts, ...blogPosts]).slice(0, 5),
	};
};
