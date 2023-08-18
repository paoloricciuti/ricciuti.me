/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{html,js,svelte,ts,svx}', './mdsvex.config.js'],
	theme: {
		extend: {
			colors: {
				brand: {
					50: '#fff5ec',
					100: '#ffe9d3',
					200: '#ffcea5',
					300: '#ffac6d',
					400: '#ff7d32',
					500: '#ff590a',
					600: '#ff3e00',
					700: '#cc2902',
					800: '#a1210b',
					900: '#821e0c',
					950: '#3d1612'
				}
			},
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
