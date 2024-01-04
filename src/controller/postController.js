const { render } = require('../core/render.js')

const postController = {

  index: async (req, res) => {
    res.end(await render('posts'))
  },
  show: async (req, res, slug) => {
    console.log(slug)
    res.end(await render(['posts', 'post']))
  }
}

module.exports = {
  postController
}
