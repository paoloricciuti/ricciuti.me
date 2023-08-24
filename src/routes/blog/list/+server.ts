import { get_articles } from '$lib/articles/utils';
import { json } from '@sveltejs/kit';

export const prerender = true;

export async function GET() {
	const articles = get_articles();
	return json(articles);
}
