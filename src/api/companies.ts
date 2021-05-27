import request from '@/utils/request'
import { ICompanyData, IPlanCredits, IPlatformNumbersData, ICompanySettingData } from './types'

export const defaultPlatformData: IPlatformNumbersData = {
  id: 0,
  status: '',
  name: '',
  companyId: 0,
  phone: '',
  shortCode: false,
  archivedAt: '',
  createdAt: '',
  updatedAt: ''
}

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
  additionalCredits: 0,
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
  planCredits: [defaultPlanCreditData],
  planCredit: 0,
  usedPercentage: 0,
  platforms: []
}

export const defaultCompanySettingData: ICompanySettingData = {
  id: 0,
  companyId: 1,
  messagingPlatform: '',
  messageLength: 0,
  companyAddress: '',
  useShortCode: true,
  useDestinationLink: true,
  notifyCreditLimit: true,
  notifyUserAdd: true,
  notifyCampaignCreation: true,
  notifyWorkflowCreation: true,
  notifyMenuCreation: true,
  maxUser: 0,
  maxCampaign: 0,
  maxWorkflow: 0,
  maxMenu: 0,
  maxContactsInCampaign: 0,
  sso: true,
  importWorkflows: true,
  planStartDate: '',
  planEndDate: '',
  importMenus: true,
  importUsers: true,
  importContacts: true,
  importCampaigns: true,
  batchProcessDefaultTime: '',
  companylogo: '',
  timeZone: '',
  createdOn: '',
  updatedOn: ''
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

export const getCredits = (id: number, params: any) =>
  request({
    url: `/companies/${id}/credits`,
    method: 'get',
    params
  })

export const getPlatforms = (id: number, params: any) =>
  request({
    url: `/companies/${id}/platforms`,
    method: 'get',
    params
  })
