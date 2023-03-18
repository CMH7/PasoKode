/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ['./src/**/*.{html,js,svelte,ts}'],
	theme: {
    extend: {
      backgroundImage: {
        "pasoKodeLogo": "url('/favicon.png')",
        "pasoKodeLogoNoBg": "url('/PasoKode noBG.png')",
        "pasoKodeTitle": "url('/pasoKodeTitle.png')",
        "pasoKodeBanner": "url('/pasoKodeBanne2r.png')",
        "pasoLogo": "url('/OIP.png')",
        "pasoSchool": "url('/pasoSchool.jpg')"
      },
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
