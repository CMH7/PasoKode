<script>
  export let onClick = () => {}
  export let v = 1
</script>

<button on:click={onClick} class="w-[166px] {v == 1 ? 'bg-primary text-white' : v == 4 ? 'bg-paleRed text-white' : 'bg-white text-primary'} {v == 3 ? 'border-[1px] border-primary' : ''} h-[37px] rounded-3xl flex justify-center items-center lexend text-[14px]">
  <slot />
</button>