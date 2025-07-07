import { article_list_schema } from '$lib/schemas/index.js';
import * as v from 'valibot';

export const prerender = true;

export async function load({ fetch }) {
	const articles_request = await fetch('/blog/list').then((res) => res.json());
	const articles = v.parse(article_list_schema, articles_request);
	return {
		articles,
	};
}
