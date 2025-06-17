import { sveltekit } from '@sveltejs/kit/vite';
import tailwindcss from '@tailwindcss/vite';
import { defineConfig } from 'vitest/config';
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
	plugins: [raw_fonts(['ttf']), sveltekit(), tailwindcss()],
	build: {
		assetsInlineLimit(filePath) {
			return !filePath.endsWith('sprite.svg');
		},
	},
	test: {
		include: ['src/**/*.{test,spec}.{js,ts}'],
	},
});
