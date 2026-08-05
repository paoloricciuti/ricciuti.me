import { get_articles } from '#lib/articles/utils.js';

export const prerender = true;

export async function GET() {
	const articles = await get_articles();
	return Response.json(articles);
}
