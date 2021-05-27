import faker from 'faker'
import { Response, Request } from 'express'
import { ITagData } from '../src/api/types'

const tagList: ITagData[] = []
const tagCount = 100
const companyCount = 100
for (let i = 0; i < companyCount; i++) {
  for (let k = 0; k < tagCount; k++) {
    const status = faker.random.arrayElement(['active', 'inactive'])
    tagList.push({
      id: k,
      status: status,
      name: faker.address.citySuffix(),
      companyId: i,
      archivedAt: (status === 'active') ? '' : faker.date.future().getTime(),
      createdAt: faker.date.future().getTime(),
      updatedAt: faker.date.future().getTime()
    })
  }
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

export const getTagsByCompany = (req: Request, res: Response) => {
  const { id } = req.params
  const { page = 1, limit = 20, sort } = req.query

  let mockList = []
  for (const tag of tagList) {
    if (tag.companyId.toString() === id) {
      mockList.push(tag)
    }
  }

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
