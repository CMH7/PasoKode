<script>
	import PasokButton from "../lib/components/PasokButton.svelte";

</script>
<svelte:head>
  <title>PasoKode</title>
</svelte:head>

<div class="w-full h-full flex flex-col justify-center items-center gap-14">

  <!-- header -->
  <div class="flex flex-col items-center">
    <!-- Logo -->
    <div class="rounded-full bg-primary w-[104px] aspect-square" />
  
    <!-- title -->
    <div class='fredoka font-bold text-paleBlue text-[20px]'>
      PasoKode
    </div>
  </div>

  <!-- cta -->
  <div class="flex flex-col items-center gap-y-3">
    <!-- login btn -->
    <a href='/login'>
      <PasokButton>
        LOGIN
      </PasokButton>
    </a>

    <!-- signup btn -->
    <a href='/signup'>
      <PasokButton v={2}>
        SIGNUP
      </PasokButton>
    </a>

  </div>
</div>