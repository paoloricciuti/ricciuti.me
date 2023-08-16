import { get_articles } from '$lib/articles/get-articles.js';
import { article_schema } from '$lib/schemas/index.js';

export function entries() {
	const articles = get_articles();
	return articles.map((article) => ({ slug: article.slug }));
}

export async function load({ params: { slug } }) {
	const imported = await import(`$lib/articles/${slug}/index.svx`);
	const validated = article_schema.parse(imported);
	return validated;
}
