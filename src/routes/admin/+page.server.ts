import type { Actions, PageServerLoad } from './$types';

import { promises as fs } from 'fs';

import { getConnection } from '$lib/db/index.cjs';
import { fail } from '@sveltejs/kit';
import { dev } from '$app/environment';

let db = await getConnection();

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
function arraysParaObjeto<T>(colunas: string[], arrays: T[][]): Record<string, T>[] {
	const objetos: Record<string, T>[] = [];

	arrays.forEach((array) => {
		const objeto: Record<string, T> = {};

		array.forEach((item, index) => {
			objeto[colunas[index]] = item;
		});

		objetos.push(objeto);
	});

	return objetos;
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
	const db = await getConnection();
	const result: any = await db.execute('SELECT * FROM ramais');

	if (result.metaData && result.rows && result.rows.length > 0) {
		const colunas = result.metaData.map((column: { name: string }) => column.name);
		const objetos = arraysParaObjeto(colunas, result.rows);

		const titulo = objetos.shift(); // Removendo e obtendo o primeiro objeto como título

		return { titulo, ramais: objetos, options };
	}

	return { titulo: null, ramais: [], options }; // ou retorne algo adequado para uma situação sem dados
};

export const actions: Actions = {
	createRamais: async ({ request }) => {
		const { org, unidade, setor, us, ramal, servico } = Object.fromEntries(
			await request.formData()
		) as {
			org: string;
			unidade: string;
			setor: string;
			us: string;
			ramal: string;
			servico: string;
		};

		try {
			let result = await db.execute(
				`INSERT INTO ramais (ORG, UNIDADE, SETOR, US, RAMAL, SERVICO)
				VALUES (:1, :2, :3, :4, :5, :6)`,
				[org, unidade, setor, us, ramal, servico]
			);

			if (result.rowsAffected) {
				await db.commit();
			}
		} catch (error) {
			console.log(error);
		}
	},

	deleteRamais: async ({ url }) => {
		const id = url.searchParams.get('id');
		if (!id) return fail(400, { message: 'invalid request ' });
		try {
			let uid = parseInt(id);
			let result = await db.execute(`DELETE FROM ramais WHERE id = :1`, [uid]);

			if (result.rowsAffected) {
				await db.commit();
			}
		} catch (error) {
			console.log(error);
		}
	},
	updateramais: async ({ request, url }) => {
		const id = url.searchParams.get('id');

		if (!id) return fail(400, { message: 'invalid request ' });

		const { org, unidade, setor, us, ramal, servico } = Object.fromEntries(
			await request.formData()
		) as {
			org: string;
			unidade: string;
			setor: string;
			us: string;
			ramal: string;
			servico: string;
		};

		try {
			let uid = parseInt(id);
			let result = await db.execute(
				`UPDATE ramais SET ORG = :2, UNIDADE = :3, SETOR = :4, US = :5 , RAMAL = :6 , SERVICO = :7
				WHERE id = :1`,
				[org, unidade, setor, us, ramal, servico, uid]
			);

			if (result.rowsAffected === 0) {
			} else {
				await db.commit();
			}
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
	},

	getaddUnidade: async (event) => {
		const index = event.url.searchParams.get('index');

		const unidadenew = (await event.request.formData()).get('input');

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

			options.unidade.push(unidadenew);

			console.log(options.unidade);
			let optionsc = JSON.stringify(options, null, 4);
			await writeOptions(correctPath, optionsc);
		} catch (error) {
			console.log(error);
			return fail(500, { message: 'Erro interno do servidor' });
		}
	},
	getChamadasSetor: async (event) => {
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

			const unidade = options.setor[index];
			if (!unidade) {
				return fail(404, { message: 'Unidade não encontrada' });
			}
			options.setor = options.setor.filter(
				(item: { id: number; nome: string }, i: any) => i !== parseInt(index)
			);

			let optionsc = JSON.stringify(options, null, 4);
			await writeOptions(correctPath, optionsc);
		} catch (error) {
			console.log(error);
			return fail(500, { message: 'Erro interno do servidor' });
		}
	},

	getalterarSetor: async (event) => {
		const index = event.url.searchParams.get('index');

		const setorenew = (await event.request.formData()).get('input');

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

			const unidade = options.setor[index];
			if (!unidade) {
				return fail(404, { message: 'Unidade não encontrada' });
			}
			options.setor[index] = setorenew;

			let optionsc = JSON.stringify(options, null, 4);
			await writeOptions(correctPath, optionsc);
		} catch (error) {
			console.log(error);
			return fail(500, { message: 'Erro interno do servidor' });
		}
	},

	getaddsetor: async (event) => {
		const index = event.url.searchParams.get('index');

		const setornew = (await event.request.formData()).get('input');
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

			options.setor.push(setornew);

			console.log(options.unidade);
			let optionsc = JSON.stringify(options, null, 4);
			await writeOptions(correctPath, optionsc);
		} catch (error) {
			console.log(error);
			return fail(500, { message: 'Erro interno do servidor' });
		}
	}
};
