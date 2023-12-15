import type { PageServerLoad } from './$types';
import { getConnection } from '$lib/db/index.cjs';
let db = await getConnection();

export const load: PageServerLoad = async () => {
	return {
		ramais: await db.execute('SELECT * FROM Ramais')
	};
};
