// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  ssr: false,
  modules: ['@nuxtjs/ionic', '@nuxtjs/tailwindcss', '@nuxtjs/supabase', '@pinia/nuxt', '@nuxt/image-edge', '@nuxt/devtools', '@vueuse/nuxt'],
  ionic: {
    css: {
      utilities: true,
    },
  },
  app: {
    head: {
      meta: [
        {
          name: 'viewport',
          content: 'width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no, minimal-ui',
        },
        {
          name: 'color-scheme',
          content: 'dark',
        },
      ],
    },
  },
  tailwindcss: {
    cssPath: '@/assets/css/tailwind.css',
  },
  pinia: {
    autoImports: ['defineStore', ['defineStore', 'definePiniaStore']],
  },
  alias: {
    pinia: '/node_modules/@pinia/nuxt/node_modules/pinia/dist/pinia.mjs',
  },
})
