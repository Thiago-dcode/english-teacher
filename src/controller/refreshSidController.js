const { global } = require('../core/global')
const { generateSessionId, getCookieExpiration } = require('../core/utils')

const refreshSidController = {
  index: async (request, response) => {
    console.log('from refreshSidController')
    const isLoggedIn = await request.isLoggedIn()

    const client = global.get('client')
    if (!isLoggedIn) {
      response.end(false)
      return
    }
    if (response.cookies.exist('refresh-sid')) {
      response.end(false)
      return
    }
    try {
     
    } catch (error) {
      console.error('Something went wrong refreshing SID', error)
    }
  }

}

module.exports = {
  refreshSidController
}
