import Cookies from 'js-cookie'
import { isEmpty } from 'lodash'

// App
const sidebarStatusKey = 'sidebar_status'
export const getSidebarStatus = () => Cookies.get(sidebarStatusKey)
export const setSidebarStatus = (sidebarStatus: string) => Cookies.set(sidebarStatusKey, sidebarStatus)

const languageKey = 'language'
export const getLanguage = () => Cookies.get(languageKey)
export const setLanguage = (language: string) => Cookies.set(languageKey, language)

const sizeKey = 'size'
export const getSize = () => Cookies.get(sizeKey)
export const setSize = (size: string) => Cookies.set(sizeKey, size)

// User
const tokenKey = 'access_token'
export const getToken = () => Cookies.get(tokenKey)
export const setToken = (token: string) => {
  console.log(token)
  if (!isEmpty(token)) {
    Cookies.set(tokenKey, token)
  }
}
export const removeToken = () => Cookies.remove(tokenKey)

// Access
const clientKey = 'client_key'
export const getKey = () => Cookies.get(clientKey)
export const setKey = (client: string) => { if (!isEmpty(client)) { Cookies.set(clientKey, client) } }
export const removeKey = () => Cookies.remove(clientKey)
