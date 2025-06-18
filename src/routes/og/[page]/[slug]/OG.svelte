<svelte:options css="injected" />

<script lang="ts">
	let { title, kind }: { title: string; kind: string } = $props();
</script>

<div class="container">
	<div class="header">
		<div class="brand-section">
			<div class="brand-info">
				<div class="brand-title">ricciuti.me</div>
				<div class="brand-subtitle">tech blog & personal website</div>
			</div>
		</div>

		<div class="traffic-lights">
			<div class="light red"></div>
			<div class="light orange"></div>
			<div class="light yellow"></div>
		</div>
	</div>

	<div class="content">
		<div class="title">
			{title}
		</div>
	</div>

	<div class="footer">
		<div>mad scientist at work</div>
		<div class="kind-section">
			<div class="gradient-bar"></div>
			<span>{kind}</span>
		</div>
	</div>
</div>

<style>
	div {
		display: flex;
	}
	.container {
		flex-direction: column;
		justify-content: space-between;
		height: 100%;
		/* prettier-ignore */
		background-image: linear-gradient(135deg, oklch(27.4% 0.006 286.033) 0%, #3d1612 50%, oklch(27.4% 0.006 286.033) 100%);
		color: #f4f4f5;
		padding: 48px;
		position: relative;
	}

	.header {
		align-items: center;
		justify-content: space-between;
	}

	.brand-section {
		align-items: center;
	}

	.brand-info {
		flex-direction: column;
	}

	.brand-title {
		font-size: 32px;
		font-weight: bold;
		letter-spacing: -0.025em;
	}

	.brand-subtitle {
		font-size: 16px;
		color: #a1a1aa;
		margin-top: 4px;
	}

	.light {
		width: 8px;
		height: 8px;
		border-radius: 50%;
		margin-right: 4px;
	}

	.light:last-child {
		margin-right: 0;
	}

	.red {
		background: #ef4444;
	}

	.orange {
		background: #f97316;
	}

	.yellow {
		background: #eab308;
	}

	.content {
		align-items: center;
		justify-content: center;
		flex: 1;
		padding: 32px;
	}

	.title {
		font-size: 72px;
		font-weight: bold;
		text-align: center;
		line-height: 1.1;
		letter-spacing: -0.025em;
		background: linear-gradient(90deg, #ffffff 0%, #f4f4f5 50%, #d4d4d8 100%);
		background-clip: text;
		-webkit-background-clip: text;
		color: transparent;
	}

	.footer {
		align-items: center;
		justify-content: space-between;
		font-size: 14px;
		color: #71717a;
	}

	.kind-section {
		align-items: center;
	}

	.gradient-bar {
		width: 32px;
		height: 4px;
		background: linear-gradient(90deg, #ef4444 0%, #f97316 100%);
		border-radius: 2px;
		margin-right: 8px;
	}
</style>
