<template>
    <external-image v-if="isDev" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTm3JJVZNmoZ0qmayQ9ca8jzUA6LcvH7I5gZQ&usqp=CAU"/>
  <div v-else>
    <emily-event v-if="slideIndex===0"/>
    <img v-else :src="`/bild${slideIndex}.jpg`"
         class="object-cover h-full w-full"/>
  </div>
</template>
<script setup>
import ExternalImage from "~/components/external-image.vue";

const slideIndex = ref(0)
const maxSlide = 3
const nextSlide = () => {
  slideIndex.value = (slideIndex.value + 1) % maxSlide
}

const isDev = new Date() < new Date('2024-02-13')

if (isDev) {
  setInterval(nextSlide, 1000)
} else {
  setInterval(nextSlide, 30000)
}
</script>
