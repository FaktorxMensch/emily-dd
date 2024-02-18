<template>
  <div v-if="event?.titel">
    <h1 style="position:absolute;top:61.8%;left:68.4%;font-size:17em;transform:rotate(10deg);color:white;z-index:200">
      SCHULUNG</h1>

    <img src="/emily_bg.svg"
         class="object-cover h-full w-full absolute top-0 left-0" style="z-index:1;"/>
    <img
        :src="featureImage"
        class="object-cover h-full" style="width:38%;position:absolute;bottom:0;right:0;z-index:0;"/>

    <div
        style="position:absolute;overflow:hidden;z-index:2;width:64%;padding:3%;height:100%;top:0;left:0;display:flex;flex-direction:column;text-shadow: 0 5px 10px #0001;">
      <h1 style="color:white;font-size:24.5em;line-height:1;max-height:55vh;overflow:hidden;">
        {{ titleSanitized }}</h1>
      <h2 style="color:white;font-size:10em;line-height:1;margin:1% 0">{{ event.datum }}</h2>
      <div style="flex:1"></div>
      <div class="flex gap-10">
        <img :src="generateQRCodeUrl()" alt="QR Code" style="height:16em;align-self:start;mix-blend-mode: screen;"/>
        <h2 style="color:white;font-size:8.5em;line-height:1">*Anmeldung unter <br/>
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

const featureImage = computed(() => {
  return '/placeholder/bg' + Math.ceil(Math.random() * 5) + '.jpeg'
  // return event.value.bild_url
})
const titleSanitized = computed(() => {
  let titel = event.value.titel

  // filter html encoded characters like &auml; to ä but also &#39; and 	&#8211; and #
  titel = titel.replace(/&[a-zA-Z0-9#]+;/g, (match) => {
    const el = document.createElement('div')
    el.innerHTML = match
    return el.innerText
  })

  // erlaube alles was a-z, A-Z, 0-9, ÄÜÖßäüö, und Leerzeichen ist
  return titel.replace(/[^a-zA-Z0-9ÄÜÖßäüö ]/g, '')
})

onMounted(async () => {
  // versuche das aus dem local storage zu holen
  try {
    const cachedEvent = localStorage.getItem('emily-event')
    if (cachedEvent && cachedEvent !== 'undefined') {
      console.log('found cached event', cachedEvent)
      let d = JSON.parse(cachedEvent)
      event.value = d[Math.floor(Math.random() * d.length)]
    }
  } catch (e) {
    console.log('could not parse cached event')
    console.error(e)
  }

  /// versuche das datum aus dem local storage zu holen
  try {
    const refreshedAt = localStorage.getItem('refreshed_at_date')
    if (refreshedAt && refreshedAt !== 'undefined') {
      console.log('found cached date', refreshedAt)
      const refreshedAtDate = new Date(refreshedAt)
      const now = new Date()
      const diff = now - refreshedAtDate
      const hours = Math.floor(diff / 1000 / 60 / 60)
      console.log('hours since last refresh', hours)
      if (hours < 1) {
        console.log('refreshing too soon, not refreshing')
        return
      }
    }
  } catch (e) {
    console.log('could not parse cached date')
    console.error(e)
  }

  // hole das aus der api
  await fetch('https://emily.look-think-deliver.com/wp-json/mein-event-api/v1/naechste-termine')
      .then((res) => res.json())
      .then((data) => {
        console.log(data)
        // select a random element
        event.value = data[Math.floor(Math.random() * data.length)]

        // cache das im local storage
        localStorage.setItem('emily-event', JSON.stringify(data))
        // merke dir das datum
        localStorage.setItem('refreshed_at_date', new Date().toISOString())
      })
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
