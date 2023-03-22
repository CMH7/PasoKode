import prisma from '$lib/db';
import { error, redirect } from '@sveltejs/kit';

/** @type {import('./$types').Actions} */
export const actions = {
	delete: async ({ request }) => {
		const data = await request.formData();
		const lastName = data.get('ln')?.toString();

		const deletedStudents = await prisma.students.deleteMany({
      where: {
        OR: [
          {
            lastName: {
              equals: lastName
            }
          },
          {
            lastName: {
              equals: `${lastName} `
            }
          }
        ]
      }
		});

		if (deletedStudents.count <= 0) throw error(500, { message: 'Error deleting student' });

		throw redirect(302, `/admin`);
	}
};
