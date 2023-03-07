import prisma from '$lib/db';
import { fail, redirect } from '@sveltejs/kit';

/** @type {import('./$types').PageServerLoad} */
export async function load({ params }) {
	const student = await prisma.students.findFirst({
		where: {
			username: {
				equals: params.uName
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
	resetPass: async ({ request }) => {
		const data = await request.formData();
		const id = data.get('id')?.toString();
		const nPass = data.get('nPass')?.toString();

		const student = await prisma.students.update({
			where: {
				id
			},
			data: {
				password: nPass
			}
		});

		if (!student) return fail(404, { reason: 'x-uname' });

		throw redirect(302, `/login`);
	}
};
