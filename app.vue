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
// if its before 20. feb, reload every 1 second
if (new Date() < new Date('2024-02-20')) {
  setInterval(nextSlide, 1000)
} else {
  setInterval(nextSlide, 30000)
}
</script>
