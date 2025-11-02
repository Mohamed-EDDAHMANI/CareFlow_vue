// Simple authentication composable for storing token in cookie
export function useAuthentication() {
  // useCookie is a Nuxt auto-import at runtime. If types are missing before
  // installing Nuxt types, the following may need a TS ignore.
  // @ts-ignore
  return useCookie<string | null>('token')
}