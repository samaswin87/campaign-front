import request from '@/utils/request'

const BASE_API = 'platforms/operators'

export const getNumbers = () =>
  request({
    url: BASE_API + '/numbers',
    method: 'get'
  })
