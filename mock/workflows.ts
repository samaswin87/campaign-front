import faker from 'faker'
import { Response, Request } from 'express'
import { IWorkflowData, IWorkflowFinalResponseData, IWorkflowPromtData } from '../src/api/types'

const workflowList: IWorkflowData[] = []
const workflowCount = 100

for (let i = 0; i < workflowCount; i++) {
  const wordCount = faker.datatype.number({ min: 30, max: 70 })
  let sentence = faker.lorem.words(wordCount)
  sentence = sentence.charAt(0).toUpperCase() + sentence.slice(1) + ' {destinationURL} .'
  const finalResponseData: IWorkflowFinalResponseData = {
    id: i,
    workflowId: i,
    body: sentence,
    destinationURL: faker.internet.url(),
    createdOn: faker.date.past().getTime(),
    updatedOn: faker.date.past().getTime()
  }

  const promts: IWorkflowPromtData[] = []
  for (let j = 0; j < 4; j++) {
    const promt: IWorkflowPromtData = {
      id: j,
      body: faker.lorem.sentence(10, 20),
      name: faker.lorem.sentence(6, 10),
      default: 'name_' + j,
      order: j,
      workflowId: i,
      date: faker.date.past().getTime()
    }
    promts.push(promt)
  }

  workflowList.push({
    id: i,
    status: faker.random.arrayElement(['published', 'unpublished']),
    name: faker.lorem.sentence(1, 1),
    createdOn: faker.date.past().getTime(),
    noOfContacts: faker.datatype.number(),
    company: faker.company.companyName(),
    phone: faker.phone.phoneNumberFormat(2),
    confidential: faker.datatype.boolean(),
    finalResponse: finalResponseData,
    promts: promts
  })
}

export const getWorkflows = (req: Request, res: Response) => {
  const { page = 1, limit = 20, sort } = req.query

  let mockList = workflowList

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

export const getWorkflow = (req: Request, res: Response) => {
  const { id } = req.params
  for (const workflow of workflowList) {
    if (workflow.id.toString() === id) {
      return res.json({
        code: 20000,
        data: {
          workflow
        }
      })
    }
  }
  return res.json({
    code: 70001,
    message: 'Workflow not found'
  })
}
