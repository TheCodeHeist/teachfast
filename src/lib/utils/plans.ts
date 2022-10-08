import type { ClientBase } from 'pg';

export const createPlansTable = async (pg: ClientBase) => {
	try {
		const res = await pg.query(
			'CREATE TABLE IF NOT EXISTS plans (id serial PRIMARY KEY, content text, timestamp timestamptz, is_done bool)'
		);

		return res;
	} catch (err) {
		console.log(err);
	}
};

export const getAllPlans = async (pg: ClientBase) => {
	try {
		const res = await pg.query('SELECT * FROM plans ORDER BY id ASC');

		return res;
	} catch (err) {
		console.log(err);
	}
};

export const createPlan = async (pg: ClientBase, content: string) => {
	try {
		const res = await pg.query(
			'INSERT INTO plans (content, timestamp, is_done) VALUES ($1, $2, $3) RETURNING *',
			[content, new Date(), false]
		);

		return res;
	} catch (err) {
		console.log(err);
	}
};

export const getPlan = async (pg: ClientBase, id: string) => {
	try {
		const res = await pg.query('SELECT * FROM plans WHERE id = $1', [id]);

		return res;
	} catch (err) {
		console.log(err);
	}
};

export const updatePlan = async (pg: ClientBase, id: string, is_done: boolean) => {
	try {
		const res = await pg.query('UPDATE plans SET is_done = $1 WHERE id = $2 RETURNING *', [
			is_done,
			id
		]);

		return res;
	} catch (err) {
		console.log(err);
	}
};

export const updatePlanContent = async (pg: ClientBase, id: string, content: string) => {
	try {
		const res = await pg.query('UPDATE plans SET content = $1 WHERE id = $2 RETURNING *', [
			content,
			id
		]);

		return res;
	} catch (err) {
		console.log(err);
	}
};

export const deletePlan = async (pg: ClientBase, id: string) => {
	try {
		const res = await pg.query('DELETE FROM plans WHERE id = $1 RETURNING *', [id]);

		return res;
	} catch (err) {
		console.log(err);
	}
};
