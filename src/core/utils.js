/* eslint-disable no-prototype-builtins */
const { config } = require('dotenv')
const { v4: uuidv4 } = require('uuid')
config()

function responseAssets (result, res) {
  if (!result.data || result?.error) {
    switch (result?.error.code) {
      case 'ENOENT':
        res.statusCode = 404
        res.end(result?.error.message)
        break

      default:
        break
    }
  }
  res.end(result.data)
}

function paramsToString (params) {
  try {
    const paramsEntries = Object.entries(params)
    const paramsString = paramsEntries.reduce((acc, curr, i) => {
      let str = ''
      const key = curr[0]
      const value = curr[1]
      if (typeof value === 'boolean') {
        if (!value) str = ''
        else str = i !== paramsEntries.length - 1 ? `${key};` : key
      } else {
        str = i !== paramsEntries.length - 1 ? `${key}=${value};` : `${key}=${value}`
      }
      return acc + ` ${str}`
    }, '')

    return paramsString
  } catch (error) {
    console.log('ERROR SETTING IN appendCookies()', error.message)
  }
}
function generateSessionId () {
  return uuidv4() // ⇨ '1b9d6bcd-bbfd-4b2d-9b5d-ab8dfbbd4bed'
}
const getCookieExpiration = (days) => {
  const expirationDate = new Date()
  expirationDate.setDate(expirationDate.getDate() + days)
  return expirationDate.toUTCString()
}

const env = {
  get: (key) => {
    return process.env[key]
  }
}

module.exports = {
  responseAssets, paramsToString, generateSessionId, getCookieExpiration, env
}
