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

export const getTags = (id: number, params: any) =>
  request({
    url: `companies/${id}/tags`,
    method: 'get',
    params
  })

export const getTagNames = (id: number) =>
  request({
    url: `companies/${id}/tags/names`,
    method: 'get'
  })

export const getTagsByCompany = (id: number, params: any) =>
  request({
    url: `/companies/${id}/tags`,
    method: 'get',
    params
  })
