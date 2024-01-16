const { client } = require('../redis')

const setIsLoggedInProperty = async (request) => {
  const isLogged = await isLoggedIn(request)
  request.isLoggedIn = isLogged
}

const isLoggedIn = async (request) => {
  try {
    const SID = request.cookies.get('SID')

    if (!SID) return false
    const userSess = await client.GET(`session:${SID}`)
    return !!userSess // Returning true if userSess is truthy, false otherwise
  } catch (error) {
    // TODO: handle error
    console.error('Error checking login:', error)
    return false
  }
}

module.exports = { setIsLoggedInProperty }
