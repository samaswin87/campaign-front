import request from '@/utils/request'
import { IWorkflowData } from './types'

export const defaultWorkflowData: IWorkflowData = {
  id: 0,
  status: 'draft',
  title: '',
  date: '',
  company: ''
}

export const getWorkflows = (params: any) =>
  request({
    url: '/workflows',
    method: 'get',
    params
  })
