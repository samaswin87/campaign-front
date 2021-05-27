import request from '@/utils/request'
import { ITagData } from './types'

export const defaultTagData: ITagData = {
  id: 0,
  status: 'active',
  name: '',
  companyId: 0,
  archivedAt: '',
  createdAt: '',
  updatedAt: ''
}

export const getTags = (params: any) =>
  request({
    url: '/tags',
    method: 'get',
    params
  })

export const getTagsByCompany = (id: number, params: any) =>
  request({
    url: `/companies/${id}/tags`,
    method: 'get',
    params
  })
