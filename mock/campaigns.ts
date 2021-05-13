import faker from 'faker'
import { Response, Request } from 'express'
import { ICampaignData } from '../src/api/types'

const campaignList: ICampaignData[] = []
const campaignCount = 100

for (let i = 0; i < campaignCount; i++) {
  campaignList.push({
    id: i,
    status: faker.random.arrayElement(['published', 'draft', 'scheduled']),
    name: faker.lorem.sentence(1, 2),
    scheduledOn: faker.date.past().getTime(),
    company: faker.company.companyName(),
    createdOn: faker.date.past().getTime(),
    body: faker.lorem.sentence(10, 20),
    type: faker.random.arrayElement(['scheduled', 'immediate', 'recurring', 'one_by_one']),
    noOfContacts: faker.datatype.number(),
    recurringDays: ['Mon', 'Tue'],
    recurringAt: faker.date.future().getTime(),
    phone: faker.phone.phoneNumberFormat(2)
  })
}

export const getCampaigns = (req: Request, res: Response) => {
  const { page = 1, limit = 20, sort } = req.query

  let mockList = campaignList

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

export const getCampaign = (req: Request, res: Response) => {
  const { id } = req.params
  for (const campaign of campaignList) {
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
    message: 'Campaign not found'
  })
}
