/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{html,js,svelte,ts}'],
	theme: {
		extend: {
			backgroundColor: {
				current: 'var(--bg)'
			},
			gridTemplateColumns: {
				main: 'auto 1fr auto'
			},
			gridTemplateRows: {
				main: 'auto auto 1fr'
			}
		}
	},
	plugins: []
};
