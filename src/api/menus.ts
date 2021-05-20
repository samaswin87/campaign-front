import request from '@/utils/request'
import { IMenuData, IMenuFinalResponseData, IMenuPromtData, IMenuConversationsData } from './types'

export const defaultFinalResponseData: IMenuFinalResponseData = {
  id: 0,
  menuId: 1,
  destinationURL: '',
  createdOn: '',
  updatedOn: '',
  body: ''
}

export const defaultPromtData: IMenuPromtData = {
  id: 0,
  menuId: 1,
  default: '',
  order: 0,
  name: '',
  body: '',
  date: ''
}

export const defaultConversationData: IMenuConversationsData = {
  id: 0,
  menuId: 1,
  type: '',
  message: '',
  contact: '',
  lastReplyAt: '',
  firstReplyAt: ''
}

export const defaultMenuData: IMenuData = {
  id: 0,
  status: 'draft',
  name: '',
  createdOn: '',
  company: '',
  noOfContacts: 1,
  phone: '',
  confidential: false,
  finalResponse: defaultFinalResponseData,
  promts: [defaultPromtData],
  conversations: []
}

export const getMenus = (params: any) =>
  request({
    url: '/menus',
    method: 'get',
    params
  })

export const getMenu = (id: number, params: any) =>
  request({
    url: `/menus/${id}`,
    method: 'get',
    params
  })

export const getMenuConversations = (id: number, params: any) =>
  request({
    url: `/menus/${id}/conversations`,
    method: 'get',
    params
  })
