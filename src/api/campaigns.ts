import request from '@/utils/request'
import { ICampaignData } from './types'

export const defaultCampaignData: ICampaignData = {
  id: 0,
  status: 'draft',
  title: '',
  date: '',
  company: ''
}

export const getCampaigns = (params: any) =>
  request({
    url: '/campaigns',
    method: 'get',
    params
  })
