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
	},
	getChamadasUnidade: async ({ url }) => {
		console.log('caraiiiiiiiiiiii');
		const index = url.searchParams.get('index');
		console.log('caraiiiiiiiiiiii');

		try {
			console.log('caraiiiiiiiiiiii');
			// Ler os dados do arquivo option.json
			const response = await fetch('option.json'); // Certifique-se de que o arquivo option.json está no mesmo diretório
			let options = await response.json();

			// Verifica se o index foi passado como parâmetro na URL
			if (!index) return fail(400, { message: 'Parâmetro inválido ' });

			// Encontra a unidade correspondente ao index no arquivo option.json
			const unidade = options[index];

			if (!unidade) {
				return fail(404, { message: 'Unidade não encontrada' });
			}
			console.log('caraiiiiiiiiiiii');

			// Deleta a unidade do array options
			options = options.filter(
				(item: { id: number; nome: string }, i: any) => i !== parseInt(index as string)
			);

			// Salva as alterações no arquivo option.json
			// Nota: Esta parte depende da sua configuração específica para salvar o arquivo
			// Pode ser necessário usar um módulo Node.js ou alguma outra técnica para escrever no sistema de arquivos.
			// Se precisar de ajuda com isso, me avise.
			// Por enquanto, vamos assumir que você tem um método `saveToFile` que pode ser usado.
			await saveToFile('option.json', JSON.stringify(options));
			console.log('caraiiiiiiiiiiii');

			return unidade.chamadas; // Retorna a lista de chamadas da unidade
		} catch (error) {
			console.log('caraiiiiiiiiiiii');

			console.log(error);
			return fail(500, { message: 'Erro interno do servidor' });
		}
	}
};
function saveToFile(filename: string, content: string): void {
	const blob = new Blob([content], { type: 'text/plain' });
	const link = document.createElement('a');
	link.href = window.URL.createObjectURL(blob);
	link.download = filename;
	link.click();
}
