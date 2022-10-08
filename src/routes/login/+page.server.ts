import * as bcrypt from 'bcrypt';
import { invalid, redirect, type RequestHandler } from '@sveltejs/kit';
import type { Actions } from './$types';
import { getUser } from '$lib/utils/users';

// const Default: RequestHandler = async ({ request, cookies, locals }) => {
// 	const form = await request.formData();
// 	const password = form.get('password');

// 	if (!password)
// 		return invalid(400, {
// 			message: 'Password is required!'
// 		});

// 	if (typeof password !== 'string')
// 		return invalid(400, {
// 			message: 'Password must be valid!'
// 		});

// 	const { rows } = await locals.pg.query('SELECT * FROM users WHERE username = $1', ['admin']);
// 	const passwordMatch = await bcrypt.compare(password, rows[0].password);

// 	if (!passwordMatch)
// 		return invalid(401, {
// 			message: 'Wrong password!'
// 		});

// 	cookies.set('teachfast_session', rows[0].id, {
// 		path: '/',
// 		httpOnly: true,
// 		maxAge: 60 * 60 * 24 * 1 // 1 day
// 	});

// 	throw redirect(307, '/dashboard/overview');
// };

export const actions: Actions = {
	default: async ({ request, cookies, locals }) => {
		const form = await request.formData();
		const password = form.get('password');

		if (!password)
			return invalid(400, {
				message: 'Password is required!'
			});

		if (typeof password !== 'string')
			return invalid(400, {
				message: 'Password must be valid!'
			});

		const { rows } = await getUser(locals.pg, 'admin');
		const passwordMatch = await bcrypt.compare(password, rows[0].password);

		if (!passwordMatch)
			return invalid(401, {
				message: 'Wrong password!'
			});

		cookies.set('teachfast_session', rows[0].id, {
			path: '/',
			httpOnly: true,
			secure: false,
			maxAge: 60 * 60 * 24 * 1 // 1 day
		});

		throw redirect(307, '/dashboard/overview');
	}
};
