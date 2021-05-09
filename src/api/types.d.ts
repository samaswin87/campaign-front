export interface ITagData {
  id: number
  status: string
  name: string
}

export interface ICompanyData {
  id: number
  status: string
  email: string
  phone: string
  name: string
}

export interface IContactData {
  id: number
  status: string
  firstName: string
  lastName: string
  middleName: string
  email: string
  tags: string[]
  noOfCampaigns: number
  keywords: string[]
  phone: string
  notes: string
  gender: string
  company: string
}

export interface IWorkflowData {
  id: number
  status: string
  company: string
  title: string
  date: string | number
}

export interface ICampaignRecipientData {
  id: number
  status: string
  addedOn: string | number
  campaignId: number
  contactId: number
  data: {}
}

export interface ICampaignData {
  id: number
  status: string
  company: string
  name: string
  body: string
  createdOn: string | number
  type: string
  scheduledOn: string | number
  noOfContacts: number
  recurringAt: string | number
  recurringDays: string[]
  phone: string
}

export interface IArticleData {
  id: number
  status: string
  title: string
  abstractContent: string
  fullContent: string
  sourceURL: string
  imageURL: string
  timestamp: string | number
  platforms: string[]
  disableComment: boolean
  importance: number
  author: string
  reviewer: string
  type: string
  pageviews: number
}

export interface IRoleData {
  key: string
  name: string
  description: string
  routes: any
}

export interface ITransactionData {
  orderId: string
  timestamp: string | number
  username: string
  price: number
  status: string
}

export interface IUserData {
  id: number
  username: string
  password: string
  name: string
  email: string
  phone: string
  avatar: string
  introduction: string
  roles: string[]
}
