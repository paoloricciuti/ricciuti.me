<script lang="ts">
	import { Moon, Sun } from 'lucide-svelte';
	import { onMount } from 'svelte';
	import { fade, crossfade } from 'svelte/transition';

	const [send, receive] = crossfade({
		duration: 250,
	});

	let theme: 'light' | 'dark' | undefined;

	function swap() {
		document.documentElement.classList.remove(theme ?? '');
		theme = theme === 'dark' ? 'light' : 'dark';
		window.localStorage.setItem('ricciuti_me_theme', theme);
		document.documentElement.classList.add(theme);
	}

	onMount(() => {
		const current_theme = window.localStorage.getItem('ricciuti_me_theme');
		if (!current_theme) {
			const media = window.matchMedia('(prefers-color-scheme: dark)');
			if (media.matches) {
				theme = 'dark';
			} else {
				theme = 'light';
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
			duration: 100,
		}}
		on:click={async (e) => {
			const prefers_reduced_motion = window.matchMedia('(prefers-reduced-motion: reduce)');
			if (!document.startViewTransition || prefers_reduced_motion.matches) {
				swap();
				return;
			}

			const { x, y, width, height } = e.currentTarget.getBoundingClientRect();
			const start_x = x + width / 2;
			const start_y = y + height / 2;

			const end_radius = Math.hypot(
				Math.max(start_x, innerWidth - start_x),
				Math.max(start_y, innerHeight - start_y),
			);

			document.documentElement.classList.add('swapping_theme');
			const transition = document.startViewTransition(() => {
				swap();
			});

			// Wait for the pseudo-elements to be created:
			transition.ready.then(async () => {
				// Animate the root's new view
				document.documentElement.animate(
					{
						clipPath: [
							`circle(0 at ${start_x}px ${start_y}px)`,
							`circle(${end_radius}px at ${start_x}px ${start_y}px)`,
						],
					},
					{
						duration: 500,
						easing: 'ease-in',
						// Specify which pseudo-element to animate
						pseudoElement: '::view-transition-new(root)',
					},
				);
			});
			await transition.finished;
			document.documentElement.classList.remove('swapping_theme');
		}}
		class="relative z-50 h-8 w-8 justify-self-end 2xs:fixed 2xs:right-4 2xs:top-4"
	>
		{#if theme === 'light'}
			<span
				class="absolute inset-0 grid place-items-center"
				in:send={{
					key: 'theme',
				}}
				out:receive={{
					key: 'theme',
				}}
			>
				<Moon />
			</span>
		{:else}
			<span
				class="absolute inset-0 grid place-items-center"
				in:send={{
					key: 'theme',
				}}
				out:receive={{
					key: 'theme',
				}}
			>
				<Sun />
			</span>
		{/if}
	</button>
{/if}

<style>
	:global(.swapping_theme::view-transition-old(root)),
	:global(.swapping_theme::view-transition-new(root)) {
		animation: none;
	}
</style>
