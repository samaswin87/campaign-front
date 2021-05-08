import request from '@/utils/request'
import { ICampaignData } from './types'

export const defaultCampaignData: ICampaignData = {
  id: 0,
  status: 'draft',
  name: '',
  scheduledOn: '',
  createdOn: '',
  company: '',
  body: '',
  noOfContacts: 1,
  type: 'scheduled',
  recurringDays: [],
  recurringAt: ''
}

export const getCampaigns = (params: any) =>
  request({
    url: '/campaigns',
    method: 'get',
    params
  })

export const getCampaign = (id: number, params: any) =>
  request({
    url: `/campaigns/${id}`,
    method: 'get',
    params
  })

export const createCampaign = (data: any) =>
  request({
    url: '/campaigns',
    method: 'post',
    data
  })

export const updateCampaign = (id: number, data: any) =>
  request({
    url: `/campaigns/${id}`,
    method: 'put',
    data
  })

export const deleteCampaign = (id: number) =>
  request({
    url: `/campaigns/${id}`,
    method: 'delete'
  })
