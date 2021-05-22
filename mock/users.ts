import faker from 'faker'
import { Response, Request } from 'express'
import { IUserData, ITimeLineData } from '../src/api/types'

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

const userList: IUserData[] = [
  {
    id: 0,
    companyId: 1,
    username: 'admin',
    password: 'any',
    name: 'Super Admin',
    avatar: '/img/icons/logo.png',
    introduction: 'I am a super administrator',
    email: 'admin@test.com',
    phone: '1234567890',
    roles: ['admin'],
    timelines: timelines
  },
  {
    id: 1,
    companyId: 2,
    username: 'editor',
    password: 'any',
    name: 'Normal Editor',
    avatar: '/img/icons/logo.png',
    introduction: 'I am an editor',
    email: 'editor@test.com',
    phone: '1234567890',
    roles: ['editor'],
    timelines: timelines
  }
]
const userCount = 100

for (let i = 2; i < userCount; i++) {
  userList.push({
    id: i,
    username: 'user_' + faker.random.alphaNumeric(9),
    password: faker.random.alphaNumeric(20),
    name: faker.name.findName(),
    avatar: faker.image.imageUrl(),
    introduction: faker.lorem.sentence(20),
    email: faker.internet.email(),
    phone: faker.phone.phoneNumberFormat(2),
    roles: ['visitor'],
    companyId: i,
    timelines: timelines
  })
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
    const lowerCaseName = user.name.toLowerCase()
    return !(name && lowerCaseName.indexOf((name as string).toLowerCase()) < 0)
  })
  return res.json({
    code: 20000,
    data: {
      items: users
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
