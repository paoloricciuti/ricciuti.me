<script lang="ts">
	let {
		title,
		description,
		date,
		event,
		watch,
		slides,
	}: {
		title: string;
		description: string;
		date: Date;
		event: string;
		watch?: string;
		slides?: string;
	} = $props();

	const intl = new Intl.DateTimeFormat(undefined, {
		localeMatcher: 'best fit',
	});
	const air_date = $derived.by(() => {
		if (isNaN(date.getTime())) return '';
		return ` - ${intl.format(date)}`;
	});
</script>

<article>
	<h3>{title}</h3>
	<small>{event}{air_date}</small>
	<details>
		<summary>show me the abstract</summary>
		<!-- eslint-disable-next-line svelte/no-at-html-tags -->
		<p>{@html description}</p>
	</details>
	<div>
		{#if watch}
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
		{/if}
	</div>
</article>

<style>
	:global(:root) {
		interpolate-size: allow-keywords;
	}
	svg {
		width: 24px;
	}
	div {
		display: grid;
		align-items: baseline;
		align-content: baseline;
		gap: 0.5rem;
		background-color: rgb(127 127 127 / 0.3);
		padding: 0.5rem;
		border-radius: 0.5rem;
		grid-column: 2;
		grid-row: 1/-1;
		align-self: start;
	}
	article {
		display: grid;
		grid-template-columns: 1fr auto;
		grid-template-rows: repeat(3, auto);
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
		transition:
			block-size 1s,
			content-visibility 1s;
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
		content: '';
	}
</style>
