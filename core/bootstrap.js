const { queryStringToObject, getBody, cookieToObj, setCookies } = require('./utils.js')

const bootStrap = async (req, res) => {
  setQueryStringProperty(req)
  setCookiesProperty(req, res)
  await setBodyProperty(req)
  setRedirectProperty(res)
}

const setQueryStringProperty = (req) => {
  const [path, queryString] = req.url.split('?')
  req.path = path
  req.queryString = queryString
  req.searchParams = (key = '') => {
    const searchParams = queryStringToObject(queryString)
    if (!key) return searchParams
    return searchParams[key]
  }
}
const setCookiesProperty = (req, res) => {
  const cookies = cookieToObj(req.headers?.cookie ?? '')

  req.cookies = (key = '') => {
    if (!key) return cookies
    return cookies[key]
  }
  res.cookies = (key, value, params = {
    Path: '/',
    'Max-Age': 60 * 60 * 24 * 365 * 1000,
    httpOnly: true,
    Secure: true
  }) => {
    try {
      setCookies(cookies, key, value, params)

      Object.entries(cookies).forEach(([key, value], i) => {
        const cookie = `${key}=${value}`
        res.setHeader('set-cookie', cookie)
      })
    } catch (error) {
      console.log('Error setting cookies', error.message)
    }
  }
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

const setRedirectProperty = async (res) => {
  res.redirect = (view) => {
    res.writeHead(302, { Location: `http://localhost:3000/${view.replace(/\//g, '')}` })
    res.end()
  }
}
module.exports = { bootStrap }
