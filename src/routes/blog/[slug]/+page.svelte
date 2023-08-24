<script lang="ts">
	export let data;
</script>

<svelte:head>
	<title>ricciuti.me - {data.article.metadata.title}</title>
</svelte:head>
<article class="m-auto max-w-[75ch]">
	<h1>{data.article.metadata.title}</h1>
	<hr class="my-2" />
	<svelte:component this={data.article.component} />
</article>

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
