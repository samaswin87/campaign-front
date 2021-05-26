import faker from 'faker'
import { Response, Request } from 'express'
import { IUserData, ITimeLineData, IUserAccessRightData } from '../src/api/types'

const timelines:ITimeLineData[] = []
for (let index = 1; index < 10; index++) {
  timelines.push({
    id: index,
    userId: 0,
    timestamp: faker.date.past().getTime(),
    title: faker.lorem.sentence(6, 12),
    content: faker.lorem.sentence(20, 40)
  })
}
const userCount = 30
const accessRights: IUserAccessRightData[] = []

for (let i = 0; i < userCount; i++) {
  [
    ['Campaign', 'campaign'],
    ['Menu', 'menu'],
    ['Workflow', 'tree'],
    ['Contact', 'user'],
    ['User', 'users'],
    ['Company', 'company']
  ].forEach((element: any, index: number) => {
    accessRights.push({
      id: index,
      userId: i,
      moduleSelected: true,
      moduleName: element[0],
      logo: element[1],
      create: true,
      show: true,
      list: true,
      edit: true,
      createdOn: faker.date.future().getTime(),
      updatedOn: faker.date.future().getTime()
    })
  })
}

const userList: IUserData[] = [
  {
    id: 0,
    companyId: 1,
    username: 'admin',
    status: 'active',
    password: 'any',
    firstName: 'Super',
    lastName: 'Admin',
    avatar: '/img/icons/logo.png',
    introduction: 'I am a super administrator',
    email: 'admin@test.com',
    phone: '1234567890',
    roles: ['admin'],
    timelines: timelines,
    createdOn: faker.date.future().getTime(),
    updatedOn: faker.date.future().getTime()
  },
  {
    id: 1,
    companyId: 2,
    status: 'active',
    username: 'editor',
    password: 'any',
    firstName: 'Normal',
    lastName: 'Editor',
    avatar: '/img/icons/logo.png',
    introduction: 'I am an editor',
    email: 'editor@test.com',
    phone: '1234567890',
    roles: ['editor'],
    timelines: timelines,
    createdOn: faker.date.future().getTime(),
    updatedOn: faker.date.future().getTime()
  }
]

for (let k = 1; k < 100; k++) {
  for (let i = 2; i < userCount; i++) {
    userList.push({
      id: i,
      username: 'user_' + faker.random.alphaNumeric(9),
      status: faker.random.arrayElement(['active', 'inactive']),
      password: faker.random.alphaNumeric(20),
      firstName: faker.name.firstName(),
      lastName: faker.name.lastName(),
      avatar: faker.image.imageUrl(),
      introduction: faker.lorem.sentence(20),
      email: faker.internet.email(),
      phone: faker.phone.phoneNumberFormat(2),
      roles: ['visitor'],
      companyId: k,
      timelines: timelines,
      createdOn: faker.date.future().getTime(),
      updatedOn: faker.date.future().getTime()
    })
  }
}
export const register = (req: Request, res: Response) => {
  return res.json({
    code: 20000
  })
}

export const login = (req: Request, res: Response) => {
  const { username } = req.body
  for (const user of userList) {
    if (user.username === username) {
      return res.json({
        code: 20000,
        data: {
          accessToken: username + '-token'
        }
      })
    }
  }
  return res.status(400).json({
    code: 50004,
    messaege: 'Invalid User'
  })
}

export const logout = (req: Request, res: Response) => {
  return res.json({
    code: 20000
  })
}

export const getUsers = (req: Request, res: Response) => {
  const { name } = req.query
  const users = userList.filter(user => {
    const lowerCaseName = (user.firstName + ' ' + user.lastName).toLowerCase()
    return !(name && lowerCaseName.indexOf((name as string).toLowerCase()) < 0)
  })
  return res.json({
    code: 20000,
    data: {
      items: users
    }
  })
}

export const getUsersByCompany = (req: Request, res: Response) => {
  const { id } = req.params
  const { page = 1, limit = 20, sort } = req.query

  let mockList: IUserData[] = []
  for (const user of userList) {
    if (user.companyId.toString() === id) {
      mockList.push(user)
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

export const getUserInfo = (req: Request, res: Response) => {
  // Mock data based on access token
  return res.json({
    code: 20000,
    data: {
      user: req.header('X-Access-Token') === 'admin-token' ? userList[0] : userList[1]
    }
  })
}

export const getUser = (req: Request, res: Response) => {
  const { id } = req.params
  for (const user of userList) {
    if (user.id.toString() === id) {
      return res.json({
        code: 20000,
        data: {
          user
        }
      })
    }
  }
  return res.json({
    code: 70001,
    message: 'User not found'
  })
}

export const getAccessRights = (req: Request, res: Response) => {
  const { id } = req.params
  return res.json({
    code: 20000,
    data: {
      accessRights: accessRights.filter((_) => _.userId.toString() === id)
    }
  })
}

export const getUserByName = (req: Request, res: Response) => {
  const { username } = req.params
  for (const user of userList) {
    if (user.username === username) {
      return res.json({
        code: 20000,
        data: {
          user
        }
      })
    }
  }
  return res.status(400).json({
    code: 50004,
    messaege: 'Invalid User'
  })
}

export const updateUser = (req: Request, res: Response) => {
  const { username } = req.params
  const { user } = req.body
  for (const v of userList) {
    if (v.username === username) {
      return res.json({
        code: 20000,
        data: {
          user
        }
      })
    }
  }
  return res.status(400).json({
    code: 50004,
    messaege: 'Invalid User'
  })
}

export const deleteUser = (req: Request, res: Response) => {
  return res.json({
    code: 20000
  })
}
