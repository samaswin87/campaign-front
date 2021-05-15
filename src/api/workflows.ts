import request from '@/utils/request'
import { IWorkflowData } from './types'

export const defaultWorkflowData: IWorkflowData = {
  id: 0,
  status: 'draft',
  name: '',
  createdOn: '',
  company: '',
  noOfContacts: 1,
  phone: '',
  confidential: false
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
