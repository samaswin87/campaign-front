import faker from 'faker'
import { Response, Request } from 'express'
import { ICampaignData } from '../src/api/types'

const campaignList: ICampaignData[] = []
const campaignCount = 10

for (let i = 0; i < campaignCount; i++) {
  campaignList.push({
    id: i,
    status: faker.random.arrayElement(['published', 'draft']),
    title: faker.lorem.sentence(6, 10),
    date: faker.date.past().getTime(),
    company: faker.company.companyName()
  })
}

export const getCampaigns = (req: Request, res: Response) => {
  const { company, title, page = 1, limit = 20, sort } = req.query

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
