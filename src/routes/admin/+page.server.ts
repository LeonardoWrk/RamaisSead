import type { Actions } from './$types';
import { db } from '$lib/db/';

export const actions: Actions = {
	createRamais: async ({ request }) => {
		const { org, unidade, setor, user, ramal } = Object.fromEntries(await request.formData()) as {
			org: string;
			unidade: string;
			setor: string;
			user: string;
			ramal: string;
		};

		try {
			await db
				.insertInto('Ramais')
				.values({
					org,
					unidade,
					setor,
					user,
					ramal
				})
				.execute();
		} catch (error) {
			console.log(error);
		}
	}
};
