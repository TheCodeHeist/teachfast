import type { ClientBase } from 'pg';

export const createUsersTable = async (pg: ClientBase) => {
	try {
		const res = await pg.query(
			'CREATE TABLE IF NOT EXISTS users (id uuid PRIMARY KEY, username text UNIQUE, password text)'
		);

		return res;
	} catch (err) {
		console.log(err);
	}
};

export const checkUsersTable = async (pg: ClientBase) => {
	try {
		const res = await pg.query("SELECT to_regclass('users')");

		return res;
	} catch (err) {
		console.log(err);
	}
};

export const createUser = async (
	pg: ClientBase,
	user_id: string,
	username: string,
	hashedPassword: string
) => {
	try {
		const res = await pg.query(
			'INSERT INTO users (id, username, password) VALUES ($1, $2, $3) RETURNING *',
			[user_id, username, hashedPassword]
		);

		return res;
	} catch (err) {
		console.log(err);
	}
};

export const updatePassword = async (
	pg: ClientBase,
	user_id: string | undefined,
	hashedPassword: string
) => {
	try {
		const res = await pg.query('UPDATE users SET password = $1 WHERE id = $2 RETURNING *', [
			hashedPassword,
			user_id
		]);

		return res;
	} catch (err) {
		console.log(err);
	}
};

export const getUser = async (pg: ClientBase, username: string) => {
	try {
		const res = await pg.query('SELECT * FROM users WHERE username = $1', [username]);

		return res;
	} catch (err) {
		console.log(err);
	}
};
