import { createPlansTable } from '$lib/utils/plans';
import { checkUsersTable } from '$lib/utils/users';
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
	await createPlansTable(client);

	const { rows } = await checkUsersTable(client);

	if (rows[0].to_regclass === null) {
		event.locals = {
			...event.locals,
			pg: client
		};

		return resolve(event);
	} else {
		const unProtectedRoutes: string[] = [
			'/api/users/exists',
			// '/dashboard',
			// '/dashboard/overview',
			// '/dashboard/settings',
			'/',
			'/login'
		];
		// unProtectedRoutes = unProtectedRoutes.slice(0, 4);

		const session = event.cookies.get('teachfast_session');
		// console.log('OK!', !unProtectedRoutes.includes(event.url.pathname));

		if (!session && !unProtectedRoutes.includes(event.url.pathname)) {
			return Response.redirect(`${event.url.origin}/login`, 307);
		}

		if (!session && unProtectedRoutes.includes(event.url.pathname)) {
			event.locals = {
				...event.locals,
				pg: client,
				currentUser: null
			};

			return resolve(event);
		} else {
			const currentUser = await client.query('SELECT * FROM users WHERE id = $1', [session]);

			if (currentUser.rows[0]) {
				event.locals = {
					...event.locals,
					pg: client,
					currentUser: {
						isAuthenticated: true,
						username: currentUser.rows[0].username
					}
				};

				return resolve(event);
			} else {
				event.locals = {
					...event.locals,
					pg: client,
					currentUser: null
				};

				return resolve(event);
			}
		}
	}
};
