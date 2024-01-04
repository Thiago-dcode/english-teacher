const { render } = require('../core/render.js')

const homeController = {

  index: async (req, res) => {
    res.end(await render('/'))
  }

}

module.exports = {
  homeController
}
