const { generateSessionId, getCookieExpiration } = require('./utils.js')
const { client } = require('./redis.js')
const authorize = async (request, response, user, rememberMe = false) => {
  let sessionId = generateSessionId(20)
  if (request.cookies.exist('SID')) {
    request.cookies.del('SID')
  }
  try {
    const sidKey = `session:${sessionId}`
    let session = await client.get(sidKey)
    while (session) {
      const _user = JSON.parse(session)
      if (_user.id === user.id) {
        client.del(session)
      }
      sessionId = generateSessionId(20)
      session = await client.get(`session:${sessionId}`)
    }
    await client.set(sidKey, JSON.stringify(user))

    const cookieParams = {
      Path: '/',
      httpOnly: true,
      Secure: true,
      SameSite: 'Strict'
    }
    if (rememberMe) {
      cookieParams.expires = getCookieExpiration(30)
      response.cookies.set('remember-me', '1', cookieParams)
    } else {
      if (response.cookies.exist('remember-me')) {
        response.cookies.set('remember-me', '0', {
          expires: (new Date(0))
        })
      }
    }
    response.cookies.set('SID', sessionId, cookieParams)
    cookieParams['Max-Age'] = 20
    response.cookies.set('refresh-sid', '1', cookieParams)
    client.EXPIRE(`session:${sessionId}`, rememberMe ? 86400 * 30 : 86400)
    response.cookies.setCookiesHeader(response)
  } catch (error) {
    throw new Error(`Authenticate Error in Auth.js ${error.message}`)
  }
}

module.exports = {
  authorize
}
