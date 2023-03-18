<script>
// @ts-nocheck

  import { page } from '$app/stores'
	import PasokButton from "$lib/components/PasokButton.svelte";
	import PasokIcon from "$lib/components/PasokIcon.svelte";
  import { mdiLogout } from '@mdi/js'
  import QrCode from 'svelte-qrcode'

  /**
   * @type {import('./$types').PageServerData}
   */
  export let data

  function downloadimage() {
    let pic = document.getElementById("pic")
    html2canvas(pic, { allowTaint: true }).then(function (canvas) {

    var link = document.createElement("a")
    document.body.appendChild(link);
    link.download = `${data.student.firstName} ${data.student.middleName.charAt(0)} ${data.student.lastName} PasoKode QR.jpg`
    link.href = canvas.toDataURL()
    link.target = '_blank'
    link.click()
    });
  }

</script>

<svelte:head>
  <title>{$page.params.username} | QR Code</title>
  <script src="https://html2canvas.hertzen.com/dist/html2canvas.js"></script>
</svelte:head>

<div class="w-full h-full flex flex-col items-center justify-between pb-10">

  <!-- headers -->
  <div class="w-full flex items-center justify-between pt-3 px-3">
    <div class="w-[128px] flex items-center gap-x-3">
      <!-- logo -->
      <div class="bg-pasoKodeBanner bg-[length:150px_75px] w-[150px] h-[75px] flex-shrink-0" />
    </div>

    <a href="/login">
      <div class="flex items-center gap-x-1 hover:gap-x-4 transition-all duration-500 ease-in-out group">
        <div class="fredoka transition-all duration-500 ease-in-out font-semibold text-sm md:text-base lg:text-lg group-hover:text-paleRed">
          Logout
        </div>
  
        <PasokIcon svgClass='group-hover:fill-paleRed transition-all duration-500 ease-in-out' size={20} path={mdiLogout} />
      </div>
    </a>
  </div>

  <div id='pic' class="w-fit flex flex-col items-center mt-10">
    <!-- QR CODE -->
    <div class="w-[282px] aspect-square bg-black shadow-lg rounded-lg overflow-hidden">
      <QrCode size={282} value="{data.qrValue}" />
    </div>

    <!-- full name -->
    <div class="fredoka font-semibold text-[20px] mt-2">
      {data.student.firstName} {data.student.middleName !== '' ? `${data.student.middleName.charAt(0)}.` : ''} {data.student.lastName}
    </div>

    <!-- strand year and section -->
    <div class="fredoka font-semibold text-[18px] mb-3">
      {data.student.strand} {data.student.year} - {data.student.section}
    </div>
  </div>

  <div class="w-full flex flex-col items-center mt-10 gap-y-2">
    <a href="/{$page.params.username}/settings">
      <PasokButton>
        Settings
      </PasokButton>
    </a>
    
    <button on:click={downloadimage}>
      <PasokButton v={3}>
        Download QR
      </PasokButton>
    </button>
  </div>
</div>