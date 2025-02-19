<template>
    <div
      :class="
        cn(
          'glass-border-button group bg-red/2  relative h-12 cursor-pointer shadow-sm shadow-black/2'
        )
      "
    >
      <div
        :class="
          cn(
            'glass-border absolute -left-[3px] -top-[3px] h-[calc(100%+6px)] w-[calc(100%+6px)] overflow-hidden  z-0',
            'after:content-[\'\'] after:w-full after:h-full after:absolute after:left-0 after:top-0  after:border-[0.5px] after:border-white/20'
          )
        "
      >
        <div
          class="animate-spin [animation-duration:5s] blur absolute left-[-42px] top-[-90px] aspect-square h-[30px] w-[150%]"
          :style="{
            background: conicGraident
          }"
        />
      </div>
  
      <div
        :class="
          cn(
            'z-10 inline-flex h-full w-full cursor-pointer items-center justify-center  px-8 py-1 font-medium',
            'bg-gradient-to-t from-(--body)  to-(--body) backdrop-blur-2xl',
            'group-hover:from-(--body) group-hover:to-(--body)'
          )
        "
      >
        <div
          class="flex items-center justify-center gap-2 transition-transform duration-100 text-white ease-in-out group-hover:scale-105 font-[DM_Sans]"
        >
          <slot />
        </div>
      </div>
      <div class="w-full h-full flex">
        <div>
            <Particles
              :density="200"
              class="absolute inset-x-0 bottom-[20%] z-5 h-[120%] w-[120%] [mask-image:radial-gradient(50%_50%,white,transparent_85%)]"
            />
        </div>
      </div>
    </div>
  </template>
  
  <script lang="ts" setup>
  import { colord } from 'colord';
  import { cn } from './lib/utils';
    import { toRefs,computed } from 'vue';
  import Particles from './slim.vue'
  const props = withDefaults(
    defineProps<{
      color: string
    }>(),
    { color: '#ffffff' }
  )
  
  const conicGraident = computed(() => {
    const alphaColor = colord(props.color).alpha(0.12).toRgbString()
    return `conic-gradient(from 90deg at 50% 50%, ${alphaColor} 0, ${alphaColor} 10%, ${props.color} 20%, ${alphaColor} 30%, ${alphaColor} 60%, ${props.color} 70%, ${alphaColor} 80%, ${alphaColor} 100%)`
  })
  </script>
  
  <style scoped></style>
  