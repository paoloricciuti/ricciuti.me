import { defineMDSveXConfig as defineConfig } from 'mdsvex';
import preview, { htmlFormatter, textFormatter } from 'remark-preview';
import { getHighlighter } from 'shiki';

const highlighter = await getHighlighter({ theme: 'css-variables' });

const config = defineConfig({
	extensions: ['.svelte.md', '.md', '.svx'],
	highlight: {
		highlighter(code, lang) {
			const html = highlighter.codeToHtml(code, { lang });
			return `{@html \`${html
				.replace('%ts%', 'ts')
				.replaceAll('`', '\\`')
				.replaceAll('{', '\\{')}\`}`;
		},
	},
	smartypants: {
		dashes: 'oldschool',
	},

	remarkPlugins: [
		preview(textFormatter({ length: 250, maxBlocks: 2 })),

		// Add an HTML preview snippet (formatted) so we can use it when displaying all posts
		preview(
			htmlFormatter({
				length: 250,
				maxBlocks: 2,
			}),
			{
				attribute: 'preview_html',
			},
		),
	],
	rehypePlugins: [],
});

export default config;
