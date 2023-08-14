/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{html,js,svelte,ts}', './mdsvex.config.js'],
	theme: {
		extend: {
			backgroundColor: {
				current: 'var(--bg)'
			},
			gridTemplateColumns: {
				main: '1fr auto'
			},
			gridTemplateRows: {
				main: 'auto auto 1fr'
			}
		}
	},
	plugins: [require('@tailwindcss/typography')]
};
