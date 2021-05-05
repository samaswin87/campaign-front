import faker from 'faker'
import { Response, Request } from 'express'
import { ICompanyData } from '../src/api/types'

const companyList: ICompanyData[] = []
const companyCount = 100

for (let i = 0; i < companyCount; i++) {
  companyList.push({
    id: i,
    status: faker.random.arrayElement(['active', 'inactive']),
    name: faker.company.companyName(),
    email: faker.internet.email(),
    phone: faker.phone.phoneNumber()
  })
}

export const getCompanies = (req: Request, res: Response) => {
  const { page = 1, limit = 20, sort } = req.query

  let mockList = companyList

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
