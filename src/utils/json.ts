/* eslint-disable no-console */

import { snakeCase, camelCase, isPlainObject, isArray } from 'lodash'

export function convertToHash(jsonObject: Object) {
  const camelCaseObj = {}
  for (const key of Object.keys(jsonObject)) {
    if (Object.prototype.hasOwnProperty.call(jsonObject, key)) {
      camelCaseObj[snakeCase(key)] = jsonObject[key]
    }
  }

  return camelCaseObj
}

export function convertToJSON(jsonObject: Object) {
  if (isPlainObject(jsonObject)) {
    const n = {}
    Object.keys(jsonObject).forEach(k => (n[camelCase(k)] = convertToJSON(jsonObject[k])))
    return n
  } else if (isArray(jsonObject)) jsonObject.map(i => convertToJSON(i))
  return jsonObject
}
