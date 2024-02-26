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

export const load: PageServerLoad = async ({ url }) => {
	const page = Number(url.searchParams.get('page')); // Obtém o número da página da URL
	const pageSize = 11; // Tamanho da página
	const offset = (page - 1) * pageSize; // Calcula o deslocamento com base no número da página

	// Consulta SQL para obter os registros da página atual
	const db = await getConnection();
	const result: any = await db.execute(
		`SELECT * FROM ramais OFFSET ${offset} ROWS FETCH FIRST ${pageSize} ROWS ONLY`
	);

	// Consulta SQL para obter o número total de registros
	const countResult: any = await db.execute('SELECT COUNT(*) FROM ramais');
	const total = countResult.rows[0][0]; // Total de registros

	if (result.metaData && result.rows && result.rows.length > 0) {
		const colunas = result.metaData.map((column: { name: string }) => column.name);
		const objetos = arraysParaObjeto(colunas, result.rows);

		const titulo = objetos.shift(); // Removendo e obtendo o primeiro objeto como título

		return { titulo, ramais: objetos, total };
	}

	return { titulo: null, ramais: [], total }; // ou retorne algo adequado para uma situação sem dados
};
