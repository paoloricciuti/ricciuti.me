<script lang="ts">
	import { get_suggestions } from '#lib/articles/articles.remote.js';
	import { get_at_url } from '#lib/at-proto/index.remote.js';
	import { date_formatter } from '#lib/utils.js';

	let { params } = $props();
	const [suggestions, at_url, article] = $derived(
		await Promise.all([
			get_suggestions(params.slug),
			get_at_url(params.slug),
			import(`../../../lib/articles/${params.slug}/index.svx`),
		]),
	);
	debugger;
	const published = $derived(new Date(article.metadata.published));
</script>

<svelte:head>
	<title>ricciuti.me - {article.metadata.title}</title>
	<link rel="site.standard.document" href={at_url} />
</svelte:head>
<article class="m-auto mb-16 max-w-[75ch]">
	<h1>{article.metadata.title}</h1>
	<span class="text-xs"
		>Published <time datetime={published.toISOString()}>{date_formatter.format(published)}</time
		></span
	>
	<hr class="my-2" />
	<article.default />
</article>

{#if suggestions.length > 0}
	If you liked this article you might also like those others
	<ul>
		{#each suggestions as suggestion}
			<li>
				<a href="/blog/{suggestion.slug}"><strong>{suggestion.article.title}</strong></a>
				<!-- eslint-disable-next-line svelte/no-at-html-tags -->
				{@html suggestion.article.preview_html}
			</li>
		{/each}
	</ul>
{/if}
