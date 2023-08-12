<script lang="ts">
	let className = '';
	export let orientation: 'horizontal' | 'vertical' = 'horizontal';
	export { className as class };

	$: classes = orientation === 'horizontal' ? 'h-0.5' : 'w-0.5';
</script>

<div class="absolute inset-0 bg-divider {className} {classes}"></div>
