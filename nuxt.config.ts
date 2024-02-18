// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: false },
  modules: ["@nuxtjs/tailwindcss"],
  app:{
    //i need heavy caching in the pages header:
    head: {
        title: "My App",
        meta: [
            { charset: "utf-8" },
            { name: "viewport", content: "width=device-width, initial-scale=1" },
            { hid: "description", name: "description", content: "My App" },
            { hid: "cache-control", "http-equiv": "Cache-Control", content: "public, max-age=31536000, immutable" },
            { hid: "expires", "http-equiv": "Expires", content: "31536000" },
            { hid: "pragma", "http-equiv": "Pragma", content: "public" },

        ],
        link: [{ rel: "icon", type: "image/x-icon", href: "/favicon.ico" }],
    }
  }
})
