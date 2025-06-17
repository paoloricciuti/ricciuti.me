<svelte:options preserveWhitespace />

<script lang="ts">
	import '../app.css';
	import '../tokens.css';
	import '../shiki.css';
	import Logo from '$lib/components/Logo.svelte';
	import { page } from '$app/state';
	import ThemeSwitcher from '$lib/components/ThemeSwitcher.svelte';
	import Socials from '$lib/components/Socials.svelte';

	let { children } = $props();

	const pages = {
		home: '/',
		blog: '/blog',
		about: '/about',
		speaking: '/speaking',
		contacts: '/contacts',
	};

	const socials = {
		github: 'https://github.com/paoloricciuti',
		bsky: 'https://bsky.app/profile/ricciuti.me',
	};

	function get_og() {
		if (page.url.pathname.match(/\/blog\/.+/)) {
			return page.url.pathname;
		}
		if (page.url.pathname === '/' || page.url.pathname === '') {
			return '/home/home';
		}
		return `${page.url.pathname}${page.url.pathname}`;
	}
</script>

<svelte:head>
	<title>ricciuti.me</title>
	<meta name="description" content="Tech blog and personal website of a mad scientist" />
	<meta property="og:title" content="ricciuti.me" />
	<meta property="og:description" content="Tech blog and personal website of a mad scientist" />
	<meta property="og:image" content="https://ricciuti.me/og{get_og()}" />
	<meta property="og:type" content="website" />
	<meta content="summary_large_image" name="twitter:card" />
	<meta property="og:url" content="https://ricciuti.me/" />
</svelte:head>

<header
	class="sticky top-0 z-50 m-auto grid w-full max-w-7xl place-items-center gap-2 bg-[var(--bg)] p-4 font-mono"
>
	<ThemeSwitcher />
	<h1 class="text-4xl">ricciuti.me</h1>
	<p class="text-center text-xs opacity-50">tech blog and personal website of a mad scientist</p>
	<ul class="mt-4 flex flex-wrap justify-center gap-2">
		{#each Object.entries(pages) as [title, href]}
			{@const current_page = page.url.pathname === href}
			<li>
				<a {href} class:text-brand-600={current_page} class:dark:text-brand-500={current_page}
					>{title}</a
				>
			</li>
		{/each}
	</ul>
	<ul class="socials flex flex-wrap justify-center gap-2">
		{#each Object.entries(socials) as [social, href]}
			<li>
				<a {href}><Socials {social} /></a>
			</li>
		{/each}
	</ul>
</header>
<main class="relative m-auto grid max-w-7xl place-items-center">
	<picture class="max-w-xs p-4 lg:col-span-1">
		<Logo width="100%" />
	</picture>

	<section class="md:prose-md prose dark:prose-invert max-w-full min-w-full p-4 font-mono">
		{@render children?.()}
	</section>
</main>

<style lang="postcss">
	@reference "../app.css";
	@media (min-width: theme(--breakpoint-sm)) {
		:not(.socials) > li:not(:last-child)::after {
			content: '|';
		}
	}
</style>
