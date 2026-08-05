import { get_articles } from '#lib/articles/utils.ts';
import { prerender } from '$app/server';
import { rkeyFromUrl } from '@mastrojs/atproto';
import * as v from 'valibot';

export const get_at_url = prerender(
	v.string(),
	async (slug) => {
		return `at://did:plc:ezyrzvz3yoglekd4j2szmiys/site.standard.document/${rkeyFromUrl(
			new URL(slug, 'https://ricciuti.me/blog/'),
		)}`;
	},
	{
		async inputs() {
			const articles = await get_articles();
			return articles.map((article) => article.slug);
		},
	},
);
