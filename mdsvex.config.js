import { defineMDSveXConfig as defineConfig } from 'mdsvex';
import preview, { htmlFormatter, textFormatter } from 'remark-preview';

const config = defineConfig({
	extensions: ['.svelte.md', '.md', '.svx'],

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
