import { VuexModule, Module, Action, Mutation, getModule } from 'vuex-module-decorators'
import { login, logout, getUser } from '@/api/users'
import { getToken, removeKey, removeToken } from '@/utils/cookies'
import { resetRouter } from '@/router'
import { TagsViewModule } from './tags-view'
import store from '@/store'
import VueEasySession from 'vue-easysession'
export interface IUserState {
  firstName: string
  lastName: string
  avatar: string
  role: string
  email: string
  companyId: number
  phone: number
}

@Module({ dynamic: true, store, name: 'user' })
class User extends VuexModule implements IUserState {
  public session = VueEasySession.getInstance()
  public firstName = ''
  public lastName = ''
  public avatar = ''
  public role = ''
  public email = ''
  public companyId = 0
  public phone = 0

  @Mutation
  private SET_FIRST_NAME(firstName: string) {
    this.firstName = firstName
  }

  @Mutation
  private SET_LAST_NAME(lastName: string) {
    this.lastName = lastName
  }

  @Mutation
  private SET_AVATAR(avatar: string) {
    this.avatar = avatar
  }

  @Mutation
  private SET_ROLE(role: string) {
    this.role = role
  }

  @Mutation
  private SET_EMAIL(email: string) {
    this.email = email
  }

  @Mutation
  private SET_COMPANY_ID(companyId: number) {
    this.companyId = companyId
  }

  @Mutation
  private SET_PHONE(phone: number) {
    this.phone = phone
  }

  @Action
  public async Login(userInfo: { email: string, password: string}) {
    let { email, password } = userInfo
    email = email.trim()
    const { data } = await login({ email, password })
    const { role, id } = data.data
    this.session.set('user_id', id)
    this.session.set('user_role', role)
    this.session.set('email', email)
  }

  @Action
  public ResetToken() {
    removeToken()
    removeKey()
    this.SET_ROLE('')
    this.session.destroy()
  }

  @Action
  public async GetUserInfo() {
    if (getToken() === '') {
      throw Error('GetUserInfo: token is undefined!')
    }
    const { data } = await getUser(this.session.get('user_id'), {})
    if (!data) {
      throw Error('Verification failed, please Login again.')
    }
    if (!data.role) {
      throw Error('GetUserInfo: role must be a non-null')
    }
    this.SET_FIRST_NAME(data.first_name)
    this.SET_LAST_NAME(data.last_name)
    this.SET_AVATAR(data.avatar || '/img/icons/logo.png')
    this.SET_EMAIL(data.email)
    this.SET_COMPANY_ID(data.company_id)
    this.SET_PHONE(data.phone)
    this.SET_ROLE(data.role)
  }

  @Action
  public async LogOut() {
    if (getToken() === '') {
      throw Error('LogOut: token is undefined!')
    }
    await logout()
    removeToken()
    removeKey()
    resetRouter()
    this.session.destroy()
    // Reset visited views and cached views
    TagsViewModule.delAllViews()
    this.SET_ROLE('')
  }
}

export const UserModule = getModule(User)
