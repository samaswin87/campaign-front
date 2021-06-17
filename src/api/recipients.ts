import request from '@/utils/request'
import { ICampaignRecipientData } from './types'

export const defaultRecipientData: ICampaignRecipientData = {
  id: -1,
  status: 'active',
  addedOn: '',
  data: '',
  phone: '',
  tags: [],
  lastReplyAt: ''
}

export const getRecipients = (depositoryId: number, params: any) =>
  request({
    url: `/campaigns/depositories/${depositoryId}/recipients`,
    method: 'get',
    params
  })

export const getRecipient = (id: number, depositoryId: number, params: any) =>
  request({
    url: `/campaigns/depositories/${depositoryId}/recipients/${id}`,
    method: 'get',
    params
  })

export const createRecipient = (depositoryId: number, data: any) =>
  request({
    url: `/campaigns/depositories/${depositoryId}/recipients/`,
    method: 'post',
    data
  })

export const updateRecipient = (id: number, depositoryId: number, data: any) =>
  request({
    url: `/campaigns/depositories/${depositoryId}/recipients/${id}`,
    method: 'put',
    data
  })

export const deleteRecipient = (id: number) =>
  request({
    url: `/recipients/${id}`,
    method: 'delete'
  })
