/* eslint-disable no-console */

import { snakeCase } from 'lodash'

export function convertToHash(jsonObject: Object) {
  const camelCaseObj = {}
  for (const key of Object.keys(jsonObject)) {
    if (Object.prototype.hasOwnProperty.call(jsonObject, key)) {
      camelCaseObj[snakeCase(key)] = jsonObject[key]
    }
  }

  return camelCaseObj
}
