<script>
  let klass = '';
  let kstyle = '';
  export { klass as class };
  export { kstyle as style };
  export let size = 24;
  export let width = size;
  export let height = size;
  export let viewWidth = '24';
  export let viewHeight = '24';
  export let path = '';
  export let svgClass = '';
  $: {
    width = size;
    height = size;
  }
</script>

<style>
  .s-icon {
    line-height: 1;
    letter-spacing: normal;
    text-transform: none;
    display: inline-flex;
    font-feature-settings: 'liga';
    justify-content: center;
    position: relative;
    align-items: center;
    text-indent: 0;
    vertical-align: middle;
    cursor: inherit;
    user-select: none;
    direction: ltr;
    transition: 0.3s cubic-bezier(0.25, 0.8, 0.5, 1), visibility 0s;
  }
</style>

<i
  aria-hidden="true"
  class="s-icon {klass}"
  style='font-size: {size}px; {kstyle}'>
  {#if path !== ''}
    <svg
      class='transition-all {svgClass}'
      xmlns="http://www.w3.org/2000/svg"
      {width}
      {height}
      viewBox="0 0 {viewWidth} {viewHeight}"
    >
      <path d={path}>
      </path>
    </svg>
  {/if}
  <slot />
</i>