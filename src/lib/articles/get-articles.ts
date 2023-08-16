import { article_schema } from '$lib/schemas';

export function get_articles() {
	const articles_import = import.meta.glob('$lib/articles/**/index.svx', {
		eager: true
	});
	const articles = [];
	for (const article_location in articles_import) {
		const { slug } =
			article_location.match(/\/src\/lib\/articles\/(?<slug>.*)\/index.svx/)?.groups ?? {};
		const { metadata } = article_schema.parse(articles_import[article_location]);
		articles.push({
			slug,
			...metadata
		});
	}
	return articles;
}
