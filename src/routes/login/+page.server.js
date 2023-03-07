import prisma from '$lib/db';

import { fail, redirect } from '@sveltejs/kit'

/** @type {import('./$types').Actions} */
export const actions = {
	login: async ({ request }) => {
		const data = await request.formData();
		const uName = data.get('uName')?.toString()
		const pWord = data.get('pWord')?.toString()

		const student = await prisma.students.findFirst({
			where: {
				username: {
					equals: uName
				}
			}
		})

		if (!student) return fail(404, { reason: 'x-uname' });
		if (student.password !== pWord) return fail(401, { reason: 'x-pword' })

		throw redirect(302, `/${uName}`)
	}
};
