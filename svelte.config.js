import { mdsvex } from 'mdsvex';
import mdsvexConfig from './mdsvex.config.js';
import adapter from '@sveltejs/adapter-static';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	extensions: ['.svelte', ...mdsvexConfig.extensions],
	preprocess: [mdsvex(mdsvexConfig)],
	kit: {
		adapter: adapter(),
		prerender: {
			handleInvalidUrl({ message, referrer }) {
				if (!message.startsWith('Invalid URL at://')) {
					throw new Error(message);
				}
			},
		},
	},
};

export default config;
