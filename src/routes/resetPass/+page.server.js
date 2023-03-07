import prisma from '$lib/db'
import { fail, redirect } from '@sveltejs/kit'

/** @type {import('./$types').Actions} */
export const actions = {
  findUser: async ({ request }) => {
    const data = await request.formData()
    const uName = data.get('uName')?.toString()

    const student = await prisma.students.findFirst({
      where: {
        username: {
          equals: uName
        }
      }
    })

    if (!student) return fail(404, { reason: 'x-uname' })
    
    throw redirect(300, `/resetPass/${student.username}/updatePass`)
  }
}