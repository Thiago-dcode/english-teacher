const { render } = require('../core/render.js')

const postController = {

  index: async (req, res) => {
    console.log('HELLO FROM POSTS')
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
