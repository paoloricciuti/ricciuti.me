import type { ComponentType } from 'svelte';
import { z } from 'zod';

function is_svelte_component(obj: unknown): obj is ComponentType {
	return true;
}

export const metadata_schema = z.object({
	title: z.string().min(2).toLowerCase(),
	published: z.string().datetime(),
	preview: z.string(),
	preview_html: z.string(),
});

export const article_list_schema = z.array(
	metadata_schema.merge(
		z.object({
			slug: z.string(),
		}),
	),
);

export const article_schema = z
	.object({
		default: z.any().refine(is_svelte_component),
		metadata: metadata_schema,
	})
	.transform((article) => {
		return {
			component: article.default,
			metadata: article.metadata,
		};
	});

export type Article = z.infer<typeof article_schema>;
