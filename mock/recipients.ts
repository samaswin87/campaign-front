import faker from 'faker'
import { Response, Request } from 'express'
import { ICampaignRecipientData } from '../src/api/types'

const recipientList: ICampaignRecipientData[] = []
const recipientCount = 100

for (let i = 0; i < recipientCount; i++) {
  recipientList.push({
    id: i,
    status: faker.random.arrayElement(['published', 'draft', 'replied']),
    addedOn: faker.date.past().getTime(),
    phone: faker.phone.phoneNumber(),
    data: { last_name: faker.name.lastName(), first_name: faker.name.firstName() },
    tags: [faker.internet.domainName(), faker.internet.domainName()],
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
