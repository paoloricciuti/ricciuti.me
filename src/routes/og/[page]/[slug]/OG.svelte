<script lang="ts">
	let { title, kind }: { title: string; kind: string } = $props();
</script>

<div
	style="
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		height: 100%;
		background: linear-gradient(135deg, oklch(27.4% 0.006 286.033) 0%, #3d1612 50%, oklch(27.4% 0.006 286.033) 100%);
		color: #f4f4f5;
		padding: 48px;
		position: relative;
	"
>
	<div style="display: flex; align-items: center; justify-content: space-between;">
		<div style="display: flex; align-items: center;">
			<div style="display: flex; flex-direction: column;">
				<div style="display: flex; font-size: 32px; font-weight: bold; letter-spacing: -0.025em;">
					ricciuti.me
				</div>
				<div style="display: flex; font-size: 16px; color: #a1a1aa; margin-top: 4px;">
					tech blog & personal website
				</div>
			</div>
		</div>

		<div style="display: flex;">
			<div
				style="display: flex; width: 8px; height: 8px; background: #ef4444; border-radius: 50%; margin-right: 4px;"
			></div>
			<div
				style="display: flex; width: 8px; height: 8px; background: #f97316; border-radius: 50%; margin-right: 4px;"
			></div>
			<div
				style="display: flex; width: 8px; height: 8px; background: #eab308; border-radius: 50%;"
			></div>
		</div>
	</div>

	<div style="display: flex; align-items: center; justify-content: center; flex: 1; padding: 32px;">
		<div
			style="
				font-size: 72px;
				font-weight: bold;
				text-align: center;
				line-height: 1.1;
				letter-spacing: -0.025em;
				background: linear-gradient(90deg, #ffffff 0%, #f4f4f5 50%, #d4d4d8 100%);
				background-clip: text;
				-webkit-background-clip: text;
				color: transparent;
			"
		>
			{title}
		</div>
	</div>

	<div
		style="display: flex; align-items: center; justify-content: space-between; font-size: 14px; color: #71717a;"
	>
		<div>mad scientist at work</div>
		<div style="display: flex; align-items: center;">
			<div
				style="
					display: flex;
					width: 32px;
					height: 4px;
					background: linear-gradient(90deg, #ef4444 0%, #f97316 100%);
					border-radius: 2px;
					margin-right: 8px;
				"
			></div>
			<span>{kind}</span>
		</div>
	</div>
</div>
