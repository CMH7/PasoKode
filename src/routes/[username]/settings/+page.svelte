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

  let userData = {
    firstName: 'Charles Maverick',
    middleName: '',
    LastName: 'Herrera',
    strand: 'STEM',
    year: '12',
    section: 'Mozart'
  }
</script>

<svelte:head>
  <title>{$page.params.username} | Settings</title>
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
        
        <input bind:value={userData.firstName} readonly class="w-full h-[37px] rounded-lg pl-3 lexend text-xs" type='text'>
      </div>

      <div class="w-[135px] flex flex-col">
        <!-- label -->
        <div class="lexend text-[12px]">
          Middle Name
        </div>
        
        <input bind:value={userData.middleName} readonly class="w-full h-[37px] rounded-lg pl-3 lexend text-xs" type='text'>
      </div>
    </div>
    
    <!-- LN & Sex -->
    <div class="flex items-center gap-x-2">
      <div class="w-[135px] flex flex-col">
        <!-- label -->
        <div class="lexend text-[12px]">
          Last Name
        </div>
        
        <input bind:value={userData.LastName} readonly class="w-full h-[37px] rounded-lg pl-3 lexend text-xs" type='text'>
      </div>

      <SelectField disabled={true} width='135px' data={['Male', 'Female']}>
        <div class="lexend text-[12px]">
          Sex
        </div>
      </SelectField>
    </div>

    <!-- strands -->
    <div class="w-full">
      <SelectField disabled={true} data={strands}>
        <div class="lexend text-[12px]">
          Strands
        </div>
      </SelectField>
    </div>

    <!-- Year & Section -->
    <div class="flex items-center gap-x-2">
      <SelectField disabled={true} bind:value={selectedGrade} width='135px' data={grade}>
        <div class="lexend text-[12px]">
          Year
        </div>
      </SelectField>
      
      <SelectField disabled={true} bind:value={selectedSection} width='135px' data={selectedGrade === '11' ? sectionsOf11 : sectionsOf12}>
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