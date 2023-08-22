import { defineMDSveXConfig as defineConfig } from 'mdsvex';
import preview, { htmlFormatter, textFormatter } from 'remark-preview';
import { renderCodeToHTML, runTwoSlash, createShikiHighlighter } from 'shiki-twoslash';

const highlighter = await createShikiHighlighter({ theme: 'css-variables' });
const supported = ['js', 'javascript', 'ts', 'typescript', 'tsx', 'jsx', 'json', 'jsn'];

const config = defineConfig({
	extensions: ['.svelte.md', '.md', '.svx'],
	highlight: {
		highlighter(code, lang) {
			let twoslash = {
				code
			};
			const support_twoslash = supported.includes(lang);
			if (support_twoslash) {
				twoslash = runTwoSlash(code, lang);
			}
			const html = renderCodeToHTML(
				twoslash.code,
				lang,
				{ twoslash: support_twoslash },
				{
					theme: 'css-variables',
					includeJSDocInHover: true
				},
				highlighter,
				twoslash
			);
			return `{@html \`${html.replace('%ts%', 'ts')}\`}`;
		}
	},
	smartypants: {
		dashes: 'oldschool'
	},

	remarkPlugins: [
		preview(textFormatter({ length: 250, maxBlocks: 2 })),

		// Add an HTML preview snippet (formatted) so we can use it when displaying all posts
		preview(
			htmlFormatter({
				length: 250,
				maxBlocks: 2
			}),
			{
				attribute: 'preview_html'
			}
		)
	],
	rehypePlugins: []
});

export default config;
