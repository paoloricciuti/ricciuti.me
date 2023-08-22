<script lang="ts">
	import '../app.css';
	import '../tokens.css';
	import '../shiki.css';
	import Logo from '$lib/components/Logo.svelte';
	import { page } from '$app/stores';
	import ThemeSwitcher from '$lib/components/ThemeSwitcher.svelte';

	const pages = {
		home: '/',
		about: '/about',
		speaking: '/speaking',
		contacts: '/contacts',
		projects: '/projects'
	};
</script>

<header
	class="sticky top-0 z-50 m-auto grid w-full max-w-7xl place-items-center gap-2 bg-current p-4 font-mono"
>
	<ThemeSwitcher />
	<h1 class="text-4xl">ricciuti.me</h1>
	<p class="text-center text-xs opacity-50">tech blog and personal website of a mad scientist</p>
	<ul class="mt-4 flex flex-wrap justify-center gap-2">
		{#each Object.entries(pages) as [title, href]}
			{@const current_page = $page.url.pathname === href}
			<li>
				<a {href} class:text-brand-600={current_page} class:dark:text-brand-500={current_page}
					>{title}</a
				>
			</li>
		{/each}
	</ul>
</header>
<main class="relative m-auto grid max-w-7xl place-items-center">
	<picture class="max-w-xs p-4 lg:col-span-1">
		<Logo width="100%" />
	</picture>

	<section class="md:prose-md prose min-w-full p-4 font-mono dark:prose-invert">
		<slot />
	</section>
</main>

<style lang="postcss">
	@media (min-width: theme(screens.sm)) {
		li:not(:last-child)::after {
			content: '|';
		}
	}
</style>
