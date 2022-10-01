import * as bcrypt from 'bcrypt';
// import * as jwt from 'jsonwebtoken';
// import { dev } from '$app/environment';
import type { RequestHandler } from './$types';

export const POST: RequestHandler = async ({ locals, request, cookies }) => {
	// const res = await getPlans();
	// return json(res);

	// CREATE TABLE users (
	// 	id uuid PRIMARY KEY,
	// 	username varchar(20) UNIQUE NOT NULL,
	// 	password varchar(20) NOT NULL
	// );

	await locals.pg.query(
		'CREATE TABLE IF NOT EXISTS users (id uuid PRIMARY KEY, username varchar(100) UNIQUE NOT NULL, password varchar(100) NOT NULL)'
	);

	const { password } = await request.json();

	const salt = await bcrypt.genSalt(10);
	const hashedPassword = await bcrypt.hash(password, salt);
	const user_id = crypto.randomUUID();

	try {
		const { rows } = await locals.pg.query(
			'INSERT INTO users (id, username, password) VALUES ($1, $2, $3) RETURNING *',
			[user_id, 'admin', hashedPassword]
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

// export const POST: RequestHandler = async ({ request, locals }) => {
// const res = await postPlans(await request.json());
// return json(res);

// 	const { rows } = await locals.pg.query(
// 		'INSERT INTO plans (content, timestamp, is_done) VALUES ($1, $2, $3) RETURNING *',
// 		[(await request.json()).content, new Date(), false]
// 	);

// 	return json(rows);
// };
