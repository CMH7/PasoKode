<script>
  import { page } from '$app/stores'
  import SelectField from "$lib/components/SelectField.svelte";
	import PasokButton from "$lib/components/PasokButton.svelte";
	import PasokIcon from '$lib/components/PasokIcon.svelte';
	import {mdiChevronLeft } from '@mdi/js';

  const sex = ['Male', 'Female']
  const strands = ['STEM', 'ABM']
  const grade = ['11', '12']
  const sectionsOf11 = ['Orion', 'Leo', 'Morgan', 'Wedgwood']
  const sectionsOf12 = ['Da Vinci', 'Rembrandt', 'Beethoven', 'Mozart']

  /**
   * @type {import('./$types').PageServerData}
   */
  export let data

  $: student = {
    firstName: data.student?.firstName,
    middleName: data.student?.middleName,
    LastName: data.student?.lastName,
    strand: data.student?.strand,
    year: `${data.student?.year}`,
    section: data.student?.section,
    sex: data.student?.sex
  }
</script>

<svelte:head>
  <title>{$page.params.username} | Settings</title>
</svelte:head>

<div class="w-full h-full flex flex-col items-center gap-y-5">
  <!-- header logo -->
  <!-- headers -->
  <div class="w-full flex items-center justify-between pt-3 px-3">
    <a href="/{$page.params.username}">
      <div class="w-[128px] flex items-center gap-x-3">
        <!-- logo -->
        <div class="bg-pasoKodeBanner bg-[length:150px_75px] w-[150px] h-[75px] flex-shrink-0" />
      </div>
    </a>

    <a href="/{data.student?.username}">
      <div class="flex items-center gap-x-1 hover:gap-x-4 transition-all duration-500 ease-in-out">
        <PasokIcon size={20} path={mdiChevronLeft} />
        <div class="fredoka font-semibold text-sm md:text-base lg:text-lg">
          Back
        </div>
      </div>
    </a>
  </div>

  <!-- headings -->
  <div class="w-full flex justify-center items-center mt-5">
    <div class="text-[32px] font-bold fredoka">
      SETTINGS
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
        
        <input bind:value={student.firstName} readonly class="w-full h-[37px] rounded-lg pl-3 lexend text-xs" type='text'>
      </div>

      <div class="w-[135px] flex flex-col">
        <!-- label -->
        <div class="lexend text-[12px]">
          Middle Name
        </div>
        
        <input bind:value={student.middleName} readonly class="w-full h-[37px] rounded-lg pl-3 lexend text-xs" type='text'>
      </div>
    </div>
    
    <!-- LN & Sex -->
    <div class="flex items-center gap-x-2">
      <div class="w-[135px] flex flex-col">
        <!-- label -->
        <div class="lexend text-[12px]">
          Last Name
        </div>
        
        <input bind:value={student.LastName} readonly class="w-full h-[37px] rounded-lg pl-3 lexend text-xs" type='text'>
      </div>

      <SelectField disabled={true} width='135px' bind:value={student.sex} data={sex}>
        <div class="lexend text-[12px]">
          Sex
        </div>
      </SelectField>
    </div>

    <!-- strands -->
    <div class="w-full">
      <SelectField bind:value={student.strand} disabled={true} data={strands}>
        <div class="lexend text-[12px]">
          Strands
        </div>
      </SelectField>
    </div>

    <!-- Year & Section -->
    <div class="flex items-center gap-x-2">
      <SelectField disabled={true} bind:value={student.year} width='135px' data={grade}>
        <div class="lexend text-[12px]">
          Year
        </div>
      </SelectField>
      
      <SelectField disabled={true} bind:value={student.section} width='135px' data={student.year === '11' ? sectionsOf11 : sectionsOf12}>
        <div class="lexend text-[12px]">
          Section
        </div>
      </SelectField>
    </div>
  </div>

  <!-- next btn -->
  <div class="w-full flex flex-col items-center gap-y-2 mt-20">
    <a href="/{$page.params.username}/settings/edit">
      <PasokButton>
        EDIT
      </PasokButton>
    </a>
    
    <a href="/{$page.params.username}/settings/changePassword">
      <PasokButton v={3}>
        CHANGE PASSWORD
      </PasokButton>
    </a>
  </div>
</div>