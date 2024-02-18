<template>
  <div>
    <emily-event v-if="slideIndex===0"/>
    <img v-else-if="slideIndex<maxInternalSlide" :src="`/bild${slideIndex}.jpg`" class="object-cover h-full w-full"/>
    <external-image v-else :src="externalImages[slideIndex - maxInternalSlide]"/>
  </div>
<!--  <div class="fixed top-0 left-0 text-8xl bg-black text-white" style="z-index:100000"> <h1>Slide: {{ slideIndex }}</h1> </div>-->
  <img src="/bild2.jpg" class="object-cover h-full w-full fixed inset-0 duration-500 transition-opacity"
       :class="showTransition ? 'opacity-100' : 'opacity-0'"
       style="z-index:100000;"/>
</template>
<script setup>
const slideIndex = ref(0)
const maxInternalSlide = 2 // dec to 2 from 3 because we overlay bild2.jpg for transtions
const maxSlide = computed(() => maxInternalSlide + externalImages.value.length)

const showTransition = ref(false)
const nextSlide = async () => {
  showTransition.value = true
  setTimeout(async () => {
    slideIndex.value = (slideIndex.value + 1) % maxSlide.value
  }, 500)

  setTimeout(async () => {
    showTransition.value = false
  }, 2200)
}

const isDev = new Date() < new Date('2024-02-17')

if (isDev) {
  setInterval(nextSlide, 5000)
} else {
  setInterval(nextSlide, 30000)
}

// TODO: here later just add image urls and they will be loaded and displayed
const externalImages = ref([])
</script>
