import request from '@/utils/request'
import { IWorkflowData, IWorkflowFinalResponseData, IWorkflowPromtData } from './types'

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
  promts: [defaultPromtData]
}

export const getWorkflows = (params: any) =>
  request({
    url: '/workflows',
    method: 'get',
    params
  })

export const getWorkflow = (id: number, params: any) =>
  request({
    url: `/workflows/${id}`,
    method: 'get',
    params
  })
