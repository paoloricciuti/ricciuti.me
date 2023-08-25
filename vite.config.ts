import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vitest/config';
import dynamic_import from 'vite-plugin-dynamic-import';

export default defineConfig({
	plugins: [dynamic_import(), sveltekit()],
	test: {
		include: ['src/**/*.{test,spec}.{js,ts}'],
	},
});
