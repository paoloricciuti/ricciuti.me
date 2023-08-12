<script lang="ts">
	import '../app.css';
	import Logo from '$lib/components/Logo.svelte';
	import Divider from '$lib/components/Divider.svelte';
</script>

<main class="relative grid h-full grid-cols-main grid-rows-main bg-zinc-800 text-white">
	<Logo width="300" class="m-4" />
	<header class="relative z-10 col-start-2 col-end-[-1] bg-inherit p-2 text-right">
		My header
	</header>
	<Divider orientation="horizontal" class="col-span-full row-start-2" />

	<aside class="relative">aside</aside>
	<Divider orientation="vertical" class="z-20 col-start-2 row-span-full" />

	<section class="p-4">
		<slot />
	</section>
	<Divider orientation="vertical" class="col-start-3 row-span-full" />
	<section>suggestions</section>
</main>
