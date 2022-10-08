// import { getPlans, postPlans } from '$lib/utils/pgmethods';
import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { getAllPlans } from '$lib/utils/plans';
import { createPlan } from './../../../lib/utils/plans';

export const GET: RequestHandler = async ({ locals }) => {
	// const res = await getPlans();
	// return json(res);

	const { rows } = await getAllPlans(locals.pg);

	return json(rows);
};

export const POST: RequestHandler = async ({ request, locals }) => {
	// const res = await postPlans(await request.json());
	// return json(res);

	const { rows } = await createPlan(locals.pg, (await request.json()).content);

	return json(rows);
};
