import type { Actions, PageServerLoad } from './$types';

import { db } from '$lib/db/';
import { fail } from '@sveltejs/kit';

export const load: PageServerLoad = async () => {
	return {
		ramais: await db.selectFrom('Ramais').selectAll().execute()
	};
};

export const actions: Actions = {
	createRamais: async ({ request }) => {
		const { org, unidade, setor, user, ramal, servico } = Object.fromEntries(
			await request.formData()
		) as {
			org: string;
			unidade: string;
			setor: string;
			user: string;
			ramal: string;
			servico: string;
		};

		try {
			await db
				.insertInto('Ramais')
				.values({
					org,
					unidade,
					setor,
					user,
					ramal,
					servico
				})
				.execute();
		} catch (error) {
			console.log(error);
		}
	},
	deleteRamais: async ({ url }) => {
		const id = url.searchParams.get('id');
		if (!id) return fail(400, { message: 'invalid request ' });
		try {
			await db.deleteFrom('Ramais').where('Ramais.id', '=', parseInt(id)).execute();
		} catch (error) {
			console.log(error);
		}
	},
	updateramais: async ({ request, url }) => {
		let id: any = url.searchParams.get('id');
		if (!id) return fail(400, { message: 'invalid request ' });
		id = parseInt(id);
		const { org, unidade, setor, user, ramal, servico } = Object.fromEntries(
			await request.formData()
		) as {
			org: string;
			unidade: string;
			setor: string;
			user: string;
			ramal: string;
			servico: string;
		};
		try {
			await db
				.updateTable('Ramais')
				.set({ org, unidade, setor, user, ramal, servico })
				.where('Ramais.id', '=', id)
				.executeTakeFirst();
		} catch (error) {
			// console.log('ERROR', error);
		}
	}
};
