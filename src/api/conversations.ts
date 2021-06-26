import request from '@/utils/request'
import { ICampaignConversationsData } from './types'

const BASE_API = 'campaigns/depositories'

export const defaultConversationData: ICampaignConversationsData = {
  id: 0,
  type: 'draft',
  message: '',
  campaignId: 1,
  contactId: 1,
  date: ''
}

export const getConversations = (id: number, campaignId: number) =>
  request({
    url: BASE_API + `/${campaignId}/recipients/${id}/communications`,
    method: 'get'
  })

export const addConversation = (id: number, campaignId: number, data: any) =>
  request({
    url: BASE_API + `/${campaignId}/recipients/${id}/communications`,
    method: 'post',
    data
  })
