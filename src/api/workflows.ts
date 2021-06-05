import request from '@/utils/request'
import { IWorkflowData, IWorkflowFinalResponseData, IWorkflowPromtData, IWorkflowConversationsData } from './types'

const BASE_API = 'workflows/depositories'

export const defaultFinalResponseData: IWorkflowFinalResponseData = {
  id: 0,
  workflowId: 1,
  destinationURL: '',
  createdOn: '',
  updatedOn: '',
  body: ''
}

export const defaultPromtData: IWorkflowPromtData = {
  id: 0,
  workflowId: 1,
  default: '',
  order: 0,
  name: '',
  body: '',
  date: ''
}

export const defaultConversationData: IWorkflowConversationsData = {
  id: 0,
  workflowId: 1,
  type: '',
  message: '',
  contact: '',
  lastReplyAt: '',
  firstReplyAt: ''
}

export const defaultWorkflowData: IWorkflowData = {
  id: 0,
  status: 'draft',
  name: '',
  createdOn: '',
  company: '',
  noOfContacts: 1,
  phone: '',
  confidential: false,
  finalResponse: defaultFinalResponseData,
  promts: [defaultPromtData],
  conversations: []
}

export const getWorkflows = (params: any) =>
  request({
    url: BASE_API,
    method: 'get',
    params
  })

export const getWorkflow = (id: number, params: any) =>
  request({
    url: BASE_API + `/${id}`,
    method: 'get',
    params
  })

export const getWorkflowConversations = (id: number, params: any) =>
  request({
    url: BASE_API + `/${id}/conversations`,
    method: 'get',
    params
  })
