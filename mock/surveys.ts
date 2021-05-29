import faker from 'faker'
import { Response, Request } from 'express'
import { ICompanySurveyData, ISurveyQuestData, ISurveyResultsData } from '../src/api/types'

const surveyList: ICompanySurveyData[] = []
const conversations: ISurveyResultsData[] = []
const quests: ISurveyQuestData[] = []
const surveyCount = 100

for (let i = 0; i < surveyCount; i++) {
  for (let k = 0; k < 100; k++) {
    for (let j = 0; j < 20; j++) {
      const conversation: ISurveyResultsData = {
        id: k,
        surveyQuestId: j,
        choice1: faker.lorem.sentence(5, 10),
        choice2: faker.lorem.sentence(5, 10),
        choice3: faker.lorem.sentence(5, 10),
        choice4: faker.lorem.sentence(5, 10),
        choice5: faker.lorem.sentence(5, 10),
        description: faker.lorem.sentence(20, 30),
        contact: faker.phone.phoneNumberFormat(2),
        createdOn: faker.date.past().getTime()
      }
      conversations.push(conversation)
    }
  }

  for (let j = 0; j < 20; j++) {
    const quest: ISurveyQuestData = {
      id: j,
      surveyId: i,
      order: j,
      description: faker.lorem.sentence(10, 20),
      choice1: faker.lorem.sentence(10, 20),
      choice2: faker.lorem.sentence(10, 20),
      choice3: faker.lorem.sentence(10, 20),
      choice4: faker.lorem.sentence(10, 20),
      choice5: faker.lorem.sentence(10, 20),
      createdOn: faker.date.past().getTime()
    }
    quests.push(quest)
  }

  surveyList.push({
    id: i,
    status: faker.random.arrayElement(['published', 'unpublished']),
    name: faker.lorem.sentence(1, 1),
    createdOn: faker.date.past().getTime(),
    company: faker.company.companyName(),
    updatedOn: faker.date.past().getTime(),
    description: faker.lorem.sentence(20, 30)
  })
}

export const getSurveys = (req: Request, res: Response) => {
  const { page = 1, limit = 20, sort } = req.query

  let mockList = surveyList

  if (sort === '-id') {
    mockList = mockList.reverse()
  }

  const pageList = mockList.filter((_, index) => index < (limit as number) * (page as number) && index >= (limit as number) * (page as number - 1))

  return res.json({
    code: 20000,
    data: {
      total: mockList.length,
      items: pageList
    }
  })
}

export const getSurvey = (req: Request, res: Response) => {
  const { id } = req.params
  for (const survey of surveyList) {
    if (survey.id.toString() === id) {
      return res.json({
        code: 20000,
        data: {
          survey
        }
      })
    }
  }
  return res.json({
    code: 70001,
    message: 'Survey not found'
  })
}

export const getSurveyQuests = (req: Request, res: Response) => {
  const { id } = req.params
  const surveyQuests = quests.filter((_) => _.surveyId.toString() === id)
  return res.json({
    code: 20000,
    data: {
      surveyQuests
    }
  })
}

export const getSurveyResults = (req: Request, res: Response) => {
  const { id } = req.params
  const { page = 1, limit = 20, sort } = req.query
  let mockresults = conversations.filter((_) => _.surveyQuestId.toString() === id)
  if (sort === '-id') {
    mockresults = mockresults.reverse()
  }

  const pageList = mockresults.filter((_, index) => index < (limit as number) * (page as number) && index >= (limit as number) * (page as number - 1))

  return res.json({
    code: 20000,
    data: {
      total: mockresults.length,
      items: pageList
    }
  })
}
