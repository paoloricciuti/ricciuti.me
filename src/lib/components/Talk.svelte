<script lang="ts">
	import { browser } from '$app/environment';
	import Copy from 'lucide-svelte/icons/copy';
	import Check from 'lucide-svelte/icons/check';
	import X from 'lucide-svelte/icons/x';

	let {
		title,
		description,
		events,
		slug,
	}: {
		title: string;
		slug: string;
		description: string;
		events: Array<{
			date: Date;
			event: string;
			watch?: string;
			slides?: string;
		}>;
	} = $props();

	let copy_state: 'copied' | 'error' | undefined = $state(undefined);

	const icon_map = {
		copied: Check,
		error: X,
		default: Check,
	};

	let ResultIcon = $derived.by(() => {
		let new_icon = icon_map[copy_state ?? 'default'];
		if (copy_state) {
			icon_map.default = new_icon;
		}
		return new_icon;
	});

	let timeout: ReturnType<typeof setTimeout>;

	const intl = new Intl.DateTimeFormat(browser ? navigator.languages : undefined, {
		localeMatcher: 'best fit',
	});
</script>

<article>
	<button
		class={copy_state}
		onclick={async () => {
			clearTimeout(timeout);
			try {
				await navigator.clipboard.writeText(
					`# ${title}\n\n${description.replace(/<br\s?\/?\s?>/g, '\n')}`,
				);
				copy_state = 'copied';
			} catch {
				copy_state = 'error';
			}
			timeout = setTimeout(() => {
				copy_state = undefined;
			}, 2000);
		}}
		aria-label="copy title and abstract"
	>
		<div class="copy-btn">
			<span>
				<Copy />
			</span>
			<span class="result">
				<ResultIcon />
			</span>
		</div>
	</button>
	<h3 id={slug}><a class="title" href="#{slug}">{title}</a></h3>
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
		{:else}
			<p>
				this talk hasn't been presented at any events yet. If you're interested in being the first
				to host it, please <a href="/contacts">get in touch</a>!
			</p>
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
		scroll-padding: 30%;
	}
	.title {
		text-decoration: none;
		color: inherit;
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
		p {
			margin-block: 0rem;
		}
	}
	article {
		--padding: 0.5rem;
		position: relative;
		display: grid;
		margin-bottom: 1rem;
		border-left: #ff3e00 0.5rem solid;
		padding: var(--padding);
		background-color: rgb(127 127 127 / 0.2);
		border-radius: 0.5rem;

		h3 {
			margin-top: 0rem;
		}
		&:has(:target)::after {
			content: '';
			pointer-events: none;
			position: absolute;
			inset: 0;
			background-image: linear-gradient(45deg, transparent 10%, white 20%, transparent 35%);
			background-size: 300%;
			background-position: 300%;
			opacity: 0.3;
			background-repeat: no-repeat;
			animation: shine 3s infinite;
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

	button {
		position: absolute;
		cursor: pointer;
		right: var(--padding);
		top: var(--padding);

		.copy-btn {
			--timing: 0.25s;
			transition:
				transform var(--timing),
				color var(--timing);
			display: grid;
			transform-style: preserve-3d;
			span {
				backface-visibility: hidden;
				grid-column: 1/-1;
				grid-row: 1/-1;
			}

			.result {
				transform: rotateY(180deg);
			}
		}
		&.copied .copy-btn {
			color: lightgreen;
			transform: rotateY(180deg);
		}
		&.error .copy-btn {
			color: tomato;
			transform: rotateY(180deg);
		}
	}

	@keyframes highlight {
		from {
			color: currentColor;
		}
		to {
			color: #ff3e00;
		}
	}

	@keyframes shine {
		to {
			background-position: -300%;
		}
	}
</style>
