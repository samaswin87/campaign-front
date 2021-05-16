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
  customColumns: {}
}

export interface IWorkflowData {
  id: number
  status: string
  company: string
  name: string
  createdOn: string | number
  noOfContacts: number
  phone: string
  confidential: boolean
}

export interface IWorkflowFinalResponseData {
  id: number
  workflowId: number
  body: string
  destinationURL: string
  createdOn: string | number
  updatedOn: string | number
}

export interface IWorkflowPromtData {
  id: number
  body: string
  name: string
  default: string
  order: number
  workflowId: number
  date: string | number
}

export interface IWorkflowConversationsData {
  id: number
  type: string
  contact: string
  message: string
  workflowId: number
  date: string | number
}
export interface IMenuData {
  id: number
  status: string
  company: string
  name: string
  createdOn: string | number
  noOfContacts: number
  phone: string
}

export interface IMenuFinalResponseData {
  id: number
  menuId: number
  body: Text
  destinationURL: string
  createdOn: string | number
  updatedOn: string | number
}

export interface IMenuPromtData {
  id: number
  body: JSON
  name: string
  default: string
  order: number
  menuId: number
  date: string | number
}

export interface IMenuConversationsData {
  id: number
  type: string
  contact: string
  message: string
  menuId: number
  date: string | number
}
export interface ICampaignConversationsData {
  id: number
  type: string
  contactId: number
  message: string
  campaignId: number
  date: string | number
}

export interface ICampaignRecipientData {
  id: number
  status: string
  addedOn: string | number
  phone: string
  data: {}
  tags: string[]
  lastReplyAt: string | number
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
