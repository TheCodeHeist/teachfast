import { error } from '@sveltejs/kit';
import type { PageLoad } from './$types';

export const load: PageLoad = async ({ fetch }) => {
	try {
		const res = await fetch('/api/plans', {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json'
			}
		});
		const data = await res.json();

		// console.log(data);

		if (res.ok) {
			return {
				plans: data
			};
		} else {
			return error(500, data.message);
		}
	} catch (err: unknown) {
		return error(500, err.message);
	}

	// return {
	// 	plans: [
	// 		{
	// 			id: '1',
	// 			content: 'test',
	// 			date: '2021-08-01'
	// 		}
	// 	]
	// };
};
