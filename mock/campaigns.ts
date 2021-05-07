import faker from 'faker'
import { Response, Request } from 'express'
import { ICampaignData } from '../src/api/types'

const campaignList: ICampaignData[] = []
const campaignCount = 10

for (let i = 0; i < campaignCount; i++) {
  campaignList.push({
    id: i,
    status: faker.random.arrayElement(['published', 'draft', 'scheduled']),
    name: faker.lorem.sentence(1, 2),
    scheduledOn: faker.date.past().getTime(),
    company: faker.company.companyName(),
    createdOn: faker.date.past().getTime(),
    body: faker.lorem.sentence(10, 20),
    type: faker.random.arrayElement(['scheduled', 'immediate', 'recurring'])
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
