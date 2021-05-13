import faker from 'faker'
import { Response, Request } from 'express'
import { ICampaignRecipientData } from '../src/api/types'

const recipientList: ICampaignRecipientData[] = []
const recipientCount = 100

const properties = ['name', 'country', 'first_name', 'last_name', 'city', 'phone']

for (let i = 0; i < recipientCount; i++) {
  const dataJson:any = {}
  properties.forEach(function(prop: any) {
    dataJson[prop] = faker.random.word()
  })
  recipientList.push({
    id: i,
    status: faker.random.arrayElement(['published', 'draft', 'replied']),
    addedOn: faker.date.past().getTime(),
    phone: faker.phone.phoneNumberFormat(2),
    data: dataJson,
    tags: faker.random.arrayElements([faker.internet.domainName(), faker.internet.domainName(), faker.internet.domainName(), faker.internet.domainName(), faker.internet.domainName(), faker.internet.domainName()]),
    lastReplyAt: faker.date.past().getTime()
  })
}

export const getRecipients = (req: Request, res: Response) => {
  const { page = 1, limit = 20, sort } = req.query

  let mockList = recipientList

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

export const getRecipient = (req: Request, res: Response) => {
  const { id } = req.params
  for (const campaign of recipientList) {
    if (campaign.id.toString() === id) {
      return res.json({
        code: 20000,
        data: {
          campaign
        }
      })
    }
  }
  return res.json({
    code: 70001,
    message: 'Recipient not found'
  })
}
