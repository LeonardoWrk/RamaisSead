import type { Actions } from "./$types";
import { prisma } from '$lib/server/prisma'


export const actions: Actions = {
    createRamais: async ({ request }) => {
        const { org, unidade, setor, user, ramal } = Object.fromEntries(await request.formData()) as {
            org: string,
            unidade: string,
            setor: string,
            user: string,
            ramal: string
          }
          
          try {
            await prisma.ramais.create({
                data: {
                   org,
                   unidade,
                   setor,
                   user,
                   ramal 
                }
            })
               
          } catch (error) {
            console.log(error)
          }
            
    }
}