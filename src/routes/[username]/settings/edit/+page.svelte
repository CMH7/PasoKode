<script>
  import { page } from '$app/stores'
  import SelectField from "$lib/components/SelectField.svelte";
	import PasokButton from "$lib/components/PasokButton.svelte";
	import { applyAction, deserialize, enhance } from '$app/forms';
	import { goto, invalidateAll } from '$app/navigation';

  /**
   * @type {import('./$types').PageServerData}
   */
  export let data

  let updatingData = false

  const sex = ['Male', 'Female']
  const strands = ['STEM', 'ABM']
  const grade = ['11', '12']
  const sectionsOf11 = ['Orion', 'Leo', 'Morgan', 'Wedgwood']
  const sectionsOf12 = ['Da Vinci', 'Rembrandt', 'Beethoven', 'Mozart']

  let studentID = data.student?.id
  $: selectedyear = `${data.student?.year}`
  let student = {
    firstName: data.student?.firstName,
    middleName: data.student?.middleName,
    lastName: data.student?.lastName,
    strand: data.student?.strand,
    year: `${data.student?.year}`,
    section: data.student?.section,
    sex: data.student?.sex
  }

  const updateData = async () => {
    if (updatingData) return
    updatingData = true

    if(student.firstName === '' || student.lastName === '') {

    }
    
    let form = document.getElementById('formUpdateData')
    // @ts-ignore
    const data = new FormData(form);

    // @ts-ignore
    const response = await fetch(form.action, {
      method: 'POST',
      body: data
    });

    /** @type {import('@sveltejs/kit').ActionResult} */
    const result = deserialize(await response.text());

    if (result.type === 'redirect') {
      await goto(`/login`)
    }

    if (result.type === 'success') {
      // re-run all `load` functions, following the successful update
      await invalidateAll();
    }

    applyAction(result);
    updatingData = false
  }
</script>

<svelte:head>
  <title>{$page.params.username} | Edit data</title>
</svelte:head>

<form
  id='formUpdateData'
  class="hidden"
  action="?/updateData"
  method="post"
  use:enhance
>
  <input name='id' type="text" bind:value={studentID}>
  <input name='fn' type="text" bind:value={student.firstName}>
  <input name='mn' type="text" bind:value={student.middleName}>
  <input name='ln' type="text" bind:value={student.lastName}>
  <input name='sex' type="text" bind:value={student.sex}>
  <input name='strand' type="text" bind:value={student.strand}>
  <input name='year' type="text" bind:value={student.year}>
  <input name='section' type="text" bind:value={student.section}>
</form>

<div class="w-full h-full flex flex-col items-center gap-y-5">
  <!-- header logo -->
  <div class="w-full flex justify-center items-center pt-3 gap-x-3">
    <!-- logo -->
    <div class="bg-pasoKodeBanner bg-[length:150px_75px] w-[150px] h-[75px] flex-shrink-0" />
  </div>

  <!-- headings -->
  <div class="w-full flex justify-center items-center mt-10">
    <div class="text-[32px] font-bold fredoka">
      EDIT
    </div>
  </div>

  <!-- body -->
  <div class="flex flex-col items-center gap-y-3">
    <!-- FN & MN -->
    <div class="flex items-center gap-x-2">
      
      <div class="w-[135px] flex flex-col">
        <!-- label -->
        <div class="lexend text-[12px]">
          First Name
        </div>
        
        <input bind:value={student.firstName} class="w-full h-[37px] rounded-lg pl-3 lexend text-xs" type='text'>
      </div>

      <div class="w-[135px] flex flex-col">
        <!-- label -->
        <div class="lexend text-[12px]">
          Middle Name
        </div>
        
        <input bind:value={student.middleName} class="w-full h-[37px] rounded-lg pl-3 lexend text-xs" type='text'>
      </div>
    </div>
    
    <!-- LN & Sex -->
    <div class="flex items-center gap-x-2">
      <div class="w-[135px] flex flex-col">
        <!-- label -->
        <div class="lexend text-[12px]">
          Last Name
        </div>
        
        <input bind:value={student.lastName} class="w-full h-[37px] rounded-lg pl-3 lexend text-xs" type='text'>
      </div>

      <SelectField bind:value={student.sex} width='135px' data={['Male', 'Female']}>
        <div class="lexend text-[12px]">
          Sex
        </div>
      </SelectField>
    </div>

    <!-- strands -->
    <div class="w-full">
      <SelectField bind:value={student.strand} data={strands}>
        <div class="lexend text-[12px]">
          Strands
        </div>
      </SelectField>
    </div>

    <!-- Year & Section -->
    <div class="flex items-center gap-x-2">
      <SelectField bind:value={student.year} width='135px' data={grade}>
        <div class="lexend text-[12px]">
          Year
        </div>
      </SelectField>
      
      <SelectField bind:value={student.section} width='135px' data={selectedyear === '11' ? sectionsOf11 : sectionsOf12}>
        <div class="lexend text-[12px]">
          Section
        </div>
      </SelectField>
    </div>
  </div>

  <!-- ctas btn -->
  <div class="w-full flex flex-col justify-center items-center gap-y-2 mt-16">
    <button disabled={updatingData} on:click={updateData}>
      <PasokButton>
        {#if !updatingData}
          SAVE
        {:else}
          SAVING...
        {/if}
      </PasokButton>
    </button>
    
    {#if !updatingData}
      <a href="/{$page.params.username}/settings">
        <PasokButton v={4}>
          CANCEL
        </PasokButton>
      </a>
    {/if}
  </div>
</div>