<script>
  import SelectField from "../../lib/components/SelectField.svelte";
	import PasokButton from "../../lib/components/PasokButton.svelte";
	import { applyAction, deserialize, enhance } from "$app/forms";
	import { goto, invalidateAll } from "$app/navigation";

  const sex = ['Male', 'Female']
  const strands = ['STEM', 'ABM']
  const grade = ['11', '12']
  const sectionsOf11 = ['Orion', 'Leo', 'Morgan', 'Wedgwood']
  const sectionsOf11ABM = ['Morgan', 'Wedgwood']
  const sectionsOf11STEM = ['Orion', 'Leo']
  const sectionsOf12 = ['Da Vinci', 'Rembrandt', 'Beethoven', 'Mozart']
  const sectionsOf12ABM = ['Da Vinci', 'Rembrandt']
  const sectionsOf12STEM = ['Beethoven', 'Mozart']

  let registering = false
  let step = 1

  let student = {
    firstName: '',
    middleName: '',
    lastName: '',
    sex: '',
    strand: '',
    year: '',
    section: '',
    username: '',
    password: ''
  }

  let uNameErr = false
  let uNameErrMsg = ''
  let nP1Err = false
  let nP1ErrMsg = ''
  let nP2Err = false
  let nP2ErrMsg = ''
  let nP2 = ''

  const register = async () => {
    uNameErr = false
    uNameErrMsg = ''
    nP1Err = false
    nP1ErrMsg = ''
    nP2Err = false
    nP2ErrMsg = ''

    if (registering) return
    registering = true

    if(student.firstName === '' || student.lastName === '' || student.sex === '' || student.strand === '' || student.year === '' || student.section === '') {
      step = 1
      registering = false
      return
    }

    if (student.username === '') {
      uNameErr = true
      uNameErrMsg = 'Username cannot be empty'
    }
    
    if (student.password === '') {
      nP1Err = true
      nP1ErrMsg = 'Password cannot be empty'
    }
    
    if (student.password !== nP2) {
      nP2Err = true
      nP2ErrMsg = 'Password does not match'
    }

    if (nP1Err || nP2Err) {
      registering = false
      return
    }

    if ( student.lastName.charAt(student.lastName.length - 1) === ' ' ) {
      student.lastName = student.lastName.substring(0, student.lastName.length - 1)
    }
    if ( student.middleName.charAt(student.middleName.length - 1) === ' ' ) {
      student.middleName = student.middleName.substring(0, student.middleName.length - 1)
    }
    if ( student.firstName.charAt(student.firstName.length - 1) === ' ' ) {
      student.firstName = student.firstName.substring(0, student.firstName.length - 1)
    }
    if ( student.username.charAt(student.username.length - 1) === ' ' ) {
      student.username = student.username.substring(0, student.username.length - 1)
    }
    
    let form = document.getElementById('formRegister')
    // @ts-ignore
    const data = new FormData(form);

    // @ts-ignore
    const response = await fetch(form.action, {
      method: 'POST',
      body: data
    });

    /** @type {import('@sveltejs/kit').ActionResult} */
    const result = deserialize(await response.text());

    if (result.type === 'failure') {

    }

    if (result.type === 'redirect') {
      await goto(`/login`)
    }

    if (result.type === 'success') {
      // re-run all `load` functions, following the successful update
      await invalidateAll();
    }

    applyAction(result);
    registering = false
  }

  const keydown = (/** @type {{ keyCode: number; }} */ e) => {
    if(e.keyCode == 13) {
      register()
    }
  }

  /**
   * This code is a function called handleInput that takes in an event (e) as an argument. The function then stores the value of the event target in a variable called input. It then uses a regular expression to filter out any characters that are not letters or whitespace from the input variable and stores it in another variable called filteredInput. Finally, it sets the value of the event target to be equal to the filteredInput variable. This code is useful for ensuring that only letters and whitespace are accepted as valid input.
   * @param {any} e
   */
  const handleInput = (e) => {
    const input = e.target.value;
    const filteredInput = input.replace(/[^a-zA-ZÑñ-\s]/g, '');
    e.target.value = filteredInput;
  }
</script>

<svelte:head>
  <title>PasoKode | Sign Up</title>
</svelte:head>

<form
  id='formRegister'
  class="hidden"
  action="?/register"
  method="post"
  use:enhance
>
  <input name='fn' type="text" bind:value={student.firstName}>
  <input name='mn' type="text" bind:value={student.middleName}>
  <input name='ln' type="text" bind:value={student.lastName}>
  <input name='sex' type="text" bind:value={student.sex}>
  <input name='strand' type="text" bind:value={student.strand}>
  <input name='year' type="text" bind:value={student.year}>
  <input name='section' type="text" bind:value={student.section}>
  <input name='uName' type="text" bind:value={student.username}>
  <input name='pWord' type="text" bind:value={student.password}>
