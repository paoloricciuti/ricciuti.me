<script lang="ts">
	const { data } = $props();
</script>

<svelte:head>
	<title>ricciuti.me</title>
</svelte:head>
<h1>home</h1>
<p>
	hello, fellow internet surfer, here lies the personal website and tech blog of paolo ricciuti,
	sometimes known as pablopang.
</p>
<p>I speak about a lot of things in this blog but mainly about svelte 🧡</p>
<p>here some of my latest blog posts for your reading pleasure</p>
{#each data.articles as article}
	<article class="my-12 grid gap-2">
		<a class="text-5xl font-bold no-underline" href="/blog/{article.slug}">{article.title}</a>
		<section class="border-t-[1px] border-slate-500 p-4 pr-0">
			<!-- eslint-disable-next-line svelte/no-at-html-tags -->
			{@html article.preview}
		</section>
		<a class="justify-self-start bg-brand-500 p-2 px-4 no-underline" href="/blog/{article.slug}"
			>full article</a
		>
	</article>
{/each}
