<script lang="ts">
	import { Moon, Sun } from 'lucide-svelte';
	import { onMount } from 'svelte';
	import { fade, crossfade } from 'svelte/transition';

	const [send, receive] = crossfade({
		duration: 250
	});

	let theme: 'light' | 'dark' | undefined;
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
		} else {
			theme = current_theme === 'dark' ? 'dark' : 'light';
		}
	});
</script>

{#if theme}
	<button
		in:fade={{
			duration: 100
		}}
		on:click={() => {
			document.documentElement.classList.remove(theme ?? '');
			theme = theme === 'dark' ? 'light' : 'dark';
			window.localStorage.setItem('ricciuti_me_theme', theme);
			document.documentElement.classList.add(theme);
		}}
		class="2xs:fixed 2xs:right-4 2xs:top-4 relative z-50 h-8 w-8 justify-self-end"
	>
		{#if theme === 'light'}
			<span
				class="absolute inset-0 grid place-items-center"
				in:send={{
					key: 'theme'
				}}
				out:receive={{
					key: 'theme'
				}}
			>
				<Moon />
			</span>
		{:else}
			<span
				class="absolute inset-0 grid place-items-center"
				in:send={{
					key: 'theme'
				}}
				out:receive={{
					key: 'theme'
				}}
			>
				<Sun />
			</span>
		{/if}
	</button>
{/if}
