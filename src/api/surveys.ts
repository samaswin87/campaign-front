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
  createdOn: ''
}

export const defaultSurveyData: ICompanySurveyData = {
  id: 0,
  company: '',
  status: '',
  name: '',
  description: '',
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

export const getSurveyQuests = (id: number, params: any) =>
  request({
    url: `/surveys/${id}/quests`,
    method: 'get',
    params
  })

export const getSurveyResults = (id: number, params: any) =>
  request({
    url: `/surveys/quests/${id}/results`,
    method: 'get',
    params
  })
