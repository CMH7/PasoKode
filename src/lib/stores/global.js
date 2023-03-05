import { writable } from "svelte/store";

export let userData = writable({
  firstName: 'Charles Maverick',
  middleName: 'Manliclic',
  lastName: 'Herrera',
  sex: 'Male',
  strand: 'STEM',
  year: '12',
  section: 'Mozart',
  username: 'cmh',
  password: 'Jajajaja07',
  id: '123'
})