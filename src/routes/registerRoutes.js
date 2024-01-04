const { authorize } = require('../core/auth.js')
const { homeController } = require('../controller/homeController.js')
const { aboutController } = require('../controller/aboutController.js')
const { postController } = require('../controller/postController.js')
const { openAiController } = require('../controller/openAiController.js')
const { teacherController } = require('../controller/teacherController.js')
const { authController } = require('../controller/authController.js')
const { storageController } = require('../core/storageController.js')

const registerRoutes = (route, middleware) => {
  defaultRoutes(route, middleware)
  route.GET('/login', authController.index)
  route.POST('/login', authController.login)
  route.GET('/', homeController.index)
  middleware.set(authorize, [
    [route.GET('/about', aboutController.index),
      route.GET('/posts', postController.index)]
  ])
  route.GET('/about', aboutController.index)
  route.GET('/posts', postController.index)
  route.GET('/posts/{slug}', postController.show)
  route.GET('/teacher', teacherController.index)
  route.POST('/ai', openAiController.index)
}

const defaultRoutes = (route) => {
  route.GET('/css/{css}', storageController.css)
  route.GET('/js/{js}', storageController.js)
}

module.exports = { registerRoutes }
