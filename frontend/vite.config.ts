import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
	server: {
		proxy: {
			'/api': {
				target: 'http://[::]:3000/api',
				changeOrigin: true,
				rewrite: (path) => path.replace(/^\/api/, ''),
			},
			'/static': {
				target: 'http://[::]:3000/static',
				changeOrigin: true,
				rewrite: (path) => path.replace(/^\/static/, ''),
			},
			'/image': {
				target: 'http://[::]:3000/image',
				changeOrigin: true,
				rewrite: (path) => path.replace(/^\/image/, ''),
			},
		},
	},
	plugins: [react()],
});
