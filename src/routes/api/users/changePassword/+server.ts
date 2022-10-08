import { updatePassword, getUser } from '$lib/utils/users';
import * as bcrypt from 'bcrypt';
import type { RequestHandler } from './$types';
import { invalid } from '@sveltejs/kit';

export const POST: RequestHandler = async ({ locals, request, cookies }) => {
	const { username, oldPassword, newPassword } = await request.json();

	try {
		const user = await getUser(locals.pg, username);

		if (!user)
			return invalid(404, {
				message: 'User not found'
			});

		if (!(await bcrypt.compare(oldPassword, user.rows[0].password)))
			return invalid(401, {
				message: 'Incorrect password!'
			});

		const salt = await bcrypt.genSalt(10);
		const hashedPassword = await bcrypt.hash(newPassword, salt);
		
		const { rows } = await updatePassword(
			locals.pg,
			cookies.get('teachfast_session'),
			hashedPassword
		);

		return new Response(JSON.stringify(rows), {
			status: 200,
			headers: {
				'Content-Type': 'application/json'
			}
		});
	} catch (err) {
		console.log(err);

		return new Response(JSON.stringify(err), {
			status: 500,
			headers: {
				'Content-Type': 'application/json'
			}
		});
	}
};
