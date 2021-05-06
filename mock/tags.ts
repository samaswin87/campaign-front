import faker from 'faker'
import { Response, Request } from 'express'
import { ITagData } from '../src/api/types'

const tagList: ITagData[] = []
const tagCount = 100

for (let i = 0; i < tagCount; i++) {
  tagList.push({
    id: i,
    status: faker.random.arrayElement(['active', 'inactive']),
    name: faker.address.citySuffix()
  })
}

export const getTags = (req: Request, res: Response) => {
  const { page = 1, limit = 20, sort } = req.query

  let mockList = tagList

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
