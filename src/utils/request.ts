import axios from 'axios'
import { Message, MessageBox } from 'element-ui'
import { UserModule } from '@/store/modules/user'
import { getToken, setToken, removeToken, getKey, setKey, removeKey } from '@/utils/cookies'
import { isEmpty } from 'lodash'

const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API, // url = base url + request url
  timeout: 5000
  // withCredentials: true // send cookies when cross-domain requests
})

// Request interceptors
service.interceptors.request.use(
  (config) => {
    // Add X-Access-Token header to every request, you can add other custom headers here
    if (UserModule.session) {
      config.headers['X-UID'] = UserModule.session.get('email')
    }
    const client = getKey()
    const access = getToken()
    if (!isEmpty(access)) {
      config.headers['X-Access-Token'] = access
    }

    if (!isEmpty(client)) {
      config.headers['X-Client'] = client
    }
    return config
  },
  (error) => {
    Promise.reject(error)
  }
)

// Response interceptors
service.interceptors.response.use(
  (response) => {
    if (![200, 201].includes(response.status)) {
      Message({
        message: response.statusText || 'Error',
        type: 'error',
        duration: 5 * 1000
      })
      if (response.status === 401 || response.status === 403 || response.status === 406) {
        MessageBox.confirm(
          'You have been logged out. Try log in again',
          'Log out',
          {
            confirmButtonText: 'Login Again',
            cancelButtonText: 'Cancel',
            type: 'warning'
          }
        ).then(() => {
          removeToken()
          removeKey()
          location.reload() // To prevent bugs from vue-router
        })
      } else if (response.status === 409) {
        MessageBox.confirm(
          response.data,
          'Error',
          {
            cancelButtonText: 'Cancel',
            type: 'warning'
          }
        )
      }
      return Promise.reject(new Error(response.statusText || 'Error'))
    } else {
      setToken(response.headers['x-access-token'] || response.config.headers['X-Access-Token'])
      setKey(response.headers['x-client'] || response.config.headers['X-Client'])
      return response
    }
  },
  (error) => {
    if (error.response.status === 409) {
      MessageBox.confirm(
        error.response.data,
        'Error',
        {
          cancelButtonText: 'Cancel',
          type: 'error'
        }
      )
    } else {
      Message({
        message: error.message,
        type: 'error',
        duration: 5 * 1000
      })
    }
    return Promise.reject(error)
  }
)

export default service
