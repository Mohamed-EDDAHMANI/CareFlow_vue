import axios, { AxiosInstance } from 'axios'

class ApiClient {
  private url: string
  private axiosInstance: AxiosInstance

  constructor(basePath: string, engineUrl: string) {
    // ensure no double slashes
    this.url = `${engineUrl.replace(/\/+$/, '')}/${basePath.replace(/^\/+/, '')}`
    this.axiosInstance = axios.create()
  }

  private async getAuthHeader() {
    // try to read token from cookie (Nuxt useCookie auto-import)
    try {
      // useCookie is auto-imported in Nuxt; at runtime this will work.
      // If types are missing locally, install Nuxt types or add a declaration file.
      // @ts-expect-error runtime auto-import
      const tokenRef = useCookie('token')
      const token = tokenRef?.value ?? null
      return token ? { Authorization: `Bearer ${token}` } : {}
    } catch (e) {
      return {}
    }
  }

  public async get(params: Record<string, any> | string = '') {
    const paramsStr = typeof params === 'string' ? params : new URLSearchParams(params as any).toString()
    const url = paramsStr ? `${this.url}?${paramsStr}` : this.url
    const res = await this.axiosInstance.get(url, { headers: await this.getAuthHeader() })
    return res.data
  }

  public async find(id: string | number) {
    const res = await this.axiosInstance.get(`${this.url}/${id}`, { headers: await this.getAuthHeader() })
    return res.data
  }

  public async destroy(id: string | number) {
    const res = await this.axiosInstance.delete(`${this.url}/${id}`, { headers: await this.getAuthHeader() })
    return res.data
  }

  public async post(payload: any, sec_url = '', req_headers = {}) {
    const res = await this.axiosInstance.post(this.url + sec_url, payload, {
      headers: { ...(await this.getAuthHeader()), ...req_headers }
    })
    return res.data
  }

  public async update(id: string | number, payload: any) {
    const res = await this.axiosInstance.patch(`${this.url}/${id}`, payload, { headers: await this.getAuthHeader() })
    return res.data
  }
}

export const useApiClient = (path: string) => {
  // useRuntimeConfig is auto-imported by Nuxt
  // @ts-expect-error runtime auto-import
  const config = useRuntimeConfig()
  const engineUrl = config.public.apiBase
  return new ApiClient(path, engineUrl)
}
