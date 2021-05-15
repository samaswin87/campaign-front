import faker from 'faker'
import { Response, Request } from 'express'
import { IWorkflowData } from '../src/api/types'

const workflowList: IWorkflowData[] = []
const workflowCount = 30

for (let i = 0; i < workflowCount; i++) {
  workflowList.push({
    id: i,
    status: faker.random.arrayElement(['published', 'draft']),
    name: faker.lorem.sentence(6, 10),
    createdOn: faker.date.past().getTime(),
    noOfContacts: faker.datatype.number(),
    company: faker.company.companyName(),
    phone: faker.phone.phoneNumberFormat(2),
    confidential: faker.datatype.boolean()
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
