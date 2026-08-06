import { type Document, type Publication, createOrUpdateStandardSite } from '@mastrojs/atproto';
import fs from 'node:fs/promises';
import type { Component } from 'svelte';
import { render } from 'svelte/server';

const pub_url = new URL('https://ricciuti.me/blog');
const identifier = process.env.ATPROTO_IDENTIFIER ?? 'paolo.ricciuti.me';
const password = process.env.ATPROTO_PASSWORD;
const service = process.env.ATPROTO_SERVICE ?? 'https://npmx.social';

const articles = import.meta.glob<{
	default: Component;
	metadata: { title: string; published: string; preview: string; preview_html: string };
}>('#lib/articles/**/*.svx', {
	eager: true,
});

const docs = await Promise.all(
	Object.entries(articles).map(async ([path, module]) => {
		console.log(path);
		return {
			title: module.metadata.title,
			publishedAt: new Date(module.metadata.published),
			description: module.metadata.preview,
			content: {
				$type: 'site.standard.document.content#html',
				html: (await render(module.default)).body,
			},
			url: new URL(path.split('/').slice(-2, -1)[0], `${pub_url}/`),
		} satisfies Document & {
			content: { $type: 'site.standard.document.content#html'; html: string };
		};
	}),
);

const publication: Publication = {
	url: pub_url,
	name: "Paolo Ricciuti's Blog",
	description: '',
	// Optional square image for the publication, should be at least 256x256:
	icon: {
		blob: await fs.readFile('./build/og/home/home'),
		mimeType: 'image/png',
	},
	// Optional RGB colors, make sure you have enough contrast:
	basicTheme: {
		background: { r: 255, g: 255, b: 255 },
		foreground: { r: 23, g: 24, b: 28 },
		accent: { r: 219, g: 62, b: 0 }, // button color
		accentForeground: { r: 255, g: 255, b: 255 }, // button text
	},
};

await createOrUpdateStandardSite({ identifier, password, service }, publication, docs, {
	baseFolder: './static',
});
