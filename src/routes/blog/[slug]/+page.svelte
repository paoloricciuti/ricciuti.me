<script lang="ts">
	export let data;
</script>

<h1>{data.metadata.title}</h1>
<hr class="my-2" />
<svelte:component this={data.component} />
