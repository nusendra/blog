export const load = async ({ url }) => {
	const blog = await fetch(`${url.origin}/api/posts`);
	const workLog = await fetch(`${url.origin}/api/work-log`);

	const blogPosts = await blog.json();
	const workLogPosts = await workLog.json();

	return {
		posts: [...workLogPosts, ...blogPosts].slice(0, 5),
	};
};
