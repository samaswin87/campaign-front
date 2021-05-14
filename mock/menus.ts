import faker from 'faker'
import { Response, Request } from 'express'
import { IMenuData } from '../src/api/types'

const menuList: IMenuData[] = []
const menuCount = 30

for (let i = 0; i < menuCount; i++) {
  menuList.push({
    id: i,
    status: faker.random.arrayElement(['published', 'draft']),
    name: faker.lorem.sentence(6, 10),
    createdOn: faker.date.past().getTime(),
    noOfContacts: faker.datatype.number(),
    company: faker.company.companyName(),
    phone: faker.phone.phoneNumberFormat(2)
  })
}

export const getMenus = (req: Request, res: Response) => {
  const { page = 1, limit = 20, sort } = req.query

  let mockList = menuList

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

export const getMenu = (req: Request, res: Response) => {
  const { id } = req.params
  for (const menu of menuList) {
    if (menu.id.toString() === id) {
      return res.json({
        code: 20000,
        data: {
          menu
        }
      })
    }
  }
  return res.json({
    code: 70001,
    message: 'Menu not found'
  })
}
