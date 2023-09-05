// See https://kit.svelte.dev/docs/types#app

import type { PrismaClient } from '@prisma/client';

// for information about these interfaces
declare global {
	type Ramal = {
		org: string;
		unidade: string;
		setor: string;
		user: string;
		ramal: string;
		servico: string;
		id: number;
	};
	namespace App {
		// interface Error {}
		// interface Locals {}
		// interface PageData {}
		// interface Platform {}
	}
	// eslint-disable-next-line no-var
	var prisma: PrismaClient;
}

export {};
