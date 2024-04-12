import { sortPosts } from "$lib/utils";
import LL, { setLocale } from '$lib/i18n/i18n-svelte'
import { get } from 'svelte/store'

export const load = async ({ parent, url }) => {
	// posts
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

	// translations
	const { locale } = await parent()

	setLocale(locale)

	const $LL= get(LL)

	return {
		title: $LL.heroTitle(),
		subTitle: $LL.subHeroTitle(),
		watchButton: $LL.watchButton(),
		whatCourseButton: $LL.whatCourseButton(),
		posts: sortPosts([...workLogPosts, ...blogPosts]).slice(0, 5),
	}
}
