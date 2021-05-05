import request from '@/utils/request'
import { ICompanyData } from './types'

export const defaultContactData: ICompanyData = {
  id: 0,
  status: 'active',
  name: '',
  email: '',
  phone: ''
}

export const getCompanies = (params: any) =>
  request({
    url: '/companies',
    method: 'get',
    params
  })
