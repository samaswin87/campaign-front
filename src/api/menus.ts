import request from '@/utils/request'
import { IMenuData } from './types'

export const defaultMenuData: IMenuData = {
  id: 0,
  status: 'draft',
  name: '',
  createdOn: '',
  company: '',
  noOfContacts: 1,
  phone: ''
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
