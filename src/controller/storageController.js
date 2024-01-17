const storageController = {

  css: async (req, res, css) => {
    console.log(css)

    res.setHeader('Content-Type', 'text/css')
    res.endWithAsset('css', css)
  },
  js: async (req, res, js) => {
    res.setHeader('Content-Type', 'application/javascript')

    res.endWithAsset('js', js)
  }

}

module.exports = {
  storageController
}
