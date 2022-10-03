import { error } from '@sveltejs/kit';
import type { PageLoad } from './$types';

export const load: PageLoad = async ({ fetch }) => {
	try {
		const res = await fetch('/api/users/exists', {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json'
			}
		});
		const data = await res.json();

		if (res.ok) {
			return {
				exists: data.exists
			};
		} else {
			return error(500, data.message);
		}
	} catch (err: unknown) {
		console.log(err);
		return error(500, err.message);
	}
};
