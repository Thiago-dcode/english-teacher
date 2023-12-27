const { getAsset } = require('./render.js')
const { responseAssets } = require('./utils.js')

const storageController = {

  css: async (req, res, css) => {
    const result = await getAsset('css', css)

    res.setHeader('Content-Type', 'text/css')
    responseAssets(result, res)
  },
  js: async (req, res, js) => {
    res.setHeader('Content-Type', 'application/javascript')
    const result = await getAsset('js', js)
    responseAssets(result, res)
  }

}

module.exports = {
  storageController
}
