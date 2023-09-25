import type { Actions, PageServerLoad } from './$types';

import { promises as fs } from 'fs';
import { db } from '$lib/db/';
import { fail } from '@sveltejs/kit';
import { dev } from '$app/environment';

function stripDir(path: string, endline: string) {
	let pathArray = path.split('/');

	let correctArray = [];
	for (path of pathArray) {
		if (path == '') continue;
		correctArray.push(path);
		if (path == endline) {
			let correctDir = correctArray.join('/');
			return correctDir;
		}
	}
	let correctDir = correctArray.join('/');

	return correctDir;
}

async function getOptions(path: string) {
	return JSON.parse(await fs.readFile(path, 'utf-8'));
}

async function writeOptions(path: string, content: any) {
	await fs
		.writeFile(path, content, 'utf-8')
		.then(() => {
			console.log('Success writing file');
		})
		.catch((err) => {
			console.log('Failed writing file ', err);
		});
}

export const load: PageServerLoad = async () => {
	let currPath = new URL(import.meta.url).pathname;
	let folder = 'build';
	let correctPath = '/opt/render/project/src/build/option.json';
	if (dev) {
		folder = 'ramais';
		correctPath = stripDir(currPath, folder) + '/option.json';
	}

	console.log(`PATH NO SERVER.TS: ${correctPath}`);
	let options = await getOptions(correctPath);

	return {
		options,
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
			let currPath = new URL(import.meta.url).pathname;
			let folder = 'build';
			let correctPath = '/opt/render/project/src/build/option.json';
			if (dev) {
				folder = 'ramais';
				correctPath = stripDir(currPath, folder) + '/option.json';
			}

			console.log(`PATH NO SERVER.TS: ${correctPath}`);
			let options = await getOptions(correctPath);

			// Verifica se o index foi passado como parâmetro na URL
			if (!index) return fail(400, { message: 'Parâmetro inválido ' });

			const unidade = options.unidade[index];
			if (!unidade) {
				return fail(404, { message: 'Unidade não encontrada' });
			}
			options.unidade = options.unidade.filter(
				(item: { id: number; nome: string }, i: any) => i !== parseInt(index)
			);

			let optionsc = JSON.stringify(options, null, 4);
			await writeOptions(correctPath, optionsc);
		} catch (error) {
			console.log(error);
			return fail(500, { message: 'Erro interno do servidor' });
		}
	},

	getalterarUnidade: async (event) => {
		const index = event.url.searchParams.get('index');

		const unidadenew = (await event.request.formData()).get('input');
		console.log(unidadenew);
		try {
			let currPath = new URL(import.meta.url).pathname;
			let folder = 'build';
			let correctPath = '/opt/render/project/src/build/option.json';
			if (dev) {
				folder = 'ramais';
				correctPath = stripDir(currPath, folder) + '/option.json';
			}

			console.log(`PATH NO SERVER.TS: ${correctPath}`);
			let options = await getOptions(correctPath);

			// Verifica se o index foi passado como parâmetro na URL
			if (!index) return fail(400, { message: 'Parâmetro inválido ' });

			const unidade = options.unidade[index];
			if (!unidade) {
				return fail(404, { message: 'Unidade não encontrada' });
			}
			options.unidade[index] = unidadenew;

			console.log(options.unidade);
			let optionsc = JSON.stringify(options, null, 4);
			await writeOptions(correctPath, optionsc);
		} catch (error) {
			console.log(error);
			return fail(500, { message: 'Erro interno do servidor' });
		}
	}
};
