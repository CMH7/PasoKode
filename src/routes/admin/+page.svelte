<script>
	import PasokButton from "$lib/components/PasokButton.svelte";

</script>
<div class="w-full h-full flex flex-col justify-center items-center gap-14">
  <a href="/admin/students">
    <PasokButton>
      List of all students
    </PasokButton>
  </a>
  <a href="/admin/delete">
    <PasokButton>
      delete student
    </PasokButton>
  </a>
</div>