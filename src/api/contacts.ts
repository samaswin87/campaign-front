import request from '@/utils/request'
import { IContactData } from './types'

const BASE_URL = 'platforms/recipients'

export const defaultContactData: IContactData = {
  id: 0,
  status: 'active',
  firstName: '',
  lastName: '',
  middleName: '',
  email: '',
  tags: [],
  noOfCampaigns: 0,
  keywords: [''],
  phone: '',
  notes: '',
  gender: '',
  company: '',
  customColumns: {}
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

export const deleteContact = (id: number) =>
  request({
    url: `${BASE_URL}/${id}`,
    method: 'delete'
  })
