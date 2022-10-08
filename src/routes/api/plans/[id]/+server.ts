// import { getPlans, postPlans } from '$lib/utils/pgmethods';
import { deletePlan, getPlan, updatePlan, updatePlanContent } from '$lib/utils/plans';
import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

export const GET: RequestHandler = async ({ locals, params }) => {
	// const res = await getPlans();
	// return json(res);

	const { rows } = await getPlan(locals.pg, params.id);

	return json(rows);
};

export const PATCH: RequestHandler = async ({ request, locals, params }) => {
	// const res = await postPlans(await request.json());
	// return json(res);

	const { rows } = await updatePlan(locals.pg, params.id, (await request.json()).is_done);

	return json(rows);
};

export const PUT: RequestHandler = async ({ request, locals, params }) => {
	// const res = await postPlans(await request.json());
	// return json(res);

	const { rows } = await updatePlanContent(locals.pg, params.id, (await request.json()).content);

	return json(rows);
};

export const DELETE: RequestHandler = async ({ locals, params }) => {
	// const res = await postPlans(await request.json());
	// return json(res);

	const { rows } = await deletePlan(locals.pg, params.id);

	return json(rows);
};
