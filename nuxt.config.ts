import { defineNuxtConfig } from 'nuxt'

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  typescript: {
    strict: false,
  },
  css: ['~/src/assets/main.css'],
  runtimeConfig: {
    public: {
      apiBase: process.env.NUXT_PUBLIC_API_URL || process.env.VITE_API_URL || 'http://localhost:5000/apiCli'
    }
  },
  modules: [],
  vite: {},
  nitro: {},
})
