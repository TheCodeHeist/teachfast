import * as bcrypt from 'bcrypt';
import type { RequestHandler } from './$types';

export const POST: RequestHandler = async ({ locals, request, cookies }) => {
	const { password } = await request.json();

	const salt = await bcrypt.genSalt(10);
	const hashedPassword = await bcrypt.hash(password, salt);

	try {
		const { rows } = await locals.pg.query(
			'UPDATE users SET password = $1 WHERE id = $2 RETURNING *',
			[hashedPassword, cookies.get('teachfast_seesion')]
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
