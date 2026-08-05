import { defineConfig } from 'vitest/config';
import { playwright } from '@vitest/browser-playwright';
import { sveltekit } from '@sveltejs/kit/vite';
import tailwindcss from '@tailwindcss/vite';
import { mdsvex } from 'mdsvex';
import mdsvex_config from './mdsvex.config.js';
import adapter from '@sveltejs/adapter-static';
import fs from 'node:fs';

function raw_fonts(ext: string[]) {
	return {
		name: 'vite-plugin-raw-fonts',
		transform(_code: string, id: string) {
			if (ext.some((e) => id.endsWith(e))) {
				const buffer = fs.readFileSync(id);

				return { code: `export default ${JSON.stringify(buffer)}`, map: null };
			}
		},
	};
}

export default defineConfig({
	plugins: [
		raw_fonts(['ttf']),
		sveltekit({
			extensions: ['.svelte', ...(mdsvex_config.extensions ?? [])],
			preprocess: [mdsvex(mdsvex_config)],
			adapter: adapter(),
			prerender: {
				handleInvalidUrl({ message }) {
					if (!message.startsWith('Invalid URL at://')) {
						throw new Error(message);
					}
				},
			},
			compilerOptions: {
				experimental: {
					async: true,
				},
			},
			experimental: {
				remoteFunctions: true,
			},
		}),
		tailwindcss(),
	],
	build: {
		assetsInlineLimit(filePath) {
			return !filePath.endsWith('sprite.svg');
		},
	},
	test: {
		include: ['src/**/*.{test,spec}.{js,ts}'],
		projects: [
			{
				extends: './vite.config.ts',
				test: {
					name: 'client',
					browser: {
						enabled: true,
						provider: playwright(),
						instances: [{ browser: 'chromium', headless: true }],
					},
					include: ['src/**/*.svelte.{test,spec}.{js,ts}'],
					exclude: ['src/lib/server/**'],
				},
			},

			{
				extends: './vite.config.ts',
				test: {
					name: 'server',
					environment: 'node',
					include: ['src/**/*.{test,spec}.{js,ts}'],
					exclude: ['src/**/*.svelte.{test,spec}.{js,ts}'],
				},
			},
		],
	},
});
