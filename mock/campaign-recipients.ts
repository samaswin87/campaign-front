import faker from 'faker'
import { Response, Request } from 'express'
import { ICampaignRecipientData } from '../src/api/types'

const campaignList: ICampaignRecipientData[] = []
const campaignCount = 10

for (let i = 0; i < campaignCount; i++) {
  campaignList.push({
    id: i,
    status: faker.random.arrayElement(['published', 'draft', 'replied']),
    addedOn: faker.date.past().getTime(),
    campaignId: i,
    contactId: i,
    data: { last_name: faker.name.lastName(), first_name: faker.name.firstName() }
  })
}

export const getCampaignRecipients = (req: Request, res: Response) => {
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

export const getCampaignRecipient = (req: Request, res: Response) => {
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
    message: 'Recipient not found'
  })
}
