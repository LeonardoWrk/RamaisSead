import type { PageServerLoad } from './$types';
import { prisma } from '$lib/server/prisma';

export const load: PageServerLoad = async () => {
	return {
		ramais: await prisma.ramais.findMany()
	};
};
