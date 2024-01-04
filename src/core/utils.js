/* eslint-disable no-prototype-builtins */
function queryStringToObject (queryString) {
  const obj = {}
  if (!queryString) return obj
  const pairs = queryString.split('&')
  pairs.forEach(pair => {
    const [key, value] = pair.split('=')
    obj[key] = decodeURIComponent(value || '')
  })

  return obj
}
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

function getBody (req) {
  if (req.method === 'GET') return
  return new Promise((resolve, reject) => {
    let body = ''

    req.on('data', chunk => {
      body += chunk.toString() // Accumulate the incoming data
    })

    req.on('end', () => {
      let parsedBody = {}
      try {
        if (body.charAt(0) === '{') {
          parsedBody = JSON.parse(body)
        } else {
          parsedBody = body.split('&').reduce((acc, curr) => {
            const [key, value] = curr.split('=')

            return { ...acc, [key]: value }
          }, {})
        }
        resolve(parsedBody)
      } catch (error) {
        reject(error)
      }
    })

    req.on('error', error => {
      console.log(error)
      reject(error)
    })
  })
}
function cookieToObj (rawCookies = '', keyToAvoid = '') {
  let cookies = {}
  if (rawCookies) {
    cookies = rawCookies.split(';').reduce((prev, cookie) => {
      const [key, value] = cookie.split('=')
      return { ...prev, [key.trim()]: value }
    }, {})
  }
  if (cookies.hasOwnProperty(keyToAvoid)) {
    delete cookies[keyToAvoid]
  } return cookies
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
function generateSessionId (length) {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
  const charLength = characters.length
  let sessionId = ''

  for (let i = 0; i < length; i++) {
    sessionId += characters.charAt(Math.floor(Math.random() * charLength))
  }

  return sessionId
}

module.exports = {
  queryStringToObject, responseAssets, getBody, cookieToObj, paramsToString, generateSessionId
}
