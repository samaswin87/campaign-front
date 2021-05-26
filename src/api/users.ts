import request from '@/utils/request'
import { IUserData, IUserSettingData } from './types'

export const defaultUserData: IUserData = {
  id: 0,
  username: '',
  password: '',
  firstName: '',
  lastName: '',
  status: '',
  email: '',
  phone: '',
  avatar: '',
  introduction: '',
  roles: [],
  companyId: 0,
  timelines: [],
  createdOn: '',
  updatedOn: ''
}

export const defaultUserSettingData: IUserSettingData = {
  id: 0,
  userId: 0,
  notifyCampaign: false,
  notifyCreditLimit: false,
  notifyMenu: false,
  notifyWorkflow: false,
  timeZone: ''
}

export const getUsers = (params: any) =>
  request({
    url: '/users',
    method: 'get',
    params
  })

export const getUsersByCompany = (id: number, params: any) =>
  request({
    url: `/companies/${id}/users`,
    method: 'get',
    params
  })

export const getUserInfo = (data: any) =>
  request({
    url: '/users/info',
    method: 'post',
    data
  })

export const getUser = (id: number, params: any) =>
  request({
    url: `/users/${id}`,
    method: 'get',
    params
  })

export const getUserByName = (username: string) =>
  request({
    url: `/users/${username}`,
    method: 'get'
  })

export const updateUser = (username: string, data: any) =>
  request({
    url: `/users/${username}`,
    method: 'put',
    data
  })

export const deleteUser = (username: string) =>
  request({
    url: `/users/${username}`,
    method: 'delete'
  })

export const login = (data: any) =>
  request({
    url: '/users/login',
    method: 'post',
    data
  })

export const logout = () =>
  request({
    url: '/users/logout',
    method: 'post'
  })

export const register = (data: any) =>
  request({
    url: '/users/register',
    method: 'post',
    data
  })
