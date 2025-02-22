<template>
  <div class="h-full w-full  overflow-hidden bg-black">
    <div
      class="relative z-0 h-full w-full mt-20 overflow-hidden [mask-image:radial-gradient(50%_50%,white,transparent)]"
    >
      <Particles
        :density="1200"
        class="absolute inset-x-0 bottom-0 h-full w-full [mask-image:radial-gradient(50%_50%,white,transparent_85%)]"
      />

      <div
        class="absolute inset-x-0 sm:-bottom-[65%] -bottom-[6%]  sm:h-full h-[30%] w-full rounded-[100%] bg-gradient-to-b from-white to-black"
      />
      <div
        class="absolute inset-x-0 sm:-bottom-[65.2%] -bottom-[6.2%] sm:h-full h-[30%] w-full rounded-[100%] bg-neutral-950 shadow-[inset_0_2px_20px_#fff,0_-10px_50px_1px_#ffffff7d]"
      />
    </div>
  </div>
</template>

<script setup>
  import Particles from './components/slim'
</script>