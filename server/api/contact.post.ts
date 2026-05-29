import type { ContactRequest } from '../../app/types'

export default defineEventHandler(async (event) => {
  const body = await readBody<Partial<ContactRequest>>(event)

  if (!body.name || !body.email || !body.subject || !body.message) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Tous les champs sont requis.',
    })
  }

  return {
    ok: true,
    message: 'Demande recue. La connexion email pourra etre branchee sur Resend ou Supabase ensuite.',
  }
})
