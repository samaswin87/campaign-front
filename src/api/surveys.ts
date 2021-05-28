import request from '@/utils/request'
import { ICompanySurveyData, ISurveyQuestData, ISurveyResultsData } from './types'

export const defaultSurveyResultsData: ISurveyResultsData = {
  id: 0,
  surveyQuestId: 0,
  choice1: '',
  choice2: '',
  choice3: '',
  choice4: '',
  choice5: '',
  description: '',
  contact: '',
  createdOn: ''
}

export const defaultSurveyQuestData: ISurveyQuestData = {
  id: 0,
  surveyId: 0,
  order: 0,
  description: '',
  choice1: '',
  choice2: '',
  choice3: '',
  choice4: '',
  choice5: '',
  results: [],
  createdOn: ''
}

export const defaultSurveyData: ICompanySurveyData = {
  id: 0,
  company: '',
  status: '',
  name: '',
  description: '',
  quests: [],
  createdOn: '',
  updatedOn: ''
}

export const getSurveys = (params: any) =>
  request({
    url: '/surveys',
    method: 'get',
    params
  })

export const getSurvey = (id: number, params: any) =>
  request({
    url: `/surveys/${id}`,
    method: 'get',
    params
  })

export const getSurveyConversations = (id: number, params: any) =>
  request({
    url: `/surveys/${id}/conversations`,
    method: 'get',
    params
  })
