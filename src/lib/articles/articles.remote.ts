import { getRequestEvent, prerender } from '$app/server';
import * as v from 'valibot';
import { article_list_schema, article_schema, type Article } from '../schemas';
import { calculate_similarity } from './utils';
import { get_articles as list_articles } from './utils.js';

export const get_articles = prerender(async () => {
	const { fetch } = getRequestEvent();
	const articles_request = await fetch('/blog/list').then((res) => res.json());
	const articles = v.parse(article_list_schema, articles_request);
	return articles;
});

export const get_suggestions = prerender(
	v.string(),
	async (slug) => {
		const suggestions_slugs = (await calculate_similarity(slug)).slice(0, 3);
		const suggestions: { slug: string; article: Article['metadata'] }[] = [];
		for (const { slug } of suggestions_slugs) {
			const suggestion = await import(`./${slug}/index.svx`);
			const validated_suggestion = v.parse(article_schema, suggestion);
			suggestions.push({ slug, article: validated_suggestion.metadata });
		}
		return suggestions;
	},
	{
		async inputs() {
			const articles = await list_articles();
			return articles.map((article) => article.slug);
		},
	},
);
