/** @type {import('tailwindcss').Config} */

module.exports = {
	content: ['./app/**/*.{js,ts,jsx,tsx}', './app/components/**/*.{js,ts,jsx,tsx}'],
	safelist: [{ pattern: /-+/ }],
	theme: {
		colors: {
			'light-purple': '#7b5cfa',
			'background-dark1': '#1E2139',
			'background-dark2': '#141625',
			white: '#ffffff',
			green: '#33D69F',
			purpleish: '#747DB5',
			'light-gray': '#BABDD5',
			'gray-space': '#494e6e',
			warning: '#FF8F00',
			error: '#EC5757',
		},
	},
	plugins: [],
};
