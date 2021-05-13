import request from '@/utils/request'
import { ICampaignConversationsData } from './types'

export const defaultConversationData: ICampaignConversationsData = {
  id: 0,
  status: 'draft',
  message: '',
  campaignId: 1,
  contactId: 1,
  date: ''
}

export const getConversations = (params: any) =>
  request({
    url: '/conversations',
    method: 'get',
    params
  })
