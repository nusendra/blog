import fs from "fs";
import path from "path";
import grayMatter from "gray-matter";
import { format, formatDistance } from "date-fns";

export async function get() {
	const POSTS_DIR = "src/routes/post";

	const posts = fs.readdirSync(POSTS_DIR).map((fileName) => {
		const fileMd = fs.readFileSync(path.join(POSTS_DIR, fileName), "utf8");
		const { data, content: rawContent } = grayMatter(fileMd);
		const { title, date, slug, description, tags } = data;
		let content = rawContent;
		let excerpt = "";
		const printDate = format(new Date(date), "yyyy-MM-dd");
		const distance = formatDistance(new Date(date), new Date());

		return {
			title: title || slug,
			slug,
			date: printDate,
			formatDistance: distance,
			excerpt,
			description,
			tags,
		};
	});

	const sortedPosts = () => {
		return posts.sort((a, b) => {
			const dateA = new Date(a.date);
			const dateB = new Date(b.date);

			if (dateA > dateB) return -1;
			if (dateA < dateB) return 1;
			return 0;
		});
	};

	return { body: JSON.stringify(sortedPosts()) };
}
