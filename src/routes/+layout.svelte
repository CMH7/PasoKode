<script>
  import "../app.css";
</script>

<div class="w-screen h-screen bg-gradient-to-b from-skyBlue/90 to-white relative">
  <div class="w-full h-full bg-pasoLogo bg-[length:500px_500px] bg-center bg-no-repeat bg-transparent absolute -z-10 top-0 left-0" />
  <div class="w-full h-full bg-pasoSchool bg-cover bg-center bg-no-repeat absolute -z-20 top-0 left-0" />
  <slot />
</div>