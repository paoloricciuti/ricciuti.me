<script lang="ts">
	import { Moon, Sun } from 'lucide-svelte';
	import { onMount } from 'svelte';

	let theme = 'light';
	onMount(() => {
		const current_theme = window.localStorage.getItem('ricciuti_me_theme');
		if (!current_theme) {
			const media = window.matchMedia('(prefers-color-scheme: dark)');
			if (media.matches) {
				theme = 'dark';
			}
			media.addEventListener('change', (media) => {
				if (!window.localStorage.getItem('ricciuti_me_theme')) return;
				theme = media.matches ? 'dark' : 'light';
			});
		}
	});
</script>

<button
	on:click={() => {
		document.documentElement.classList.remove(theme);
		theme = theme === 'dark' ? 'light' : 'dark';
		document.documentElement.classList.add(theme);
	}}
	class="fixed right-4 top-4 z-50 rounded-full bg-zinc-50 p-1 text-brand-600 shadow-[0_0_.25rem] shadow-brand-400 dark:bg-zinc-900"
>
	{#if theme === 'light'}
		<Sun />
	{:else}
		<Moon />
	{/if}
</button>
