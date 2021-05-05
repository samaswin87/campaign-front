import faker from 'faker'
import { Response, Request } from 'express'
import { IContactData } from '../src/api/types'

const contactList: IContactData[] = []
const contactCount = 100

for (let i = 0; i < contactCount; i++) {
  contactList.push({
    id: i,
    status: faker.random.arrayElement(['published', 'draft']),
    company: faker.company.companyName(),
    firstName: faker.name.firstName(),
    lastName: faker.name.lastName(),
    middleName: faker.name.middleName(),
    gender: faker.name.gender(),
    email: faker.internet.email(),
    tags: [faker.internet.domainName(), faker.internet.domainName(), faker.internet.domainName(), faker.internet.domainName()],
    noOfCampaigns: faker.datatype.number(),
    keywords: [faker.internet.domainName(), faker.internet.domainName(), faker.internet.domainName(), faker.internet.domainName()],
    phone: faker.phone.phoneNumber(),
    notes: faker.lorem.sentence(6, 10)
  })
}

export const getContacts = (req: Request, res: Response) => {
  const { company, title, page = 1, limit = 20, sort } = req.query

  let mockList = contactList

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

export const getContact = (req: Request, res: Response) => {
  const { id } = req.params
  for (const contact of contactList) {
    if (contact.id.toString() === id) {
      return res.json({
        code: 20000,
        data: {
          contact
        }
      })
    }
  }
  return res.json({
    code: 70001,
    message: 'Contact not found'
  })
}
