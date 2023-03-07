import prisma from '$lib/db';
import { redirect } from '@sveltejs/kit';

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
