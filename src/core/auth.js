const { generateSessionId } = require('./utils.js')
const { client } = require('./redis.js')
const { global } = require('./global.js')

const authenticate = async (user) => {
  const sessionId = generateSessionId(20)
  const response = global.get('res')
  try {
    await client.connect()
    await client.set(`session:${sessionId}`, JSON.stringify(user))
    response.cookies.set('SID', sessionId, {
      Path: '/',
      httpOnly: true,
      Secure: true,
      SameSite: 'Strict'
    })
    response.cookies.delete('cookie_4')
  } catch (error) {
    throw new Error(`Authenticate Error in Auth.js ${error.message}`)
  } finally {
    await client.disconnect()
  }
}
const authorize = async (routes, next) => {
  const request = global.get('req')
  const { method, path } = request
  const response = global.get('res')

  // check if the current request route exists in routes array
  let routeExist = false
  for (let i = 0; i < routes.length; i++) {
    const route = routes[i]
    if (!(route.method === method && route.url === path)) {
      routeExist = false
      continue
    } else {
      routeExist = true
      break
    }
  }
  if (!routeExist) return next()

  const SID = response.cookies.get('SID')
  console.log('SID', SID)
  if (!SID) {
    response.statusCode = 401
    return response.end('Unauthorized')
  }
  try {
    await client.connect()
    const session = await client.get(`session:${SID}`)
    if (!session) {
      response.statusCode = 401
      return response.end('Unauthorized')
    }
    return next()
  } catch (error) {
    throw new Error(`Authenticate Error in Auth.js ${error.message}`)
  }
}
module.exports = {
  authenticate, authorize
}
