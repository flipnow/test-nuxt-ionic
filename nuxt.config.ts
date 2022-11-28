// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: ['@nuxtjs/ionic'],
  app: {
    head: {
      charset: 'utf-16',
      viewport: 'width=500, initial-scale=1',
      title: 'Default Title',
      meta: [
        { name: 'description', content: 'Default Description' }
      ],
    }
  }
})
