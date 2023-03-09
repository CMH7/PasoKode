<script>
	import { applyAction, deserialize, enhance } from "$app/forms";
	import { goto, invalidateAll } from "$app/navigation";
	import PasokButton from "$lib/components/PasokButton.svelte";

  let uName = ''
  let uNameErr = false
  let uNameErrMsg = ''

  let finding = false

  const find = async () => {
    uNameErr = false
    if (finding) return
    finding = true

    if(uName === '') {
      uNameErr = true
      uNameErrMsg = 'Username cannot be empty'
    }

    if (uNameErr) return

    let form = document.getElementById('formFindUser')
    // @ts-ignore
    const data = new FormData(form);

    // @ts-ignore
    const response = await fetch(form.action, {
      method: 'POST',
      body: data
    });

    /** @type {import('@sveltejs/kit').ActionResult} */
    const result = deserialize(await response.text());

    if(result.type === 'failure') {
      if(result.data?.reason === 'x-uname') {
        uNameErr = true
        uNameErrMsg = 'Username cannot be found'
      }
    }

    if (result.type === 'redirect') {
      await goto(`/${uName}`)
    }

    if (result.type === 'success') {
      // re-run all `load` functions, following the successful update
      await invalidateAll();
    }

    applyAction(result);
    finding = false
  }
  
  const keydown = (/** @type {{ keyCode: number; }} */ e) => {
    if(e.keyCode == 13) {
      find()
    }
  }
</script>

<svelte:window on:keydown={keydown} />

<form
  id='formFindUser'
  class="hidden"
  action="?/findUser"
  method="post"
  use:enhance
>
  <input name='uName' type="text" bind:value={uName}>
</form>

<div class="w-full h-full flex flex-col items-center gap-y-5">
  <div class="w-full flex justify-center items-center pt-3 gap-3">
    <!-- logo -->
    <div class="bg-pasoKodeBanner bg-[length:150px_75px] w-[150px] h-[75px] flex-shrink-0" />
  </div>

  <!-- headings -->
  <div class="w-full flex justify-center items-center mt-16">
    <div class="text-[32px] font-bold fredoka">
      FIND ACCOUNT
    </div>
  </div>

  <div class="w-[206px] flex flex-col mt-10">
    <!-- label -->
    <div class="lexend text-[12px]">
      Username
    </div>
    
    <input bind:value={uName} class="w-full h-[37px] rounded-lg pl-3 lexend text-xs" type='text'>
    {#if uNameErr}
      <div class="lexend text-paleRed text-[10px]">
        {uNameErrMsg}
      </div>
    {/if}
  </div>

  <div class="mt-5">
    <PasokButton onClick={find}>
      {#if !finding}
        Find user
      {:else}
        Finding user...
      {/if}
    </PasokButton>
  </div>
</div>