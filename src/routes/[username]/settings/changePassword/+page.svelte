<script>
  import { page } from '$app/stores'
	import PasokButton from "$lib/components/PasokButton.svelte";

</script>

<svelte:head>
  <title>{$page.params.username} | Update Password</title>
</svelte:head>

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
      
      <input class="w-full h-[37px] rounded-lg pl-3 lexend text-xs" type='text'>
      <div class="lexend text-paleRed text-[10px]">
        Password cannot be empty
      </div>
    </div>
    
    <!-- password 2 -->
    <div class="w-[206px] flex flex-col">
      <!-- label -->
      <div class="lexend text-[12px]">
        Confirm Password
      </div>
      
      <input class="w-full h-[37px] rounded-lg pl-3 lexend text-xs" type='text'>
      <div class="lexend text-paleRed text-[10px]">
        Password does not match
      </div>
    </div>
  </div>

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