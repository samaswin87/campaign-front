import request from '@/utils/request'
import { ICampaignRecipientData } from './types'

export const defaultRecipientData: ICampaignRecipientData = {
  id: 0,
  status: 'draft',
  addedOn: '',
  data: '',
  campaignId: 1,
  contactId: 1
}

export const getRecipients = (params: any) =>
  request({
    url: '/recipients',
    method: 'get',
    params
  })

export const getRecipient = (id: number, params: any) =>
  request({
    url: `/recipients/${id}`,
    method: 'get',
    params
  })

export const createRecipient = (data: any) =>
  request({
    url: '/recipients',
    method: 'post',
    data
  })

export const updateRecipient = (id: number, data: any) =>
  request({
    url: `/recipients/${id}`,
    method: 'put',
    data
  })

export const deleteRecipient = (id: number) =>
  request({
    url: `/recipients/${id}`,
    method: 'delete'
  })
