import faker from 'faker'
import { Response, Request } from 'express'
import { ICompanyData, IPlanCredits, IPlatformNumbersData } from '../src/api/types'

const companyList: ICompanyData[] = []
const companyCount = 100

for (let i = 1; i < companyCount; i++) {
  const platforms: IPlatformNumbersData[] = []

  for (let k = 1; k < 25; k++) {
    const phone = faker.random.arrayElement([faker.phone.phoneNumberFormat(2), faker.phone.phoneNumber('#####')])
    platforms.push({
      id: k,
      name: faker.lorem.sentence(3, 4).replace(/\s/g, ''),
      status: faker.random.arrayElement(['active', 'inactive']),
      companyId: i,
      phone: phone,
      shortCode: phone.length === 5,
      archivedAt: '',
      createdAt: faker.date.future().getTime(),
      updatedAt: faker.date.future().getTime()
    })
  }

  const randomNumber = faker.datatype.number()
  const credits: IPlanCredits[] = []
  for (let j = 1; j < 12; j++) {
    credits.push({
      id: j,
      companyId: i,
      credits: 100,
      month: faker.random.arrayElement(['Jan-2021', 'Feb-2021', 'Mar-2021', 'April-2021', 'May-2021', 'Jun-2021', 'Jul-2021', 'Aug-2021', 'Sept-2021', 'Oct-2021', 'Nov-2021', 'Decr-2021']),
      inbounds: randomNumber,
      outbounds: randomNumber,
      voiceInbounds: randomNumber,
      voiceOutbounds: randomNumber,
      availedInbounds: faker.random.arrayElement([0, 1000, 100]),
      availedOutbounds: faker.random.arrayElement([0, 1000, 100]),
      availedVoiceInbounds: faker.random.arrayElement([0, 1000, 100]),
      availedVoiceOutbounds: faker.random.arrayElement([0, 1000, 100]),
      createdAt: faker.date.future().getTime(),
      updatedAt: faker.date.future().getTime(),
      additionalCredits: faker.datatype.number(5000)
    })
  }

  companyList.push({
    id: i,
    status: faker.random.arrayElement(['active', 'inactive']),
    name: faker.company.companyName(),
    email: faker.internet.email(),
    phone: faker.phone.phoneNumberFormat(2),
    plan: faker.random.arrayElement(['Tentative', 'Lite', 'Plus', 'Premium', 'Ultimate']),
    callForwarding: faker.random.arrayElement([true, false]),
    totalCredits: randomNumber,
    remainingCredits: randomNumber,
    messageForward: faker.random.arrayElement([true, false]),
    apiToken: faker.lorem.sentence(3, 4).replace(/\s/g, ''),
    planCredits: credits,
    planCredit: 1000,
    usedPercentage: 40,
    platforms: platforms
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

export const getCredits = (req: Request, res: Response) => {
  const { id } = req.params
  const { page = 1, limit = 20, sort } = req.query

  let mockList: IPlanCredits[] = []
  for (const company of companyList) {
    if (company.id.toString() === id) {
      mockList = company.planCredits
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

export const getPlatforms = (req: Request, res: Response) => {
  const { id } = req.params
  const { page = 1, limit = 20, sort } = req.query

  let mockList: IPlatformNumbersData[] = []
  for (const company of companyList) {
    if (company.id.toString() === id) {
      mockList = company.platforms
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

export const getCompany = (req: Request, res: Response) => {
  const { id } = req.params
  for (const company of companyList) {
    if (company.id.toString() === id) {
      return res.json({
        code: 20000,
        data: {
          company
        }
      })
    }
  }
  return res.json({
    code: 70001,
    message: 'Company not found'
  })
}
