const { generateSessionId } = require('../core/utils')
const { client } = require('../core/redis')
const { authorize } = require('../core/auth')
const refreshSid = async (req, res, next) => {
  try {
    if (req.isLoggedIn && !res.cookies.exist('refresh-sid')) {
      const SID = res.cookies.get('SID')
      console.log(
        'from refresh SID',
        SID
      )
      const session = await client.get(`session:${SID}`)
      if (session && SID) {
        res.cookies.del('SID')
        await client.del(`session:${SID}`)
        await authorize(req, res, session, res.cookies.exist('remember-me'))
      }
    }
  } catch (error) {
    throw new Error('Error refreshing SID: ' + error.message)
  }

  next()
}

module.exports = { refreshSid }
