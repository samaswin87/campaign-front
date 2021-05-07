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
  type: 'scheduled'
}

export const getCampaigns = (params: any) =>
  request({
    url: '/campaigns',
    method: 'get',
    params
  })
