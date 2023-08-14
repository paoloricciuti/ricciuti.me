<script lang="ts">
	import '../app.css';
	import Logo from '$lib/components/Logo.svelte';
</script>

<main class="relative grid h-full grid-cols-main grid-rows-main overflow-y-auto">
	<header class="sticky top-0 col-start-1 col-end-[-1] bg-current p-2 font-mono sm:col-end-[-2]">
		<h1 class="text-2xl">ricciuti.me</h1>
		<p class="text-xs">tech blog and personal website of a mad scientist</p>
	</header>
	<picture class="col-span-full max-w-xs p-4 sm:col-span-1">
		<Logo width="100%" />
	</picture>
	<aside class="relative hidden sm:block">aside something much longer</aside>

	<section class="p-4">
		<slot />
	</section>
	<section class="hidden sm:block">suggestions</section>
</main>
