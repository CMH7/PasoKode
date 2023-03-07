import prisma from '$lib/db';
import { fail, redirect } from '@sveltejs/kit';

/** @type {import('./$types').PageServerLoad} */
export async function load({ params }) {
	const student = await prisma.students.findFirst({
		where: {
			username: {
				equals: params.username
			}
		}
	});

	if (!student) return redirect(302, '/login');

	return {
		student
	};
}

/** @type {import('./$types').Actions} */
export const actions = {
	updateData: async ({ request }) => {
		const data = await request.formData();
		const id = data.get('id')?.toString();
		const firstName = data.get('fn')?.toString()
		const middleName = data.get('mn')?.toString()
		const lastName = data.get('ln')?.toString()
		const sex = data.get('sex')?.toString()
		const strand = data.get('strand')?.toString()
		const year = data.get('year')?.toString()
		const section = data.get('section')?.toString()

		const student = await prisma.students.update({
			where: {
				id
			},
			data: {
				firstName,
				middleName,
				lastName,
				strand,
				// @ts-ignore
				year: parseInt(year),
				section,
				sex
			}
		});

		if (!student) return fail(404, { reason: 'x-uname' });

		throw redirect(302, `/${student.username}/settings`);
	}
};
