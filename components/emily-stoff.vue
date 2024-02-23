<template>
  <div v-if="post?.featuredImageUrl">
    <h1 style="position:absolute;top:71%;left:64.4%;font-size:17em;transform:rotate(10deg);color:white;z-index:200">
      Jetzt Neu!</h1>

    <img src="/emily_fg.svg"
         class="object-cover h-full w-full absolute top-0 left-0" style="z-index:1;"/>
    <img
        :src="post.featuredImageUrl"
        class="object-cover h-full" style="width:80%;position:absolute;bottom:0;left:0;z-index:0;"/>
    <div
        style="position:absolute;overflow:hidden;z-index:2;width:38%;padding:3%;height:100%;top:0;right:1%;display:flex;flex-direction:column;text-shadow: 0 5px 10px #0001;">
      <h1 style="color:white;font-size:17.5em;line-height:1;max-height:55vh;overflow:hidden;">Neu bei uns</h1>
      <h2 style="color:white;font-size:10em;height:50%;overflow:hidden;line-height:1;margin:2% 0">{{ titleSanitized }}</h2>
      <div style="flex:1"></div>

    </div>
  </div>
</template>
<script setup>
const post = ref(null)

const titleSanitized = computed(() => {
  let titel = post.value.postContent
  // stripe all tags
  titel = titel.replace(/<[^>]+>/g, '')
  titel = titel.replace(/&[a-zA-Z0-9#]+;/g, (match) => {
    const el = document.createElement('div');
    el.innerHTML = match;
    return el.innerText
  })
  return titel.replace(/[^a-zA-Z0-9ÄÜÖßäüö ]/g, '')
})

onMounted(async () => {

  const postId = 233; // Die ID Ihres Posts
  const url = `https://emily.look-think-deliver.com/wp-json/wp/v2/pages/${postId}`;

  // versuche das aus dem local storage zu holen
  try {
    const cachedSortiment = localStorage.getItem('emily-sortiment');
    if (cachedSortiment && cachedSortiment !== 'undefined') {
      console.log('found cached sortiment', cachedSortiment);
      post.value = JSON.parse(cachedSortiment);
    }
  } catch (error) {
    console.error("Fehler beim Abrufen des Posts:", error);
  }

  // Wenn nicht im local storage, dann von der API holen
  try {
    const response = await fetch(url);
    const postData = await response.json();

    console.log('postData', postData);

    post.value = {
      postTitle: postData.title.rendered,
      postContent: postData.content.rendered,
      featuredImageUrl: null
    }

    // URL des Feature-Images
    if (postData.featured_media) {
      const mediaResponse = await fetch(`https://emily.look-think-deliver.com/wp-json/wp/v2/media/${postData.featured_media}`);
      const mediaData = await mediaResponse.json();
      post.value.featuredImageUrl = mediaData.source_url;

      // im local storage speichern
      localStorage.setItem('emily-sortiment', JSON.stringify(post.value));
    }

  } catch (error) {
    console.error("Fehler beim Abrufen des Posts:", error);
  }

})


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
