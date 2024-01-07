<template>
  <div v-if="event.titel">
    <h1 style="position:absolute;top:62%;left:68%;font-size:1200%;transform:rotate(10deg);color:white;z-index:200">
      SCHULUNG</h1>

    <img src="/emily_bg.png"
         class="object-cover h-full w-full absolute top-0 left-0" style="z-index:1;"/>
    <img
        :src="event.bild_url"
        class="object-cover h-full" style="width:38%;position:absolute;bottom:0;right:0;z-index:0;"/>

    <div
        style="position:absolute;overflow:hidden;z-index:2;width:64%;padding:3%;height:100%;top:0;left:0;display:flex;flex-direction:column;text-shadow: 0 5px 10px #0005;">
      <h1 style="color:white;font-size:11.5em;line-height:1;max-height:55vh;overflow:hidden;">
        {{ event.titel }}</h1>
      <h2 style="color:white;font-size:6em;line-height:1;margin:1% 0">{{ event.datum }}</h2>
      <div style="flex:1"></div>
      <div class="flex gap-10">
        <img :src="generateQRCodeUrl()" alt="QR Code" style="height:180px;align-self:start;mix-blend-mode: screen;"/>
        <h2 style="color:white;font-size:6em;line-height:1">*Anmeldung unter <br/>
          <span style="color:#a00">emily.look-think-deliver.com</span>
        </h2>
      </div>
    </div>
  </div>
</template>
<script setup>
const event = ref({
  titel: '',
  datum: '',
  bild_url: '',
  link: ''
})

onMounted(async () => {
  // versuche das aus dem local storage zu holen
  const cachedEvent = localStorage.getItem('emily-event.vue')
  if (cachedEvent) {
    event.value = JSON.parse(cachedEvent)
  }
  // hole das aus der api
  await fetch('https://emily.look-think-deliver.com/wp-json/mein-event-api/v1/naechste-termine')
      .then((res) => res.json())
      .then((data) => {
        console.log(data)
        event.value = data[0]
      })
  // cache das im local storage
  localStorage.setItem('emily-event.vue', JSON.stringify(event.value))
})

const generateQRCodeUrl = () => {
  const baseUrl = 'https://chart.googleapis.com/chart';
  const params = new URLSearchParams({
    cht: 'qr',    // QR Code Typ
    chs: '150x150',  // Größe des QR Codes
    chld: 'L|0',    // QR Code Fehlerkorrekturlevel und Randgröße
    // chco: 'aa0000',  // Farbe des QR Codes (Rot)
    // chf: 'bg,s,00000000',  // Hintergrundfarbe des QR Codes (Transparent)
    chl: event.value.link     // Der Link, der im QR Code enthalten sein soll
  });
  return `${baseUrl}?${params.toString()}`;
}

</script>
<style>
body {
  background: #93B13A
}
@font-face {
  font-family: 'Emily';
  src: url('/emily.ttf') format('truetype');
  font-weight: normal;
  font-style: normal;
}

h1, h2 {
  font-family: 'Emily', sans-serif;
  font-weight: normal;
  margin: 0;
}
</style>
