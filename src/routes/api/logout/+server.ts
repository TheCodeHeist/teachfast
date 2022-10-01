import { json, type RequestHandler } from '@sveltejs/kit';

export const DELETE: RequestHandler = async ({ cookies }) => {
	// const res = await postPlans(await request.json());
	// return json(res);
	cookies.set('teachfast_session', '', {
		path: '/',
		httpOnly: true,
		maxAge: 0
	});

	return json({
		message: 'OK'
	});
};
