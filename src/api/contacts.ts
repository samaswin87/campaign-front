import request from '@/utils/request'
import { IContactData } from './types'

const BASE_URL = 'platforms/recipients'

export const defaultContactData: IContactData = {
  status: 'active',
  firstName: '',
  lastName: '',
  middleName: '',
  email: '',
  tags: [],
  noOfCampaigns: 0,
  phone: '',
  notes: '',
  gender: 'male'
}

export const getContacts = (params: any) =>
  request({
    url: BASE_URL,
    method: 'get',
    params
  })

export const getContact = (id: number, params: any) =>
  request({
    url: `${BASE_URL}/${id}`,
    method: 'get',
    params
  })

export const getTags = () =>
  request({
    url: `${BASE_URL}/tags`,
    method: 'get'
  })

export const getKeywords = (params: any) =>
  request({
    url: `${BASE_URL}/keywords`,
    method: 'get',
    params
  })

export const updateTags = (data: any) =>
  request({
    url: `${BASE_URL}/update_tags`,
    method: 'put',
    data
  })

export const createContact = (data: any) =>
  request({
    url: BASE_URL,
    method: 'post',
    data
  })

export const updateContact = (id: number, data: any) =>
  request({
    url: `${BASE_URL}/${id}`,
    method: 'put',
    data
  })

export const updateStatuses = (data: any) =>
  request({
    url: `${BASE_URL}/statuses`,
    method: 'put',
    data
  })

export const deleteContact = (id: number) =>
  request({
    url: `${BASE_URL}/${id}`,
    method: 'delete'
  })
