<script>
	import { applyAction, deserialize, enhance } from '$app/forms';
	import { goto, invalidateAll } from '$app/navigation';
  import { page } from '$app/stores'
	import PasokButton from "$lib/components/PasokButton.svelte";

  /**
   * @type {import('./$types').PageServerData}
   */
  export let data

  let nP1Err = false
  let nP2Err = false
  let nP1ErrMsg = ''
  let nP2ErrMsg = ''
  let nPass = ''
  let nPass2 = ''
  let changingPass = false

  $: studentID = data.student?.id

  const resetPass = async () => {
    if (changingPass) return
    changingPass = true

    if(nPass === '') {
      nP1Err = true
      nP1ErrMsg = 'Password cannot be empty'
    }else{
      nP1Err = false
    }

    if(nPass2 === '') {
      nP2Err = true
      nP2ErrMsg = 'Confirm your password'
    } else {
      nP2Err = false
    }

    if(nPass2 !== nPass) {
      nP2Err = true
      nP2ErrMsg = 'Password does not match'
    } else {
      nP2Err = false
    }

    if(nP1Err || nP2Err) {
      changingPass = false
      return
    }
    
    let form = document.getElementById('formResetPass')
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
    changingPass = false
  }

  const keydown = (/** @type {{ keyCode: number; }} */ e) => {
    if (e.keyCode == 13) {
      resetPass()
    }
  }

</script>

<svelte:head>
  <title>{$page.params.uName} | Update Password</title>
</svelte:head>

<svelte:window on:keydown={keydown} />

<form
  id='formResetPass'
  class="hidden"
  action="?/resetPass"
  method="post"
  use:enhance
>
  <input name='id' type="text" bind:value={studentID}>
  <input name='nPass' type="text" bind:value={nPass}>
</form>

<div class="w-full h-full flex flex-col items-center gap-y-5">
  <!-- header logo -->
  <div class="w-full flex justify-center items-center pt-3 gap-3">
    <!-- logo -->
    <div class="rounded-full w-[42px] aspect-square bg-primary" />

    <!-- title  -->
    <div class="fredoka font-bold text-paleBlue text-[16px]">
      PasoKode
    </div>
  </div>

  <!-- headings -->
  <div class="w-full flex justify-center items-center mt-16">
    <div class="text-[32px] font-bold fredoka">
      UPDATE PASSWORD
    </div>
  </div>

  <!-- body -->
  <div class="w-full flex flex-col items-center gap-y-3 mt-10">
    <!-- password 1 -->
    <div class="w-[206px] flex flex-col">
      <!-- label -->
      <div class="lexend text-[12px]">
        New Password
      </div>
      
      <input bind:value={nPass} class="w-full h-[37px] rounded-lg pl-3 lexend text-xs" type='text'>
      {#if nP1Err}
        <div class="lexend text-paleRed text-[10px]">
          {nP1ErrMsg}
        </div>
      {/if}
    </div>
    
    <!-- password 2 -->
    <div class="w-[206px] flex flex-col">
      <!-- label -->
      <div class="lexend text-[12px]">
        Confirm Password
      </div>
      
      <input bind:value={nPass2} class="w-full h-[37px] rounded-lg pl-3 lexend text-xs" type='text'>
      {#if nP2Err}
        <div class="lexend text-paleRed text-[10px]">
          {nP2ErrMsg}
        </div>
      {/if}
    </div>
  </div>

  <div class="w-full flex flex-col justify-center items-center gap-y-2 mt-20">
    <button on:click={resetPass}>
      <PasokButton>
        {#if !changingPass}
          SAVE
        {:else}
          SAVING...
        {/if}
      </PasokButton>
    </button>
    
    {#if !changingPass}
      <a href="/resetPass">
        <PasokButton v={4}>
          CANCEL
        </PasokButton>
      </a>
    {/if}
  </div>
</div>