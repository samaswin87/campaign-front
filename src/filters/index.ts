// Set utils function parseTime to filter
export { parseTime, parseDate } from '@/utils'

// Filter for contact number
export const shortcodeFilter = (phone: string) => {
  return (phone.length === 5) ? 'warning' : 'success'
}

// Filter for status
export const statusFilter = (status: string) => {
  const statusMap: { [key: string]: string } = {
    published: 'success',
    draft: 'info',
    deleted: 'danger',
    scheduled: 'warning',
    active: 'success',
    inactive: 'danger',
    delivered: 'success',
    received: 'warning'
  }
  return statusMap[status]
}

// Filter for campaign type status
export const campaignTypeFilter = (status: string) => {
  const statusMap: { [key: string]: string } = {
    scheduled: 'warning',
    immediate: 'success',
    recurring: 'danger',
    one_by_one: 'info'
  }
  return statusMap[status]
}

// Filter to uppercase the first character
export const uppercaseFirstChar = (str: string) => {
  return str.charAt(0).toUpperCase() + str.slice(1)
}
