//import adapter from '@sveltejs/adapter-auto';
import node from '@sveltejs/adapter-node';
import { vitePreprocess } from '@sveltejs/kit/vite';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	kit: {
		adapter: node(),
		csrf: {
			checkOrigin: false
		},
		vite: {
			optimizeDeps: {
				include: ['svelte-qrCode']
			}
		}
	},
	preprocess: vitePreprocess(),
	typescript: {
		tsconfigFile: './tsconfig.json'
	}
};

export default config;
