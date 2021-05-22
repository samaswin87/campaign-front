import request from '@/utils/request'
import { ICompanyData, IPlanCredits } from './types'

export const defaultPlanCreditData: IPlanCredits = {
  id: 0,
  companyId: 0,
  credits: 0,
  month: '',
  inbounds: 0,
  outbounds: 0,
  voiceInbounds: 0,
  voiceOutbounds: 0,
  availedInbounds: 0,
  availedOutbounds: 0,
  availedVoiceInbounds: 0,
  availedVoiceOutbounds: 0,
  createdAt: '',
  updatedAt: ''
}

export const defaultCompanyData: ICompanyData = {
  id: 0,
  status: 'active',
  name: '',
  email: '',
  phone: '',
  plan: 'Tentative',
  callForwarding: false,
  totalCredits: 0,
  remainingCredits: 0,
  messageForward: false,
  apiToken: '',
  planCredits: defaultPlanCreditData
}

export const getCompanies = (params: any) =>
  request({
    url: '/companies',
    method: 'get',
    params
  })

export const getCompany = (id: number, params: any) =>
  request({
    url: `/companies/${id}`,
    method: 'get',
    params
  })
