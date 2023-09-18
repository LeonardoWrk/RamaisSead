import type { Actions, PageServerLoad } from './$types';

import fs from 'fs';
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
	},
	getChamadasUnidade: async (event) => {
		const index = event.url.searchParams.get('index');

		try {
			// Ler os dados do arquivo option.json
			const response = await event.fetch('src/routes/option.json'); // Certifique-se de que o arquivo option.json está no mesmo diretório

			let options = await response.json();

			// Verifica se o index foi passado como parâmetro na URL
			if (!index) return fail(400, { message: 'Parâmetro inválido ' });

			// Encontra a unidade correspondente ao index no arquivo option.json
			const unidade = options.unidade[index];
			if (!unidade) {
				return fail(404, { message: 'Unidade não encontrada' });
			}

			// Deleta a unidade do array options

			options.unidade = options.unidade.filter(
				(item: { id: number; nome: string }, i: any) => i !== parseInt(index)
			);

			let optionsc = JSON.stringify(options);

			fs.writeFile('src/routes/option.json', optionsc, (err) => {
				if (err) {
					console.log('Error writing file:', err);
				} else {
					console.log('Successfully wrote file');
				}
			});
		} catch (error) {
			console.log(error);
			return fail(500, { message: 'Erro interno do servidor' });
		}
	}
};
