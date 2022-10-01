import type { LayoutLoad } from './$types';

export const load: LayoutLoad = async function ({ data }) {
	return {
		currentUser: data.currentUser
	};
};
