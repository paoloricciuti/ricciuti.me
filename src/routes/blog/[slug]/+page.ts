import { calculate_similarity, get_articles } from '$lib/articles/utils.js';
import { article_schema, type Article } from '$lib/schemas/index.js';
import * as v from 'valibot';

export async function entries() {
	const articles = await get_articles();
	return articles.map((article) => ({ slug: article.slug }));
}

export async function load({ params: { slug } }) {
	const imported = await import(`$lib/articles/${slug}/index.svx`);
	const suggestions_slugs = (await calculate_similarity(slug)).slice(0, 3);
	const suggestions: { slug: string; article: Article['metadata'] }[] = [];
	for (const { slug } of suggestions_slugs) {
		const suggestion = await import(`$lib/articles/${slug}/index.svx`);
		const validated_suggestion = v.parse(article_schema, suggestion);
		suggestions.push({ slug, article: validated_suggestion.metadata });
	}
	const validated = v.parse(article_schema, imported);
	return { article: validated, suggestions };
}
