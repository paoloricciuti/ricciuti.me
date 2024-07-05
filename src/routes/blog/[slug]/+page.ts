import { get_articles, calculate_similarity } from '$lib/articles/utils.js';
import { article_schema, type Article } from '$lib/schemas/index.js';

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
		const validated_suggestion = article_schema.parse(suggestion);
		suggestions.push({ slug, article: validated_suggestion.metadata });
	}
	const validated = article_schema.parse(imported);
	return { article: validated, suggestions };
}
