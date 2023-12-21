import type { PageServerLoad } from './$types';
import { getConnection } from '$lib/db/index.cjs';

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
	const db = await getConnection();
	const result: any = await db.execute('SELECT * FROM ramais');

	if (result.metaData && result.rows && result.rows.length > 0) {
		const colunas = result.metaData.map((column: { name: string }) => column.name);
		const objetos = arraysParaObjeto(colunas, result.rows);

		const titulo = objetos.shift(); // Removendo e obtendo o primeiro objeto como título

		return { titulo, ramais: objetos };
	}

	return { titulo: null, ramais: [] }; // ou retorne algo adequado para uma situação sem dados
};
