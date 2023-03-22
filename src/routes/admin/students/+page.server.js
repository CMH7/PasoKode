import prisma from '$lib/db';

/** @type {import('./$types').PageServerLoad} */
export async function load() {
  const students = await prisma.students.findMany();

  return {
    students
  }
 }