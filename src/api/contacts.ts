import request from '@/utils/request'
import { IContactData } from './types'

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
    url: '/contacts',
    method: 'get',
    params
  })

export const getContact = (id: number, params: any) =>
  request({
    url: `/contacts/${id}`,
    method: 'get',
    params
  })

export const createContact = (data: any) =>
  request({
    url: '/contacts',
    method: 'post',
    data
  })

export const updateContact = (id: number, data: any) =>
  request({
    url: `/contacts/${id}`,
    method: 'put',
    data
  })

export const deleteContact = (id: number) =>
  request({
    url: `/contacts/${id}`,
    method: 'delete'
  })
