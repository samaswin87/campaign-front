export interface ITagData {
  id: number
  status: string
  name: string
  companyId: number
  archivedAt: string | number
  createdAt: string | number
  updatedAt: string | number
}

export interface IPlatformNumbersData {
  id: number
  name: string
  status: string
  companyId: number
  phone: string
  shortCode: boolean
  archivedAt: string | number
  createdAt: string | number
  updatedAt: string | number
}
export interface IPlanCredits {
  id: number
  companyId: number
  credits: number
  month: string
  additionalCredits: number
  inbounds: number
  outbounds: number
  voiceInbounds: number
  voiceOutbounds: number
  availedInbounds: number
  availedOutbounds: number
  availedVoiceInbounds: number
  availedVoiceOutbounds: number
  createdAt: string | number
  updatedAt: string | number
}

export interface ICompanyData {
  id: number
  status: string
  email: string
  phone: string
  name: string
  plan: string
  planCredit: number
  callForwarding: boolean
  totalCredits: number
  remainingCredits: number
  messageForward: boolean
  usedPercentage: number
  apiToken: string
  planCredits: IPlanCredits[]
  platforms: IPlatformNumbersData[]
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
  lastReplyAt: string | number
  firstReplyAt: string | number
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
  finalResponse: IWorkflowFinalResponseData
  promts: IWorkflowPromtData[]
  conversations: IWorkflowConversationsData[]
}

export interface IMenuFinalResponseData {
  id: number
  menuId: number
  body: string
  destinationURL: string
  createdOn: string | number
  updatedOn: string | number
}

export interface IMenuPromtData {
  id: number
  body: string
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
  lastReplyAt: string | number
  firstReplyAt: string | number
}
export interface IMenuData {
  id: number
  status: string
  company: string
  name: string
  createdOn: string | number
  noOfContacts: number
  phone: string
  confidential: boolean
  finalResponse: IMenuFinalResponseData
  promts: IMenuPromtData[]
  conversations: IMenuConversationsData[]
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
export interface ITimeLineData {
  id: number
  userId: number
  timestamp: string | number
  title: string
  content: string
}
export interface IUserData {
  id: number
  status: string
  username: string
  password: string
  firstName: string
  lastName: string
  email: string
  phone: string
  avatar: string
  introduction: string
  roles: string[]
  companyId: number
  timelines: ITimeLineData[]
  createdOn: string | number
  updatedOn: string | number
}

export interface IUserSettingData {
  id: number
  userId: number
  notifyWorkflow: boolean
  notifyMenu: boolean
  notifyCampaign: boolean
  notifyCreditLimit: boolean
  timeZone: string
}

export interface IUserAccessRightData {
  id: number
  userId: number
  moduleName: string
  moduleSelected: boolean
  logo: string
  create: boolean
  show: boolean
  list: boolean
  edit: boolean
  menu: boolean
  className: string
  createdOn: string | number
  updatedOn: string | number
}

export interface ICompanySettingData {
  id: number
  companyId: number
  messagingPlatform: string
  messageLength: number
  companyAddress: string
  useShortCode: boolean
  useDestinationLink: boolean
  notifyCreditLimit: boolean
  notifyUserAdd: boolean
  notifyCampaignCreation: boolean
  notifyWorkflowCreation: boolean
  notifyMenuCreation: boolean
  maxUser: number
  maxCampaign: number
  maxWorkflow: number
  maxMenu: number
  maxContactsInCampaign: number
  sso: boolean
  importWorkflows: boolean
  planStartDate: string | number
  planEndDate: string | number
  importMenus: boolean
  importUsers: boolean
  importContacts: boolean
  importCampaigns: boolean
  batchProcessDefaultTime: string
  companylogo: string
  timeZone: string
  createdOn: string | number
  updatedOn: string | number
}

export interface ICompanyAccessRightData {
  id: number
  companyId: number
  moduleName: string
  moduleSelected: boolean
  logo: string
  create: boolean
  show: boolean
  list: boolean
  edit: boolean
  menu: boolean
  className: string
  createdOn: string | number
  updatedOn: string | number
}
