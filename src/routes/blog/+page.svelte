<script lang="ts">
	const { data } = $props();
</script>

{#each data.articles as article}
	<article class="my-12 grid gap-2">
		<a class="text-5xl font-bold no-underline" href="/blog/{article.slug}">{article.title}</a>
		<section class="border-t-[1px] border-slate-500 p-4 pr-0">
			<!-- eslint-disable-next-line svelte/no-at-html-tags -->
			{@html article.preview}
		</section>
		<a class="bg-brand-500 justify-self-start p-2 px-4 no-underline" href="/blog/{article.slug}"
			>full article</a
		>
	</article>
{/each}
