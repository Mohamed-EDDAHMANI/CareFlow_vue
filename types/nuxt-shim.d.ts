declare module 'nuxt' {
  // Minimal shim for projects where Nuxt types aren't installed yet.
  export function defineNuxtConfig(config: any): any;
  const _default: any;
  export default _default;
}

declare module '#app' {
  // basic runtime helpers used in the project
  export function useRuntimeConfig(): any;
  export function useRouter(): any;
}

declare module '#imports' {
  // placeholder for Nuxt auto-imports
  export const useRuntimeConfig: any
}
