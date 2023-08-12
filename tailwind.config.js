/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{html,js,svelte,ts}'],
	theme: {
		extend: {
			backgroundImage: {
				divider: 'radial-gradient(circle, currentColor, transparent)'
			},
			gridTemplateColumns: {
				main: 'auto 1fr auto'
			},
			gridTemplateRows: {
				main: 'auto 1fr auto'
			}
		}
	},
	plugins: []
};
