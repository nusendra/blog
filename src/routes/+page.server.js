import { sortPosts } from "$lib/utils";
import events from "../data/events.json";
import { isBefore, isAfter } from "date-fns";

export const load = async ({ fetch, url }) => {
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

	const today = new Date();
	let status = 'Current';
	if (isBefore(today, new Date(events[0].start_date))) {
		status = 'Incoming';
	} else if (isAfter(today, new Date(events[0].end_date))) {
		status = 'Past'
	}

	let event = {
		status,
		...events[0]
	}

	return {
		posts: sortPosts([...workLogPosts, ...blogPosts]).slice(0, 8),
		event
	};
};
