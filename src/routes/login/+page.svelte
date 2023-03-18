<script>
	import { applyAction, deserialize, enhance } from "$app/forms";
	import { goto, invalidateAll } from "$app/navigation";
	import PasokButton from "../../lib/components/PasokButton.svelte";

  let uName = ''
  let pWord = ''
  let uNameErrMsg = ''
  let pWordErrMsg = ''

  let uNameErr = false
  let pWordErr = false
  let loggingIn = false


  const login = async () => {
    uNameErr = false
    pWordErr = false

    if (loggingIn) return
    loggingIn = true

    if(uName === '') {
      uNameErr = true
      uNameErrMsg = 'Username cannot be empty'
    }
    
    if(pWord === '') {
      pWordErr = true
      pWordErrMsg = 'Password cannot be empty'
    }

    if(uNameErr || pWordErr) return
    
    let form = document.getElementById('formLogin')
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
      if(result.data?.reason === 'x-pword') {
        pWordErr = true
        pWordErrMsg = 'Password is incorrect'
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
    loggingIn = false
  }

  const keydown = (/** @type {{ keyCode: number; }} */ e) => {
    if(e.keyCode == 13) {
      login()
    }
  }

</script>

<svelte:head>
  <title>PasoKode | Login</title>
</svelte:head>

<svelte:window on:keydown={keydown} />

<form
  id='formLogin'
  class="hidden"
  action="?/login"
  method="post"
  use:enhance
>
  <input name='uName' type="text" bind:value={uName}>
  <input name='pWord' type="text" bind:value={pWord}>
</form>

<div class="w-full h-full flex flex-col items-center gap-y-5">
  <!-- header logo -->
  <div class="w-full flex justify-center items-center pt-3 gap-3">
    <!-- logo -->
    <a href="/">
      <div class="bg-pasoKodeBanner bg-[length:150px_75px] w-[150px] h-[75px]" />
    </a>
  </div>

  <!-- headings -->
  <div class="w-full flex justify-center items-center mt-16">
    <div class="text-[32px] font-bold fredoka">
      LOGIN
    </div>
  </div>

  <!-- body -->
  <div class="w-full flex flex-col items-center gap-y-3 mt-10">
    <!-- username -->
    <div class="w-[206px] flex flex-col">
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
    
    <!-- Password 1 -->
    <div class="w-[206px] flex flex-col">
      <!-- label -->
      <div class="lexend text-[12px]">
        Password
      </div>
      
      <input bind:value={pWord} class="w-full h-[37px] rounded-lg pl-3 lexend text-xs" type='password'>
      {#if pWordErr}
        <div class="lexend text-paleRed text-[10px]">
          {pWordErrMsg}
        </div>
        <div class="lexend text-[10px]">
          Forgot password? <a href="/resetPass"><span class="ml-1 text-paleBlue">Reset here</span></a>
        </div>
      {/if}
    </div>
  </div>

  <div aria-disabled="{loggingIn}" class="w-full flex flex-wrap justify-center items-center mt-20 gap-y-2">
    <PasokButton onClick={login}>
      {#if !loggingIn}
        LOGIN
      {:else}
        LOGGING IN...
      {/if}
    </PasokButton>

    {#if !loggingIn}
      <div class="w-full flex justify-center items-center lexend text-[10px]">
        No account? <a href="/signup"><span class="ml-1 text-paleBlue">Register here</span></a>
      </div>
    {/if}
  </div>
</div>