import prisma from '$lib/db';
import { error, redirect } from '@sveltejs/kit';

/** @type {import('./$types').Actions} */
export const actions = {
	register: async ({ request }) => {
		const data = await request.formData();
		const firstName = data.get('fn')?.toString();
		const middleName = data.get('mn')?.toString();
		const lastName = data.get('ln')?.toString();
		const sex = data.get('sex')?.toString();
		const strand = data.get('strand')?.toString();
		const year = data.get('year')?.toString();
		const section = data.get('section')?.toString();
		const uName = data.get('uName')?.toString();
		const pWord = data.get('pWord')?.toString();

		const student = await prisma.students.create({
			data: {
				// @ts-ignore
				firstName,
				// @ts-ignore
				middleName,
				// @ts-ignore
				lastName,
				// @ts-ignore
				strand,
				// @ts-ignore
				year: parseInt(year),
				// @ts-ignore
				section,
				// @ts-ignore
        sex,
				// @ts-ignore
        username: uName,
				// @ts-ignore
        password: pWord
			}
		});

		if (!student) throw error(500, {message: 'Error registering new student'})

		throw redirect(302, `/login`);
	}
};
