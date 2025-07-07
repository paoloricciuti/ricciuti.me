import type { ComponentType } from 'svelte';
import * as v from 'valibot';

function is_svelte_component(obj: unknown): obj is ComponentType {
	return true;
}

export const metadata_schema = v.object({
	title: v.pipe(v.string(), v.toLowerCase(), v.minLength(2)),
	published: v.pipe(v.string(), v.isoTimestamp()),
	preview: v.string(),
	preview_html: v.string(),
});

export const article_list_schema = v.array(
	v.intersect([
		metadata_schema,
		v.object({
			slug: v.string(),
		}),
	]),
);

const article_schema_input = v.object({
	default: v.pipe(v.any(), v.custom(is_svelte_component)),
	metadata: metadata_schema,
});

export const article_schema = v.pipe(
	article_schema_input,
	v.transform((article) => {
		return {
			component: article.default,
			metadata: article.metadata,
		};
	}),
);

export type Article = v.InferOutput<typeof article_schema>;
export type ArticleInput = v.InferInput<typeof article_schema_input>;
