<script>
  export let width = "100%"
  export let value = ''
</script>

<div class="w-[{width}] flex flex-col">
  <!-- label -->
  <slot>
    <div class="lexend text-[12px]">
      First Name
    </div>
  </slot>
  
  <input class="w-full h-[37px] rounded-lg pl-3 lexend text-xs" type='text' bind:value>
</div>