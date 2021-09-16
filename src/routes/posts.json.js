import fs from "fs";
import path from "path";
import grayMatter from "gray-matter";
import formatDate from "date-fns/format";

export async function get() {
	const cwd = process.cwd();
	const POSTS_DIR = path.join(cwd, "src/routes/post");

	const posts = fs.readdirSync(POSTS_DIR).map((fileName) => {
		const fileMd = fs.readFileSync(path.join(POSTS_DIR, fileName), "utf8");
		const { data, content: rawContent } = grayMatter(fileMd);
		const { title, date, slug, description } = data;
		let content = rawContent;
		let excerpt = "";
		const printDate = formatDate(new Date(date), "yyyy-MM-dd");

		return {
			title: title || slug,
			slug,
			date: printDate,
			excerpt,
			description,
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
