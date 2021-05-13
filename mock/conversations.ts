import faker from 'faker'
import { Response, Request } from 'express'
import { ICampaignConversationsData } from '../src/api/types'

const conversationList: ICampaignConversationsData[] = []
const conversationCount = 100

for (let i = 0; i < conversationCount; i++) {
  for (let j = 0; j < conversationCount; j++) {
    conversationList.push({
      id: i,
      type: faker.random.arrayElement(['draft', 'sent', 'reply']),
      message: faker.lorem.sentence(50, 60),
      contactId: i,
      date: faker.date.past().getTime(),
      campaignId: i
    })
  }
}

export const getConversations = (req: Request, res: Response) => {
  const { sort } = req.query

  let mockList = conversationList

  if (sort === '-id') {
    mockList = mockList.reverse()
  }

  return res.json({
    code: 20000,
    data: {
      total: mockList.length,
      items: mockList
    }
  })
}
