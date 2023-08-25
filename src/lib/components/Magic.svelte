<!-- Thanks to josh comeau for this beautiful post (https://www.joshwcomeau.com/react/animated-sparkles-in-react/) and the idea of this component -->
<span class="relative"
	><slot />
	{#each { length: 5 } as _, num}
		{@const step = 100 / 5}
		{@const x = Math.random() * step + num * step}
		{@const y = Math.random() * 100}
		{@const delay = Math.random() * 5000}
		{@const scale = 1 + Math.random() * 0.7}
		<svg
			class="sparkle pointer-events-none -z-10"
			style:--x={x}
			style:--y={y}
			style:--delay={delay}
			style:--scale={scale}
			width="16"
			height="16"
			viewBox="0 0 160 160"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
		>
			<path
				d="M80 0C80 0 84.2846 41.2925 101.496 58.504C118.707 75.7154 160 80 160 80C160 80 118.707 84.2846 101.496 101.496C84.2846 118.707 80 160 80 160C80 160 75.7154 118.707 58.504 101.496C41.2925 84.2846 0 80 0 80C0 80 41.2925 75.7154 58.504 58.504C75.7154 41.2925 80 0 80 0Z"
				fill="#FFC700"
			/>
		</svg>
	{/each}
</span>

<style>
	.sparkle {
		position: absolute;
		top: calc(var(--y) * 1% - 8px);
		left: calc(var(--x) * 1% - 8px);
		scale: 0;
	}
	@media (prefers-reduced-motion: no-preference) {
		.sparkle {
			animation:
				scale 5s calc(var(--delay) * 1ms) infinite,
				rotate 5s calc(var(--delay) * 1ms) infinite;
		}
	}
	@keyframes rotate {
		from {
			rotate: 0deg;
		}
		to {
			rotate: 360deg;
		}
	}
	@keyframes scale {
		from {
			scale: 0;
		}
		50% {
			scale: var(--scale);
		}
		to {
			scale: 0;
		}
	}
</style>
