<script>

  export let data
</script>

<div class="w-full h-full flex justify-center flex-wrap gap-x-2 gap-y-2 fredoka text-base">

  {#each data.students.sort((a,b) => a.lastName.localeCompare(b.lastName)) as student}
    <div class='w-[200px] flex flex-col border-2 border-primary rounded-lg {student.lastName.charAt(student.lastName.length - 1) === ' ' ? 'bg-red-500' : 'bg-white'}'>
      <div class="freokda px-3 text-ellipsis w-full">
        First name: <span class='font-bold'>{student.firstName}</span>
      </div>

      <div class="freokda px-3 text-ellipsis w-full border-2-[1px] border-primary">
        Middle name: <span class='font-bold'>{student.middleName}</span>
      </div>
      
      <div class="freokda px-3 text-ellipsis w-full">
        Last name: <span class='font-bold'>{student.lastName}</span>
      </div>
    </div>
  {/each}
</div>