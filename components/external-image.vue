<template>
  <div class="h-full w-full inset-0 fixed"
       style="background:url('/bild2.jpg');background-size:cover;background-position:center;"></div>
  <div class="h-full w-full inset-0 fixed"
       :style="'background:url(' + src + '); background-size:cover;background-position:center;'"></div>
</template>
<script setup>
// const tryExternalImage = computed(() => {
//   return '/placeholder/bg' + Math.ceil(Math.random() * 5) + '.jpeg'
// })

const props = defineProps(['src'])
</script>
