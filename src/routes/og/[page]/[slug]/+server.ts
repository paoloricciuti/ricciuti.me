import { Resvg } from '@resvg/resvg-js';
import he from 'he';
import satori from 'satori';
import { html as toReactNode } from 'satori-html';
import { render } from 'svelte/server';
import Menlo from './Menlo-Regular.ttf';
import OG from './OG.svelte';
import { get_icon_code, load_emoji } from './tweemoji';
import { get_articles } from '$lib/articles/utils';

const height = 630;
const width = 1200;

export const prerender = true;

const articles = await get_articles();

articles.push({
	slug: 'home',
	title: 'my internet home',
	preview: '',
	preview_html: '',
	published: '',
});

articles.push({
	slug: 'about',
	title: "all there's to know about me",
	preview: '',
	preview_html: '',
	published: '',
});

articles.push({
	slug: 'contacts',
	title: 'how to contact me',
	preview: '',
	preview_html: '',
	published: '',
});

articles.push({
	slug: 'speaking',
	title: 'checkout how I public speak',
	preview: '',
	preview_html: '',
	published: '',
});

export async function entries() {
	const entries = articles.map((article) => ({
		slug: article.slug,
		page: article.preview !== '' ? 'blog' : article.slug,
	}));
	return entries;
}

export async function GET({ params: { slug } }) {
	const article = articles.find((a) => a.slug === slug);

	const result = render(OG, { props: { title: article?.title ?? 'Cool' } });

	const element = toReactNode(
		`${he.decode(result.body, { isAttributeValue: true })}${result.head}`,
	);
	const svg = await satori(element, {
		fonts: [
			{
				name: 'Menlo',
				data: Buffer.from(Menlo),
				style: 'normal',
			},
		],
		height,
		width,
		async loadAdditionalAsset(code, segment) {
			if (code === 'emoji' && segment) {
				return `data:image/svg+xml;base64,` + btoa(await load_emoji(get_icon_code(segment)));
			}
			return '';
		},
	});

	const resvg = new Resvg(svg, {
		fitTo: {
			mode: 'width',
			value: width,
		},
	});

	const image = resvg.render();

	return new Response(image.asPng(), {
		headers: {
			'content-type': 'image/png',
		},
	});
}
