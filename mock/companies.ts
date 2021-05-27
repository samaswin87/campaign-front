import faker from 'faker'
import { Response, Request } from 'express'
import { ICompanyData, IPlanCredits, IPlatformNumbersData, ICompanySettingData, ICompanyAccessRightData, ICompanyReferralsData } from '../src/api/types'

const companyList: ICompanyData[] = []
const settings: ICompanySettingData[] = []
const companyCount = 100

for (let i = 1; i < companyCount; i++) {
  const platforms: IPlatformNumbersData[] = []

  for (let k = 1; k < companyCount; k++) {
    settings.push({
      id: k,
      companyId: k,
      messagingPlatform: faker.random.arrayElement(['Twilio', 'Broadcast']),
      messageLength: 300,
      companyAddress: faker.address.streetAddress(),
      useShortCode: faker.random.arrayElement([true, false]),
      useDestinationLink: faker.random.arrayElement([true, false]),
      notifyCreditLimit: faker.random.arrayElement([true, false]),
      notifyUserAdd: faker.random.arrayElement([true, false]),
      notifyCampaignCreation: faker.random.arrayElement([true, false]),
      notifyWorkflowCreation: faker.random.arrayElement([true, false]),
      notifyMenuCreation: faker.random.arrayElement([true, false]),
      maxUser: faker.datatype.number(),
      maxCampaign: faker.datatype.number(),
      maxWorkflow: faker.datatype.number(),
      maxMenu: faker.datatype.number(),
      maxContactsInCampaign: faker.datatype.number(),
      sso: faker.random.arrayElement([true, false]),
      importWorkflows: faker.random.arrayElement([true, false]),
      planStartDate: faker.date.future().getTime(),
      planEndDate: faker.date.future().getTime(),
      importMenus: faker.random.arrayElement([true, false]),
      importUsers: faker.random.arrayElement([true, false]),
      importContacts: faker.random.arrayElement([true, false]),
      importCampaigns: faker.random.arrayElement([true, false]),
      batchProcessDefaultTime: '12:00 AM UTC',
      companylogo: faker.image.image(),
      timeZone: faker.address.timeZone(),
      createdOn: faker.date.future().getTime(),
      updatedOn: faker.date.future().getTime()
    })
  }

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

const accessRights: ICompanyAccessRightData[] = []
for (let i = 0; i < companyCount; i++) {
  [
    ['Campaign', 'campaign', 'ml-25-ratio-i', true],
    ['Menu', 'menu', 'ml-25-ratio-i', true],
    ['Workflow', 'tree', 'ml-25-ratio-i', true],
    ['Contact', 'user', 'ml-25-ratio-i', true]
  ].forEach((element: any, index: number) => {
    accessRights.push({
      id: index,
      companyId: i,
      moduleSelected: true,
      moduleName: element[0],
      logo: element[1],
      create: true,
      show: true,
      list: true,
      edit: true,
      menu: element[3],
      className: element[2],
      createdOn: faker.date.future().getTime(),
      updatedOn: faker.date.future().getTime()
    })
  })
}

const referrals: ICompanyReferralsData[] = []
for (let i = 0; i < companyCount; i++) {
  let freeCredits = 0
  const status = faker.random.arrayElement(['referred', 'initiated', 'completed'])
  if (status === 'initiated') {
    freeCredits = 100
  } else if (status === 'completed') {
    freeCredits = 500
  }
  for (let j = 0; j < 25; j++) {
    referrals.push({
      id: j,
      companyId: i,
      name: faker.company.companyName(),
      phone: faker.phone.phoneNumberFormat(2),
      email: faker.internet.email(),
      description: faker.lorem.sentence(20, 40),
      referralCode: faker.datatype.uuid(),
      freeCredits: freeCredits,
      status: faker.random.arrayElement(['referred', 'initiated', 'completed']),
      createdOn: faker.date.future().getTime(),
      contactPerson: faker.name.findName()
    })
  }
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

export const getReferrals = (req: Request, res: Response) => {
  const { id } = req.params
  const { page = 1, limit = 20, sort } = req.query

  let mockList: ICompanyReferralsData[] = []
  for (const referral of referrals) {
    if (referral.companyId.toString() === id) {
      mockList.push(referral)
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
  let companySetting: ICompanySettingData = {
    id: 0,
    companyId: 1,
    messagingPlatform: '',
    messageLength: 0,
    companyAddress: '',
    useShortCode: true,
    useDestinationLink: true,
    notifyCreditLimit: true,
    notifyUserAdd: true,
    notifyCampaignCreation: true,
    notifyWorkflowCreation: true,
    notifyMenuCreation: true,
    maxUser: 0,
    maxCampaign: 0,
    maxWorkflow: 0,
    maxMenu: 0,
    maxContactsInCampaign: 0,
    sso: true,
    importWorkflows: true,
    planStartDate: '',
    planEndDate: '',
    importMenus: true,
    importUsers: true,
    importContacts: true,
    importCampaigns: true,
    batchProcessDefaultTime: '',
    companylogo: '',
    timeZone: '',
    createdOn: '',
    updatedOn: ''
  }
  for (const setting of settings) {
    if (setting.companyId.toString() === id) {
      companySetting = setting
    }
  }

  for (const company of companyList) {
    if (company.id.toString() === id) {
      return res.json({
        code: 20000,
        data: {
          company,
          companySetting
        }
      })
    }
  }
  return res.json({
    code: 70001,
    message: 'Company not found'
  })
}

export const getCompanyAccessRights = (req: Request, res: Response) => {
  const { id } = req.params
  return res.json({
    code: 20000,
    data: {
      accessRights: accessRights.filter((_) => _.companyId.toString() === id)
    }
  })
}
