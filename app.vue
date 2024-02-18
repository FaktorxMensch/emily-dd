<template>
  <div>
    <emily-event v-if="slideIndex===0"/>
    <img v-else-if="slideIndex<maxInternalSlide" :src="`/bild${slideIndex}.jpg`"
         class="object-cover h-full w-full"/>
    <external-image v-else :src="externalImages[slideIndex - maxInternalSlide]"/>
  </div>
</template>
<script setup>
const slideIndex = ref(0)
const maxInternalSlide = 3
const maxSlide = computed(() => maxInternalSlide + externalImages.value.length)
const nextSlide = () => {
  slideIndex.value = (slideIndex.value + 1) % maxSlide.value
}

const isDev = new Date() < new Date('2024-02-19')

if (isDev) {
  setInterval(nextSlide, 1000)
} else {
  setInterval(nextSlide, 30000)
}

// TODO: here later just add image urls and they will be loaded and displayed
const externalImages = ref([])
</script>
