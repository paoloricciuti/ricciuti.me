<script lang="ts">
	import sprite from '../assets/socials-sprite.svg';

	const { social }: { social: string } = $props();
</script>

<span>
	<svg>
		<use href="{sprite}#{social}" />
	</svg>
</span>

<style>
	svg {
		width: 24px;
		height: 24px;
	}
</style>
