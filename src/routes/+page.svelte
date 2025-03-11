<script lang="ts">
	import Blog from './blog/+page.svelte';

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

<Blog {data} />
