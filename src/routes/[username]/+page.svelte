<script>
// @ts-nocheck

  import { page } from '$app/stores'
	import PasokButton from "$lib/components/PasokButton.svelte";
	import PasokIcon from "$lib/components/PasokIcon.svelte";
  import { mdiLogout } from '@mdi/js'
  import QrCode from 'svelte-qrCode'

  let fn = 'Charles Maverick'
  let mn = ''
  let ln = 'Herrera'
  let strand = 'STEM'
  let grade = '11'
  let section = 'Da Vinci'

</script>

<svelte:head>
  <title>{$page.params.username} | QR Code</title>
</svelte:head>

<div class="w-full h-full flex flex-col items-center justify-between pb-10">

  <!-- headers -->
  <div class="w-full flex items-center justify-between pt-3 px-3">
    <div class="w-[128px] flex items-center gap-x-3">
      <!-- logo -->
      <div class="rounded-full w-[42px] aspect-square bg-primary" />
  
      <!-- title  -->
      <div class="fredoka font-bold text-paleBlue text-[16px]">
        PasoKode
      </div>
    </div>

    <a href="/login">
      <div class="flex items-center gap-x-1">
        <div class="lexend text-xs">
          Logout
        </div>
  
        <PasokIcon size={20} path={mdiLogout} />
      </div>
    </a>
  </div>

  <div class="w-full flex flex-col items-center">
    <!-- QR CODE -->
    <div class="w-[282px] aspect-square bg-black shadow-lg">
      <QrCode size={282} value="asdf" />
    </div>

    <!-- full name -->
    <div class="fredoka font-semibold text-[20px] mt-2">
      {fn} {mn} {ln}
    </div>

    <!-- strand year and section -->
    <div class="fredoka font-semibold text-[18px]">
      {strand} {grade} - {section}
    </div>
  </div>

  <div class="w-full flex flex-col items-center mt-20 gap-y-2">
    <a href="/{$page.params.username}/settings">
      <PasokButton>
        Settings
      </PasokButton>
    </a>
    
    <a href="/cmh/settings">
      <PasokButton v={3}>
        Download QR
      </PasokButton>
    </a>
  </div>
</div>