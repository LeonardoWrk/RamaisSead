const fs = require('fs');
const path = require('path');

const dataToWrite = {
	setor: [
		'SGRH',
		'DAF',
		'ASCOM',
		'CPSIAD',
		'ALMOXARIFADO',
		'GERPS',
		'GERFIN',
		'GERATA',
		'SGCC',
		'OUVIDORIA',
		'PERICIA MEDICA',
		'SETRANS',
		'DGSL',
		'GERMACO',
		'GERSEP',
		'GERMASE',
		'GERAFOR',
		'GABINETE',
		'RECEPÇÃO',
		'GECIF',
		'CONCURSO',
		'INDENIZACAO',
		'GCSA',
		'DGP',
		'GCDFF',
		'INCORPORAÇÃO',
		'GELOT',
		'ASPOCT',
		'DGPI',
		'SUPAT',
		'DGPM',
		'GEMOVE',
		'DGP',
		'CONTABILIDADE',
		'NÚCLEO',
		'GUARITA',
		'SERVICO SOCIAL',
		'SECLOG',
		'DTIN',
		'ADESP',
		'DTI-TURISTA',
		'ACUMULO DE CARGOS',
		'PROTOCOLO',
		'ESCOLA',
		'GCLOG'
	],
	unidade: [
		'CONTABILIDADE',
		'NÚCLEO',
		'GUARITA',
		'SERVICO SOCIAL',
		'SECLOG',
		'DTIN',
		'ADESP',
		'DTI-TURISTA',
		'ACUMULO DE CARGOS',
		'PROTOCOLO',
		'ESCOLA',
		'GCLOG'
	]
};

const directoryPath = 'build/';
const fileName = 'option.json';

const filePath = path.join(directoryPath, fileName);
const jsonData = JSON.stringify(dataToWrite, null, 2);
console.log(process.cwd());

fs.writeFile(filePath, jsonData, 'utf8', (err) => {
	if (err) {
		console.error('Error writing JSON file:', err);
	} else {
		console.log(`JSON file written successfully! PATH=${filePath}`);
	}
});
