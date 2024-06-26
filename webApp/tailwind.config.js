/** @type {import('tailwindcss').Config} */
export default {
	content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
	theme: {
		extend: {
			colors: {
				'app-green': '#4F9C56',
				'menu': '#708499'
			},
			screens: {
				mini: '380px',
			},
		},
	},
	plugins: [],
};
