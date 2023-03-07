<script>
  export let width = '100%'
  export let data = ['Male', 'Female']
  export let value = data[0]
  export let disabled = false
</script>

<div class="flex flex-col">
  <!-- label -->
  <slot>
    <div class="lexend text-[12px]">
      Sex
    </div>
  </slot>
  
  <select {disabled} bind:value class="w-[{width}] h-[37px] rounded-lg lexend text-xs">
    {#each data as d}
      <option value='{d}'>{d}</option>
    {/each}
  </select>
</div>