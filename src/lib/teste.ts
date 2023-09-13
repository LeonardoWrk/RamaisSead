import fs from 'fs';

export default function jsonData(index: number) {
	console.log('BUCETAAAAAAAAAAAAAAAAAA');
	fs.readFile('src/lib/option.json', 'utf8', (err: any, data: any) => {
		if (err) {
			console.error('Erro ao ler o arquivo:', err);
			return;
		}

		let option = JSON.parse(data);
		option.unidade = option.unidade.filter((_: any, i: any) => i !== 2);

		fs.writeFile('src/lib/option.json', JSON.stringify(option), 'utf8', (err: any) => {
			if (err) {
				console.error('Erro ao escrever no arquivo:', err);
				return;
			}
			console.log('Arquivo atualizado com sucesso!');
		});
	});
}
