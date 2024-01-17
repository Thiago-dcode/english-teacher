const { generateSessionId, getCookieExpiration } = require('./utils.js')
const { client } = require('./redis.js')
// class Auth {
//   constructor (req, res, client) {
//     this.req = req
//     this.res = res
//     this.client = client
//   }

//   async authorize (user, rememberMe = false) {
//     let sessionId = generateSessionId()
//     if (this.req.cookies.exist('SID')) {
//       this.req.cookies.del('SID')
//     }
//     try {
//       const sidKey = `session:${sessionId}`
//       let session = await this.client.get(sidKey)
//       while (session) {
//         const _user = JSON.parse(session)
//         if (_user.id === user.id) {
//           this.client.del(sidKey)
//         }
//         sessionId = generateSessionId()
//         session = await this.client.get(`session:${sessionId}`)
//       }
//       await this.client.set(sidKey, JSON.stringify(user))

//       const cookieParams = {
//         Path: '/',
//         httpOnly: true,
//         Secure: true,
//         SameSite: 'Strict'
//       }
//       if (rememberMe) {
//         cookieParams.expires = getCookieExpiration(30)
//         this.res.cookies.set('remember-me', '1', cookieParams)
//       } else {
//         if (this.res.cookies.exist('remember-me')) {
//           this.res.cookies.del('remember-me')
//         }
//       }
//       this.res.cookies.set('SID', sessionId, cookieParams)
//       cookieParams['Max-Age'] = 60 * 60
//       this.res.cookies.set('refresh-sid', '1', cookieParams)
//       await this.client.EXPIRE(`session:${sessionId}`, rememberMe ? 86400 * 30 : 86400)
//     } catch (error) {
//       throw new Error(`Authenticate Error in Auth.js ${error.message}`)
//     }
//   }
// }

const authorize = async (request, response, user, rememberMe = false) => {
  let sessionId = generateSessionId()
  if (request.cookies.exist('SID')) {
    request.cookies.del('SID')
  }
  try {
    const sidKey = `session:${sessionId}`
    let session = await client.get(sidKey)
    while (session) {
      const _user = JSON.parse(session)
      if (_user.id === user.id) {
        client.del(sidKey)
      }
      sessionId = generateSessionId()
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
        response.cookies.del('remember-me')
      }
    }
    response.cookies.set('SID', sessionId, cookieParams)
    cookieParams['Max-Age'] = 60 * 60
    response.cookies.set('refresh-sid', '1', cookieParams)
    await client.EXPIRE(`session:${sessionId}`, rememberMe ? 86400 * 30 : 86400)
  } catch (error) {
    throw new Error(`Authenticate Error in Auth.js ${error.message}`)
  }
}
const logOut = async (res) => {
  try {
    const SID = res.cookies.get('SID')
    await client.del('session:' + SID)
    res.cookies.del('SID')
  } catch (error) {
    throw new Error(`Error logginOut ${error.message}`)
  }
}

module.exports = {
  authorize, logOut
}
