/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ['./src/**/*.{html,js,svelte,ts}'],
	theme: {
    extend: {
      colors: {
        'skyBlue': "#53CBFF",
        'primary': "#0055A0",
        'paleRed': "#FF7991",
        'paleBlue': "#235074"
      }
    }
	},
	plugins: []
};
