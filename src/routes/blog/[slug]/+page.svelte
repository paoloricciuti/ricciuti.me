<script lang="ts">
	import { date_formatter } from '$lib/utils';

	let { data } = $props();
	const published = $derived(new Date(data.article.metadata.published));
</script>

<svelte:head>
	<title>ricciuti.me - {data.article.metadata.title}</title>
</svelte:head>
<article class="m-auto mb-16 max-w-[75ch]">
	<h1>{data.article.metadata.title}</h1>
	<span class="text-xs"
		>Published <time datetime={published.toISOString()}>{date_formatter.format(published)}</time
		></span
	>
	<hr class="my-2" />
	<data.article.component />
</article>

{#if data.suggestions.length > 0}
	If you liked this article you might also like those others
	<ul>
		{#each data.suggestions as suggestion}
			<li>
				<a href="/blog/{suggestion.slug}"><strong>{suggestion.article.title}</strong></a>
				<!-- eslint-disable-next-line svelte/no-at-html-tags -->
				<p>{@html suggestion.article.preview_html}</p>
			</li>
		{/each}
	</ul>
{/if}