</form>

<svelte:window on:keydown={keydown} />

<div class="w-full h-full flex flex-col items-center gap-y-5">
  <!-- header logo -->
  <div class="w-full flex justify-center items-center pt-3 gap-x-3">
    <!-- logo -->
    <a href="/">
      <div class="bg-pasoKodeBanner bg-[length:150px_75px] w-[150px] h-[75px] flex-shrink-0" />
    </a>
  </div>

  <!-- headings -->
  <div class="w-full flex justify-center items-center mt-10">
    <div class="text-[32px] font-bold fredoka">
      SIGN UP
    </div>
  </div>

  {#if step == 1}
  <!-- body -->
  <div class="flex flex-col items-center gap-y-3">
    <!-- FN & MN -->
    <div class="flex items-center gap-x-2">
      
      <div class="w-[135px] flex flex-col">
        <!-- label -->
        <div class="lexend text-[12px]">
          First Name
        </div>
        
        <input bind:value={student.firstName} on:input={handleInput} class="w-full h-[37px] rounded-lg pl-3 lexend text-xs" type='text'>
      </div>

      <div class="w-[135px] flex flex-col">
        <!-- label -->
        <div class="lexend text-[12px]">
          Middle Name
        </div>
        
        <input bind:value={student.middleName} on:input={handleInput} class="w-full h-[37px] rounded-lg pl-3 lexend text-xs" type='text'>
      </div>
    </div>
    
    <!-- LN & Sex -->
    <div class="flex items-center gap-x-2">
      <div class="w-[135px] flex flex-col">
        <!-- label -->
        <div class="lexend text-[12px]">
          Last Name
        </div>
        
        <input bind:value={student.lastName} on:input={handleInput} class="w-full h-[37px] rounded-lg pl-3 lexend text-xs" type='text'>
      </div>

      <SelectField bind:value={student.sex} width='135px' data={sex}>
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
      
      <SelectField bind:value={student.section} width='135px' data={student.year === '' ? [] : student.year === '11' && student.strand === 'ABM' ? sectionsOf11ABM : student.year === '12' && student.strand === 'ABM' ? sectionsOf12ABM : student.year === '11' && student.strand === 'STEM' ? sectionsOf11STEM : student.year === '12' && student.strand === 'STEM' ? sectionsOf12STEM : []}>
        <div class="lexend text-[12px]">
          Section
        </div>
      </SelectField>
    </div>
  </div>
  {:else}
  <div class="w-full flex flex-col items-center gap-y-3">
    <!-- username -->
    <div class="w-[277px] flex flex-col">
      <!-- label -->
      <div class="lexend text-[12px]">
        Username
      </div>
      
      <input bind:value={student.username} class="w-full h-[37px] rounded-lg pl-3 lexend text-xs" type='text'>
      {#if uNameErr}
        <div class="lexend text-paleRed text-[10px]">
          {uNameErrMsg}
        </div>
      {/if}
    </div>
    
    <!-- Password 1 -->
    <div class="w-[277px] flex flex-col">
      <!-- label -->
      <div class="lexend text-[12px]">
        Password
      </div>
      
      <input bind:value={student.password} class="w-full h-[37px] rounded-lg pl-3 lexend text-xs" type='password'>
      {#if nP1Err}
        <div class="lexend text-paleRed text-[10px]">
          {nP1ErrMsg}
        </div>
      {/if}
    </div>
    
    <!-- Password 2 -->
    <div class="w-[277px] flex flex-col">
      <!-- label -->
      <div class="lexend text-[12px]">
        Confirm password
      </div>
      
      <input bind:value={nP2} class="w-full h-[37px] rounded-lg pl-3 lexend text-xs" type='password'>
      {#if nP2Err}
        <div class="lexend text-paleRed text-[10px]">
          {nP2ErrMsg}
        </div>
      {/if}
    </div>
  </div>
  {/if}

  <!-- next btn -->
  <div class="w-full flex flex-col items-center gap-y-2 mt-20">
    <button disabled={registering} on:click={() => {
      if(step == 1) {
        step = 2
        return
      }
      if(step == 2) {
        register()
      }
    }}>
      <PasokButton>
        {#if step == 1}
          Next
        {:else}
          {#if !registering}
            Register
          {:else}
            Registering...
          {/if}  
        {/if}
      </PasokButton>
    </button>
    {#if step == 2}
      {#if !registering}
        <button on:click={() => {step = 1}}>
          <PasokButton v={3}>
            Back
          </PasokButton>
        </button>
      {/if}
    {/if}
  </div>
</div>