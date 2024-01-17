/* eslint-disable no-prototype-builtins */
const { client } = require('../redis')
const { setUrlProperty } = require('./url.js')
const { setRedirectProperty } = require('./redirect.js')
const { setCookiesProperty } = require('./cookies.js')
const { setBodyProperty } = require('./body.js')
const { setIsLoggedInProperty } = require('./loggedIn.js')
const { setRenderProperty } = require('./render.js')

const bootStrap = async (req, res, http) => {
  if (!client.isOpen) client.connect()
  setUrlProperty(req)
  setRedirectProperty(res)
  setCookiesProperty(req, res)
  await setBodyProperty(req)
  await setIsLoggedInProperty(req, res)
  await setRenderProperty(req, res)
  // // Override response.end
  // const originalEnd = http.ServerResponse.prototype.end
  // http.ServerResponse.prototype.end = function (data, encoding, callback) {
  //   originalEnd.call(this, data, encoding, callback)
  // }
}

module.exports = { bootStrap }
