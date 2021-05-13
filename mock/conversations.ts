import faker from 'faker'
import { Response, Request } from 'express'
import { ICampaignConversationsData } from '../src/api/types'

const conversationList: ICampaignConversationsData[] = []
const conversationCount = 100

for (let i = 0; i < conversationCount; i++) {
  for (let j = 0; j < 10; j++) {
    conversationList.push({
      id: i,
      status: faker.random.arrayElement(['draft', 'sent', 'reply']),
      message: faker.lorem.sentence(6, 20),
      contactId: i,
      date: faker.date.past().getTime(),
      campaignId: i
    })
  }
}

export const getConversations = (req: Request, res: Response) => {
  const { page = 1, limit = 20, sort } = req.query

  let mockList = conversationList

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
