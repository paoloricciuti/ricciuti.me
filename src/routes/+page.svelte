<script lang="ts">
	export let data;
</script>

<h1>home</h1>
<p>
	hello, fellow internet surfer, here lies the personal website and tech blog of paolo ricciuti,
	sometimes known as pablopang.
</p>
{#each data.articles as article}
	<article>
		<a href="/blog/{article.slug}">{article.title}</a>
	</article>
{/each}
