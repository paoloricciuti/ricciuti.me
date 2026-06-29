import fs from 'node:fs/promises';
import { createOrUpdateStandardSite, type Publication, type Document } from '@mastrojs/atproto';
import { readMarkdownFiles } from '@mastrojs/markdown';

const identifier = 'paolo.ricciuti.me';
const password = process.env.ATPROTO_PASSWORD;
const pub_url = new URL('https://ricciuti.me/blog/');

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
		accent: { r: 255, g: 62, b: 0 }, // button color
		accentForeground: { r: 255, g: 255, b: 255 }, // button text
	},
};

const posts = await readMarkdownFiles<{ title: string; published: string }>(
	'./src/lib/articles/*/index.svx',
);
const docs: Document[] = posts.map((p) => ({
	title: p.meta.title,
	publishedAt: new Date(p.meta.published),
	url: new URL(p.path.split('/').slice(-2, -1)[0], pub_url),
}));

await createOrUpdateStandardSite({ identifier, password }, publication, docs, {
	baseFolder: './static',
});
