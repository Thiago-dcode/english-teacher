const { generateSessionId, getCookieExpiration } = require('../core/utils')
const { client } = require('../core/redis')
const refreshSid = async (req, res, next) => {
  console.log('from refresh SID', await req.isLoggedIn, res.cookies.exist('refresh-sid'))
  try {
    if (await req.isLoggedIn && !res.cookies.exist('refresh-sid')) {
      let SID = res.cookies.get('SID')
      const session = await client.get(`session:${SID}`)
      const rememberMe = Boolean(res.cookies.exist('remember-me') && parseInt(res.cookies.get('remember-me')))
      const cookieParams = {
        Path: '/',
        httpOnly: true,
        Secure: true,
        SameSite: 'Strict'
      }
      res.cookies.del('SID')
      client.del(`session:${SID}`)
      SID = generateSessionId(20)
      await client.set(`session:${SID}`, JSON.stringify(session))
      if (rememberMe) {
        cookieParams.expires = getCookieExpiration(30)
      }
      res.cookies.set('SID', SID, cookieParams)
      console.log('SID', SID)
      client.EXPIRE(`session:${SID}`, rememberMe ? 86400 * 30 : 86400)
      cookieParams['Max-Age'] = 20
      res.cookies.set('refresh-sid', '1', cookieParams)
      res.cookies.setCookiesHeader(res)
    }
  } catch (error) {
    console.log('Error refreshing SID', error.message)
  } finally {

  }
  return next()
}

module.exports = { refreshSid }
