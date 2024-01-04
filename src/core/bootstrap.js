/* eslint-disable no-prototype-builtins */
const { queryStringToObject, getBody, cookieToObj, paramsToString } = require('./utils.js')
const { global } = require('./global.js')
const bootStrap = async (req, res) => {
  setQueryStringProperty(req)
  setCookiesProperty(req, res)
  await setBodyProperty(req)
  setRedirectProperty(res)
}

const setQueryStringProperty = (req) => {
  const [path, queryString] = req.url.split('?')
  let url = ''
  if (path.length <= 1)url = '/'
  else {
    if (path[path.length - 1] === '/') {
      url = path.slice(0, -1)
    } else url = path
  }
  req.path = url
  req.queryString = queryString
  req.searchParams = (key = '') => {
    const searchParams = queryStringToObject(queryString)
    if (!key) return searchParams
    return searchParams[key]
  }
}
const setCookiesProperty = (req, res) => {
  /*
    cookies = {
      cookie_1: value;param1;param2...,
      cookie_2: value;param1;param2...
    }
  */
  global.set('cookies', cookieToObj(req.headers?.cookie ?? ''))

  res.cookies = {
    get: (key = '') => {
      const cookies = global.get('cookies')
      if (!key) return cookies
      return cookies[key]
    },
    delete: (key) => {
      const cookies = global.get('cookies')
      cookies[key] = ''
      global.set('cookies', cookies)
      setCookies()
    },
    set: (key, value = '', params = {
      Path: '/',
      httpOnly: true,
      Secure: true
    }) => {
      const cookies = global.get('cookies')
      cookies[key] = `${value};${paramsToString(params)}`
      global.set('cookies', cookies)
      setCookies()
    },
    exist: (key) => {
      return global.get('cookies').hasOwnProperty(key)
    }
  }
  global.set('res', res)
  global.set('req', req)
}

const setBodyProperty = async (req) => {
  if (req.method !== 'GET') {
    try {
      const data = await getBody(req)
      req.body = data
    } catch (error) {
      console.log('Error parsing body', error.message)
    }
  }
}
const setCookies = () => {
  try {
    const res = global.get('res')
    const cookies = global.get('cookies')
    const arrCookies = Object.entries(cookies).reduce((acc, curr) => {
      const [key, value] = curr
      if (!value) {
        return [...acc, `${key}=;Expires=${new Date(0).toUTCString()}`]
      }
      return [...acc, `${key}=${value}`]
    }, [])
    res.setHeader('Set-Cookie', arrCookies)
  } catch (error) {
    console.log('Error setting cookies', error.message)
  }
}

const setRedirectProperty = async (res) => {
  res.redirect = (view) => {
    res.writeHead(302, { Location: `http://localhost:3000/${view.replace(/\//g, '')}` })
    res.end()
  }
}
module.exports = { bootStrap }
