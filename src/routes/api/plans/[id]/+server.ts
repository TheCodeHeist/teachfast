// import { getPlans, postPlans } from '$lib/utils/pgmethods';
import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

export const GET: RequestHandler = async ({ locals, params }) => {
	// const res = await getPlans();
	// return json(res);

	const { rows } = await locals.pg.query('SELECT * FROM plans WHERE id = $1', [params.id]);

	return json(rows);
};

export const PATCH: RequestHandler = async ({ request, locals, params }) => {
	// const res = await postPlans(await request.json());
	// return json(res);

	const { rows } = await locals.pg.query(
		'UPDATE plans SET is_done = $1 WHERE id = $2 RETURNING *',
		[(await request.json()).is_done, params.id]
	);

	return json(rows);
};

export const PUT: RequestHandler = async ({ request, locals, params }) => {
	// const res = await postPlans(await request.json());
	// return json(res);

	const { rows } = await locals.pg.query(
		'UPDATE plans SET content = $1 WHERE id = $2 RETURNING *',
		[(await request.json()).content, params.id]
	);

	return json(rows);
};

export const DELETE: RequestHandler = async ({ locals, params }) => {
	// const res = await postPlans(await request.json());
	// return json(res);

	const { rows } = await locals.pg.query('DELETE FROM plans WHERE id = $1 RETURNING *', [
		params.id
	]);

	return json(rows);
};


