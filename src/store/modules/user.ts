import { VuexModule, Module, Action, Mutation, getModule } from 'vuex-module-decorators'
import { login, logout, getUser } from '@/api/users'
import { getToken, setToken, removeToken } from '@/utils/cookies'
import router, { resetRouter } from '@/router'
import { PermissionModule } from './permission'
import { TagsViewModule } from './tags-view'
import store from '@/store'

export interface IUserState {
  id: number
  token: string
  firstName: string
  lastName: string
  avatar: string
  introduction: string
  role: string
  email: string
  companyId: number
  phone: number
}

@Module({ dynamic: true, store, name: 'user' })
class User extends VuexModule implements IUserState {
  public id = 0
  public token = getToken() || ''
  public firstName = ''
  public lastName = ''
  public avatar = ''
  public introduction = ''
  public role = ''
  public email = ''
  public companyId = 0
  public phone = 0

  @Mutation
  private SET_ID(id: number) {
    this.id = id
  }

  @Mutation
  private SET_TOKEN(token: string) {
    this.token = token
  }

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
  private SET_INTRODUCTION(introduction: string) {
    this.introduction = introduction
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
    const { data, headers } = await login({ email, password })
    const { role, id } = data.data
    setToken(headers.accesstoken)
    this.SET_ID(id)
    this.SET_TOKEN(headers.accesstoken)
    this.SET_ROLE(role)
  }

  @Action
  public ResetToken() {
    removeToken()
    this.SET_TOKEN('')
    this.SET_ROLE('')
  }

  @Action
  public async GetUserInfo() {
    if (this.token === '') {
      throw Error('GetUserInfo: token is undefined!')
    }
    const { data } = await getUser(this.id, {})
    if (!data) {
      throw Error('Verification failed, please Login again.')
    }
    const { role, firstName, lastName, avatar, introduction, email, companyId, phone } = data.user
    if (!role) {
      throw Error('GetUserInfo: role must be a non-null')
    }
    this.SET_FIRST_NAME(firstName)
    this.SET_LAST_NAME(lastName)
    this.SET_AVATAR(avatar)
    this.SET_INTRODUCTION(introduction)
    this.SET_EMAIL(email)
    this.SET_COMPANY_ID(companyId)
    this.SET_PHONE(phone)
  }

  @Action
  public async ChangeRoles(role: string) {
    // Dynamically modify permissions
    const token = role + '-token'
    this.SET_TOKEN(token)
    setToken(token)
    await this.GetUserInfo()
    resetRouter()
    // Generate dynamic accessible routes based on roles
    PermissionModule.GenerateRoutes(this.role)
    // Add generated routes
    router.addRoutes(PermissionModule.dynamicRoutes)
    // Reset visited views and cached views
    TagsViewModule.delAllViews()
  }

  @Action
  public async LogOut() {
    if (this.token === '') {
      throw Error('LogOut: token is undefined!')
    }
    await logout()
    removeToken()
    resetRouter()

    // Reset visited views and cached views
    TagsViewModule.delAllViews()
    this.SET_TOKEN('')
    this.SET_ROLE('')
  }
}

export const UserModule = getModule(User)
