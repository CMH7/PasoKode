<script>
  export let onClick = () => {}
  export let v = 1
</script>

<button on:click={onClick} class="w-[166px] transition-all duration-500 ease-in-out {v == 1 ? 'bg-primary text-white hover:bg-white hover:text-primary hover:border-[1px] hover:border-primary' : v == 4 ? 'bg-paleRed text-white hover:bg-red-900' : 'bg-white text-primary'} {v == 3 ? 'border-[1px] border-primary hover:border-none hover:bg-primary hover:text-white' : ''} h-[37px] rounded-3xl flex justify-center items-center lexend text-[14px]">
  <slot />
</button>