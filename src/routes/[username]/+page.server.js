import prisma from '$lib/db';
import { redirect } from '@sveltejs/kit';

/** @type {import('./$types').PageServerLoad} */
export async function load({ params }) {
  const al = ['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z']
  const al2 = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z']
  const dig = ['1','2','3','4','5','6','7','8','9']

  let encData = ''

  const student = await prisma.students.findFirst({
    where: {
      username: {
        equals: params.username
      }
    }
  })

  if (!student) return redirect(302, '/login')
  
  let rawData = `${student.firstName},${student.middleName},${student.lastName},${student.strand}${student.year} - ${student.section},${student.sex}`;

  for (let i = 0; i < rawData.length; i++) {
    if (al.includes(rawData.charAt(i))) {
      if (al.indexOf(rawData.charAt(i)) + 3 >= al.length) {
        let ab = (al.indexOf(rawData.charAt(i)) + 3) % al.length;
        encData += al[ab];
      } else {
        encData += al[al.indexOf(rawData.charAt(i)) + 3];
      }
    } else if (al2.includes(rawData.charAt(i))) {
      if (al2.indexOf(rawData.charAt(i)) + 3 >= al2.length) {
				let ab = (al2.indexOf(rawData.charAt(i)) + 3) % al2.length;
				encData += al2[ab];
			} else {
				encData += al2[al2.indexOf(rawData.charAt(i)) + 3];
			}
    } else if (dig.includes(rawData.charAt(i))) {
      if (dig.indexOf(rawData.charAt(i)) + 3 >= dig.length) {
        let ab = (dig.indexOf(rawData.charAt(i)) + 3) % dig.length;
        encData += dig[ab]
      } else {
        encData += dig[dig.indexOf(rawData.charAt(i)) + 3]
      }
    } else if (rawData.charAt(i).match(' ') ) {
      encData += '%'
    } else if (rawData.charAt(i).match('-')) {
      encData += '+'
    } else {
      encData += rawData.charAt(i)
    }
  }

  return {
    student,
    qrValue: encData
  }
}