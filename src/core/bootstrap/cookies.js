const { paramsToString } = require('../utils')
class Cookies {
  constructor (cookies) {
    this.cookies = cookies || {}
  }

  get (key = '') {
    if (!key) return this.cookies
    return this.cookies[key]
  }

  del (key) {
    this.cookies[key] = `${''};${paramsToString({
      Expire: (new Date(0))
    })}`
  }

  set (key, value = '', params = {
    Path: '/',
    httpOnly: true,
    Secure: true,
    SameSite: 'Strict'
  }) {
    this.cookies[key] = `${value};${paramsToString(params)}`
  }

  exist (key) {
    return this.cookies.hasOwnProperty(key)
  }

  setCookiesHeader (res) {
    try {
      const arrCookies = Object.entries(this.cookies).reduce((acc, curr) => {
        const [key, value] = curr
        if (!value) {
          return [...acc, `${key}=;Expires=${new Date(0).toUTCString()}`]
        }
        return [...acc, `${key}=${value}`]
      }, [])
      res.setHeader('Set-Cookie', arrCookies)
    } catch (error) {
      console.log('Error setting cookies', error)
    }
  }
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
const setCookiesProperty = (req, res) => {
  const cookies = cookieToObj(req.headers?.cookie ?? '')
  const cookieObj = new Cookies(cookies)
  req.cookies = cookieObj
  res.cookies = cookieObj
}

module.exports = { setCookiesProperty }
