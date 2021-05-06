import request from '@/utils/request'
import { ITagData } from './types'

export const defaultTagData: ITagData = {
  id: 0,
  status: 'active',
  name: ''
}

export const getTags = (params: any) =>
  request({
    url: '/tags',
    method: 'get',
    params
  })
