<script>

  export let data

  let search = ''

  $: lists = data.students.sort((a,b) => a.lastName.localeCompare(b.lastName))

  //@ts-ignore
  const handleInput = (e) => {
    if (search === '') {
      lists = data.students.sort((a,b) => a.lastName.localeCompare(b.lastName))
    } else {
      lists = lists.filter(stud => `${stud.firstName}${stud.middleName}${stud.lastName}${stud.strand}${stud.year}-${stud.section}`.toLowerCase().match(search.toLowerCase()))
    }
  }
</script>

<div class="w-full h-full flex flex-wrap items-start px-3 gap-x-2 gap-y-2 fredoka text-base pt-5">

  <div class="w-full mb-5">
    <input type="text" class="rounded-lg w-[300px] h-[40px] px-2" placeholder="Search" bind:value={search} on:input={handleInput} />
  </div>

  {#each lists as student}
    <div class='w-[200px] h-fit flex flex-col border-2 border-primary rounded-lg {student.lastName.charAt(student.lastName.length - 1) === ' ' ? 'bg-red-500' : 'bg-white'}'>
      <div class="freokda px-3 text-ellipsis w-full">
        First name: <span class='font-bold'>{student.firstName}</span>
      </div>

      <div class="freokda px-3 text-ellipsis w-full border-2-[1px] border-primary">
        Middle name: <span class='font-bold'>{student.middleName}</span>
      </div>
      
      <div class="freokda px-3 text-ellipsis w-full">
        Last name: <span class='font-bold'>{student.lastName}</span>
      </div>

      <div class="freokda px-3 text-ellipsis w-full">
        Strand: <span class='font-bold'>{student.strand}</span>
      </div>

      <div class="freokda px-3 text-ellipsis w-full">
        Year: <span class='font-bold'>{student.year}</span>
      </div>

      <div class="freokda px-3 text-ellipsis w-full">
        Section: <span class='font-bold'>{student.section}</span>
      </div>
    </div>
  {/each}
</div>