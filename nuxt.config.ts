// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  css: ['@/assets/stylesheets/base.scss'],
  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: '@import "@/assets/stylesheets/responsive.scss";',
        },
      },
    },
  },
  modules: ['@pinia/nuxt', '@nuxtjs/ionic'],
  ionic: {
    integrations: {
      meta: false,
      pwa: false, // overrides meta tags
    },
  },
  app: {
    head: {
      meta: [
        { name: 'description', content: 'Default Description' },
        { name: 'og:description', content: 'Default Description' },
      ],
    },
  },
  srcDir: 'src',
});
