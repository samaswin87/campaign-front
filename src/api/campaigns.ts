import request from '@/utils/request'
import { ICampaignData } from './types'

const BASE_API = 'campaigns/depositories'

export const defaultCampaignData: ICampaignData = {
  name: '',
  scheduledAt: '',
  createdOn: '',
  message: '',
  noOfContacts: 0,
  group: 'immediate',
  recurringDays: [],
  recurringAt: ''
}

export const getCampaigns = (params: any) =>
  request({
    url: BASE_API,
    method: 'get',
    params
  })

export const getCampaign = (id: number, params: any) =>
  request({
    url: BASE_API + `/${id}`,
    method: 'get',
    params
  })

export const createCampaign = (data: any) =>
  request({
    url: BASE_API,
    method: 'post',
    data
  })

export const updateCampaign = (id: number, data: any) =>
  request({
    url: BASE_API + `/${id}`,
    method: 'put',
    data
  })

export const deleteCampaign = (id: number) =>
  request({
    url: BASE_API + `/${id}`,
    method: 'delete'
  })
