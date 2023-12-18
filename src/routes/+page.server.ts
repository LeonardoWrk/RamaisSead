import type { PageServerLoad } from './$types';
import { getConnection } from '$lib/db/index.cjs';
let db = await getConnection();

export const load: PageServerLoad = async () => {
	let ramais = (await db.execute('SELECT * FROM ramais')).rows;
	console.log(ramais);
	return {};
};
