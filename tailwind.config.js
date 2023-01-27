/** @type {import('tailwindcss').Config} */
module.exports = {
	content: [
		"./pages/**/*.{js,ts,jsx,tsx}",
		"./components/**/*.{js,ts,jsx,tsx}",
		"./app/**/*.{js,ts,jsx,tsx}",
	],
	darkMode: "class",
	theme: {
		extend: {
			fontFamily: {
				term: '"Ubuntu Mono", monospace',
			},
			keyframes: {
				"cursor-blink": {
					"0%, 100%": { opacity: "0" },
					"50%": { opacity: "1" },
				},
			},
			animation: {
				"cursor-blink": "1s cursor-blink step-end infinite",
			},
		},
	},
	plugins: [],
};
