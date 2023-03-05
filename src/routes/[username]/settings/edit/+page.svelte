<script>
  import { page } from '$app/stores'
  import SelectField from "$lib/components/SelectField.svelte";
	import PasokButton from "$lib/components/PasokButton.svelte";

  const sex = ['Male', 'Female']
  const strands = ['STEM', 'ABM']
  const grade = ['11', '12']
  const sectionsOf11 = ['Orion', 'Leo', 'Morgan', 'Wedgwood']
  const sectionsOf12 = ['Da Vinci', 'Rembrandt', 'Beethoven', 'Mozart']

  let selectedGrade = '11'

  $: selectedSection = selectedGrade === '11' ? sectionsOf11[0] : sectionsOf12[0]
  $: userData = {
    firstName: 'Charles Maverick',
    middleName: '',
    lastName: 'Herrera',
    strand: 'STEM',
    year: '12',
    section: 'Leo'
  }
</script>

<svelte:head>
  <title>{$page.params.username} | Edit data</title>
</svelte:head>

<div class="w-full h-full flex flex-col items-center gap-y-5">
  <!-- header logo -->
  <div class="w-full flex justify-center items-center pt-3 gap-x-3">
    <!-- logo -->
    <div class="rounded-full w-[42px] aspect-square bg-primary" />

    <!-- title  -->
    <div class="fredoka font-bold text-paleBlue text-[16px]">
      PasoKode
    </div>
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
        
        <input bind:value={userData.firstName} class="w-full h-[37px] rounded-lg pl-3 lexend text-xs" type='text'>
      </div>

      <div class="w-[135px] flex flex-col">
        <!-- label -->
        <div class="lexend text-[12px]">
          Middle Name
        </div>
        
        <input bind:value={userData.middleName} class="w-full h-[37px] rounded-lg pl-3 lexend text-xs" type='text'>
      </div>
    </div>
    
    <!-- LN & Sex -->
    <div class="flex items-center gap-x-2">
      <div class="w-[135px] flex flex-col">
        <!-- label -->
        <div class="lexend text-[12px]">
          Last Name
        </div>
        
        <input bind:value={userData.lastName} class="w-full h-[37px] rounded-lg pl-3 lexend text-xs" type='text'>
      </div>

      <SelectField width='135px' data={['Male', 'Female']}>
        <div class="lexend text-[12px]">
          Sex
        </div>
      </SelectField>
    </div>

    <!-- strands -->
    <div class="w-full">
      <SelectField data={strands}>
        <div class="lexend text-[12px]">
          Strands
        </div>
      </SelectField>
    </div>

    <!-- Year & Section -->
    <div class="flex items-center gap-x-2">
      <SelectField bind:value={userData.year} width='135px' data={grade}>
        <div class="lexend text-[12px]">
          Year
        </div>
      </SelectField>
      
      <SelectField bind:value={userData.section} width='135px' data={selectedGrade === '11' ? sectionsOf11 : sectionsOf12}>
        <div class="lexend text-[12px]">
          Section
        </div>
      </SelectField>
    </div>
  </div>

  <!-- ctas btn -->
  <div class="w-full flex flex-col justify-center items-center gap-y-2 mt-20">
    <a href="/{$page.params.username}/settings">
      <PasokButton>
        SAVE
      </PasokButton>
    </a>
    
    <a href="/{$page.params.username}/settings">
      <PasokButton v={4}>
        CANCEL
      </PasokButton>
    </a>
  </div>
</div>