<script lang="ts">
	import type { Snippet } from 'svelte';
	import Info from 'lucide-svelte/icons/info';
	import TriangleAlert from 'lucide-svelte/icons/triangle-alert';
	import Lightbulb from 'lucide-svelte/icons/lightbulb';
	import CircleX from 'lucide-svelte/icons/circle-x';

	let {
		type = 'info',
		title,
		children,
	}: {
		type?: 'info' | 'warning' | 'tip' | 'danger';
		title?: string;
		children: Snippet;
	} = $props();

	const config = {
		info: {
			icon: Info,
			border: 'border-blue-500',
			bg: 'bg-blue-50 dark:bg-blue-950',
			text: 'text-blue-600 dark:text-blue-400',
		},
		warning: {
			icon: TriangleAlert,
			border: 'border-amber-500',
			bg: 'bg-amber-50 dark:bg-amber-950',
			text: 'text-amber-600 dark:text-amber-400',
		},
		tip: {
			icon: Lightbulb,
			border: 'border-green-500',
			bg: 'bg-green-50 dark:bg-green-950',
			text: 'text-green-600 dark:text-green-400',
		},
		danger: {
			icon: CircleX,
			border: 'border-brand-500',
			bg: 'bg-red-50 dark:bg-red-950',
			text: 'text-brand-500 dark:text-brand-400',
		},
	} as const;

	let variant = $derived(config[type]);
	let Icon = $derived(variant.icon);
</script>

<aside class="not-prose my-4 rounded-sm border-l-4 {variant.border} {variant.bg} p-4 font-mono">
	<div class="mb-2 flex items-center gap-2 {variant.text}">
		<Icon size={18} />
		{#if title}
			<span class="text-sm font-semibold">{title}</span>
		{/if}
	</div>
	<div class="text-sm text-(--color)">
		{@render children()}
	</div>
</aside>
