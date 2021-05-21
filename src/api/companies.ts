import request from '@/utils/request'
import { ICompanyData } from './types'

export const defaultCompanyData: ICompanyData = {
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

export const getCompany = (id: number, params: any) =>
  request({
    url: `/companies/${id}`,
    method: 'get',
    params
  })
