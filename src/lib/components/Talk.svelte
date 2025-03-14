<script lang="ts">
	import { browser } from '$app/environment';

	let {
		title,
		description,
		events,
	}: {
		title: string;
		description: string;
		events: Array<{
			date: Date;
			event: string;
			watch?: string;
			slides?: string;
		}>;
	} = $props();

	const intl = new Intl.DateTimeFormat(browser ? navigator.languages : undefined, {
		localeMatcher: 'best fit',
	});
</script>

<article>
	<h3>{title}</h3>
	<div class="events">
		{#each events as { event, date, slides, watch }}
			{@const air_date = isNaN(date.getTime()) ? '' : ` - ${intl.format(date)}`}
			{@const future = date.getTime() > Date.now()}
			<small class={{ future }}
				>{#if watch}
					<a aria-label="watch {title}" href={watch} target="_blank"
						><svg viewBox="0 0 256 256" xmlns="http://www.w3.org/2000/svg"
							><path
								fill="currentColor"
								d="M251.77 73a8 8 0 0 0-8.21.39L208 97.05V72a16 16 0 0 0-16-16H32a16 16 0 0 0-16 16v112a16 16 0 0 0 16 16h160a16 16 0 0 0 16-16v-25l35.56 23.71A8 8 0 0 0 248 184a8 8 0 0 0 8-8V80a8 8 0 0 0-4.23-7M192 184H32V72h160zm48-22.95l-32-21.33v-23.44L240 95Z"
							/></svg
						></a
					>
				{/if}
				{#if slides}
					<a aria-label="{title} slides" href={slides} target="_blank"
						><svg viewBox="0 0 256 256" xmlns="http://www.w3.org/2000/svg"
							><path
								fill="currentColor"
								d="M192 48H64a16 16 0 0 0-16 16v128a16 16 0 0 0 16 16h128a16 16 0 0 0 16-16V64a16 16 0 0 0-16-16m0 144H64V64h128zm48-136v144a8 8 0 0 1-16 0V56a8 8 0 0 1 16 0M32 56v144a8 8 0 0 1-16 0V56a8 8 0 0 1 16 0"
							/></svg
						></a
					>
				{/if}{event}{air_date}</small
			>
		{/each}
	</div>
	<details>
		<summary>the abstract</summary>
		<!-- eslint-disable-next-line svelte/no-at-html-tags -->
		<p>{@html description}</p>
	</details>
</article>

<style>
	:global(:root) {
		interpolate-size: allow-keywords;
	}
	svg {
		width: 24px;
	}
	small {
		display: flex;
		gap: 0.5rem;
		align-items: center;
	}
	small.future {
		animation: highlight alternate 1s infinite;
	}
	.events {
		display: grid;
	}
	article {
		display: grid;
		margin-bottom: 1rem;
		border-left: #ff3e00 0.5rem solid;
		padding: 0.5rem;
		background-color: rgb(127 127 127 / 0.2);
		border-radius: 0.5rem;

		h3 {
			margin-top: 0rem;
		}
	}
	details p {
		margin: 0;
		padding-top: 0.5rem;
	}
	details {
		margin-top: 1rem;
		overflow: hidden;
	}
	details::details-content {
		block-size: 0;
		--timing: 0.5s;
		transition:
			block-size var(--timing),
			content-visibility var(--timing);
		transition-behavior: allow-discrete;
	}
	details:open::details-content {
		block-size: auto;
	}
	summary {
		font-weight: bold;
		cursor: pointer;
	}
	summary::marker {
		content: 'show ';
	}
	details:open summary::marker {
		content: 'hide ';
	}

	@keyframes highlight {
		from {
			color: currentColor;
		}
		to {
			color: #ff3e00;
		}
	}
</style>
