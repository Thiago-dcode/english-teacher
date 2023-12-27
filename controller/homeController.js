const { render } = require('../core/render.js')

const homeController = {

  index: async (req, res) => {
    res.cookies('cookie_3', 'my amazing cookie 3')
    res.end(await render('/'))
  }

}

module.exports = {
  homeController
}
