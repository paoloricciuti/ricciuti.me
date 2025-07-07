import { cosinesim } from '$lib/math';
import { article_schema } from '$lib/schemas';
import * as v from 'valibot';

export async function get_articles() {
	const articles_import = import.meta.glob('$lib/articles/**/index.svx');
	const articles = [];
	for (const article_location in articles_import) {
		const { slug } =
			article_location.match(/\/src\/lib\/articles\/(?<slug>.*)\/index.svx/)?.groups ?? {};
		const { metadata } = v.parse(article_schema, await articles_import[article_location]());
		articles.push({
			slug,
			...metadata,
		});
	}
	articles.sort((article_a, article_b) => {
		const article_a_data = new Date(article_a.published);
		const article_b_data = new Date(article_b.published);
		return article_b_data.getTime() - article_a_data.getTime();
	});
	return articles;
}

export async function calculate_similarity(slug: string) {
	const embeddings_import = import.meta.glob('$lib/articles/**/embedding.json');
	const embedding_map = new Map<string, number[]>();
	for (const [path, embedding_promise] of Object.entries(embeddings_import)) {
		const embedding = await embedding_promise();
		if (
			embedding &&
			typeof embedding === 'object' &&
			'data' in embedding &&
			embedding.data &&
			typeof embedding.data === 'object' &&
			Array.isArray(embedding.data) &&
			embedding.data[0] &&
			'embedding' in embedding.data[0] &&
			embedding.data[0].embedding &&
			Array.isArray(embedding.data[0].embedding)
		) {
			const { other_slug } =
				path.match(/\/src\/lib\/articles\/(?<other_slug>.*)\/embedding.json/)?.groups ?? {};
			embedding_map.set(other_slug, embedding.data[0].embedding);
		}
	}
	const results: { slug: string; score: number }[] = [];
	const current_embedding = embedding_map.get(slug);
	if (!current_embedding) return [];
	for (const [current_slug, embedding] of embedding_map.entries()) {
		if (slug !== current_slug) {
			results.push({ score: cosinesim(current_embedding, embedding), slug: current_slug });
		}
	}
	return results.sort((embedding_a, embedding_b) => embedding_a.score - embedding_b.score);
}
