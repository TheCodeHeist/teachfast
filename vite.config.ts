import { sveltekit } from '@sveltejs/kit/vite';
import type { UserConfig } from 'vite';
import webSocketServer from './webSocketServer';

const config: UserConfig = {
	plugins: [sveltekit(), webSocketServer]
};

export default config;
