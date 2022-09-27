import type { Handle } from '@sveltejs/kit';
import { Client } from 'pg';

const client = new Client({
	host: 'localhost',
	port: 5432,
	user: 'admin',
	password: 'admin',
	database: 'teachfastdb'
});

await client.connect();

export const handle: Handle = async ({ event, resolve }) => {
	event.locals = {
		...event.locals,
		pg: client
	};

	return resolve(event);
};
