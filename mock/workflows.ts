import faker from 'faker'
import { Response, Request } from 'express'
import { IWorkflowData, IWorkflowFinalResponseData, IWorkflowPromtData, IWorkflowConversationsData } from '../src/api/types'

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

  const conversations: IWorkflowConversationsData[] = []
  for (let k = 0; k < 100; k++) {
    const conversation: IWorkflowConversationsData = {
      id: k,
      type: faker.random.arrayElement(['sent', 'replied', 'failed']),
      workflowId: i,
      contact: faker.phone.phoneNumberFormat(2),
      message: faker.lorem.sentence(10, 20),
      lastReplyAt: faker.date.past().getTime(),
      firstReplyAt: faker.date.past().getTime()
    }
    conversations.push(conversation)
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
    promts: promts,
    conversations: conversations
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

export const getConversations = (req: Request, res: Response) => {
  const { id } = req.params
  const { page = 1, limit = 20, sort } = req.query
  for (const workflow of workflowList) {
    if (workflow.id.toString() === id) {
      let conversations = workflow.conversations

      if (sort === '-id') {
        conversations = conversations.reverse()
      }

      const pageList = conversations.filter((_, index) => index < (limit as number) * (page as number) && index >= (limit as number) * (page as number - 1))

      return res.json({
        code: 20000,
        data: {
          pageList
        }
      })
    }
  }
  return res.json({
    code: 70001,
    message: 'Workflow not found'
  })
}
