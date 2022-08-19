export const sortPosts = (posts) => {
	return posts.sort((a, b) => {
		const dateA = new Date(a.date);
		const dateB = new Date(b.date);

		if (dateA > dateB) return -1;
		if (dateA < dateB) return 1;
		return 0;
	});
};
