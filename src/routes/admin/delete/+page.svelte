<script>
	import { applyAction, deserialize, enhance } from "$app/forms";
	import { goto, invalidateAll } from "$app/navigation";
	import PasokButton from "$lib/components/PasokButton.svelte";


  let lastName = ''

  let deleting = false

  const deleteStudent = async () => {
    if (deleting) return
    deleting = true

    if(lastName === '') {
      deleting = false
      return
    }
    
    let form = document.getElementById('formDelete')
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
      await goto(`/admin`)
    }

    if (result.type === 'success') {
      // re-run all `load` functions, following the successful update
      await invalidateAll();
    }

    applyAction(result);
    deleting = false
  }

  //@ts-ignore
  const handleInput = (e) => {
    const input = e.target.value;
    const filteredInput = input.replace(/[^a-zA-ZÑñ-\s]/g, '');
    e.target.value = filteredInput;
  }
</script>

<form
  id='formDelete'
  class="hidden"
  action="?/delete"
  method="post"
  use:enhance
>
  <input type="text" name='ln' bind:value={lastName}>
</form>

<div class="w-full h-full flex flex-col justify-center items-center gap-4">
  <div class="w-[200px] flex flex-col">
    <!-- label -->
    <div class="lexend text-[12px]">
      Last Name
    </div>
    
    <input bind:value={lastName} on:input={handleInput} class="w-full h-[37px] rounded-lg pl-3 lexend text-xs" type='text'>
  </div>

  <PasokButton onClick={deleteStudent}>
    {#if deleting}
      Deleting...
    {:else}
      Delete
    {/if}
  </PasokButton>
</div>