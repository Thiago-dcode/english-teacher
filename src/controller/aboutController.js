const { render } = require('../core/render.js')

const aboutController = {

  index: async (req, res) => {
    res.end(await render('about'))
  }

}

module.exports = {
  aboutController
}
