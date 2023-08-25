import { article_list_schema } from '$lib/schemas/index.js';

export async function load({ fetch }) {
	const articles_request = await fetch('/blog/list').then((res) => res.json());
	const articles = article_list_schema.parse(articles_request);
	return {
		articles,
	};
}
