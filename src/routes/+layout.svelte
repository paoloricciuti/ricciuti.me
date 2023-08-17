<script lang="ts">
	import '../app.css';
	import Logo from '$lib/components/Logo.svelte';
</script>

<main class="relative grid h-full grid-cols-main grid-rows-main overflow-y-auto">
	<header class="sticky top-0 col-start-1 col-end-[-1] bg-current p-2 font-mono lg:col-end-[-2]">
		<h1 class="text-2xl">ricciuti.me</h1>
		<p class="text-xs">tech blog and personal website of a mad scientist</p>
		<ul class="mt-4 flex flex-wrap gap-2">
			<li><a href="/">home</a></li>
			<li><a href="/about">about</a></li>
			<li><a href="/speaking">speaking</a></li>
			<li><a href="/contacts">contacts</a></li>
		</ul>
	</header>
	<picture class="col-span-full max-w-xs p-4 lg:col-span-1">
		<Logo width="100%" />
	</picture>

	<section class="md:prose-md prose min-w-full p-4 font-mono dark:prose-invert">
		<slot />
	</section>
	<section class="hidden lg:block">suggestions</section>
</main>

<style>
	li:not(:last-child)::after {
		content: '|';
		margin: theme(spacing.2);
	}
</style>
