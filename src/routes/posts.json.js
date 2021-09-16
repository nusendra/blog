import fs from "fs";
import path from "path";
import grayMatter from "gray-matter";

export async function get() {
	const cwd = process.cwd();
	const POSTS_DIR = path.join(cwd, "src/routes/blog");

	const posts = fs.readdirSync(POSTS_DIR).map((fileName) => {
		const fileMd = fs.readFileSync(path.join(POSTS_DIR, fileName), "utf8");
		const { data, content: rawContent } = grayMatter(fileMd);
		const { title, date, slug, description } = data;
		let content = rawContent;
		let excerpt = "";

		return {
			title: title || slug,
			slug,
			date,
			excerpt,
			description,
		};
	});

	return { body: JSON.stringify(posts) };
}
