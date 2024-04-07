/**
 * @param { URL } url
 * @param { string } locale
 * @param { boolean } full
 * @returns string
 */
export const replaceLocaleInUrl = (url, locale, full = false) => {
	const [, , ...rest] = url.pathname.split('/')
	const new_pathname = `/${[locale, ...rest].join('/')}`
	if (!full) {
		return `${new_pathname}${url.search}`
	}
	const newUrl = new URL(url.toString())
	newUrl.pathname = new_pathname
	return newUrl.toString()
}
