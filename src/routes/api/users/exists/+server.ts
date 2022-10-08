import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { checkUsersTable } from '$lib/utils/users';

export const GET: RequestHandler = async ({ locals }) => {
	// const res = await getPlans();
	// return json(res);

	const { rows } = await checkUsersTable(locals.pg);

	if (rows[0].to_regclass === null) {
		return json({ exists: false });
	} else {
		return json({ exists: true });
	}

	// return json(rows);
};

// export const POST: RequestHandler = async ({ request, locals }) => {
// 	// const res = await postPlans(await request.json());
// 	// return json(res);

// 	const { rows } = await locals.pg.query(
// 		'INSERT INTO plans (content, timestamp, is_done) VALUES ($1, $2, $3) RETURNING *',
// 		[(await request.json()).content, new Date(), false]
// 	);

// 	return json(rows);
// };
