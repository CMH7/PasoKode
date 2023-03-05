<script>
  import TextField from "../../../lib/components/TextField.svelte";
	import PasokButton from "../../../lib/components/PasokButton.svelte";

</script>

<svelte:head>
  <title>PasoKode | Sign Up</title>
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
  <div class="w-full flex justify-center items-center mt-10">
    <div class="text-[32px] font-bold fredoka">
      SIGN UP
    </div>
  </div>

  <!-- body -->
  <div class="w-full flex flex-col items-center gap-y-3">
    <!-- username -->
    <div class="w-[277px] flex flex-col">
      <!-- label -->
      <div class="lexend text-[12px]">
        Username
      </div>
      
      <input class="w-full h-[37px] rounded-lg pl-3 lexend text-xs" type='text'>
    </div>
    
    <!-- Password 1 -->
    <div class="w-[277px] flex flex-col">
      <!-- label -->
      <div class="lexend text-[12px]">
        Password
      </div>
      
      <input class="w-full h-[37px] rounded-lg pl-3 lexend text-xs" type='text'>
    </div>
    
    <!-- Password 2 -->
    <div class="w-[277px] flex flex-col">
      <!-- label -->
      <div class="lexend text-[12px]">
        Confirm password
      </div>
      
      <input class="w-full h-[37px] rounded-lg pl-3 lexend text-xs" type='text'>
    </div>
  </div>

  <div class="w-full flex justify-center items-center mt-20">
    <a href="/login">
      <PasokButton>
        Submit
      </PasokButton>
    </a>
  </div>
</div>