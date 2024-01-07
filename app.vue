<template>
  <div>
    <emily-event v-if="slideIndex===0"/>
    <img v-else :src="`/bild${slideIndex}.jpg`"
         class="object-cover h-full w-full"/>
  </div>
</template>
<script setup>
const slideIndex = ref(0)
const maxSlide = 3
const nextSlide = () => {
  slideIndex.value = (slideIndex.value + 1) % maxSlide
}
setInterval(nextSlide, 30000)
// reload the page every hour
setTimeout(() => {
  window.location.reload()
}, 60 * 60 * 1000)
</script>
