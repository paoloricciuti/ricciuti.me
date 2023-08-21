<script lang="ts">
	export let data;
</script>

<svelte:head>
	<title>ricciuti.me - {data.metadata.title}</title>
</svelte:head>
<article class="m-auto max-w-[75ch]">
	<h1>{data.metadata.title}</h1>
	<hr class="my-2" />
	<svelte:component this={data.component} />
</article>
