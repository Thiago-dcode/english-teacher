const { homeController } = require('../controller/homeController.js')
const { aboutController } = require('../controller/aboutController.js')
const { postController } = require('../controller/postController.js')
const { openAiController } = require('../controller/openAiController.js')
const { teacherController } = require('../controller/teacherController.js')
const { authController } = require('../controller/authController.js')
const { storageController } = require('../core/storageController.js')
const defaultRoutes = (route) => {
  route.GET('/css/{css}', storageController.css)
  route.GET('/js/{js}', storageController.js)
}

const registerRoutes = (route) => {
  defaultRoutes(route)
  route.GET('/', homeController.index)
  route.GET('/about', aboutController.index)
  route.GET('/posts', postController.index)
  route.GET('/posts/{slug}', postController.show)
  route.GET('/teacher', teacherController.index)
  route.POST('/ai', openAiController.index)
  route.GET('/login', authController.index)
  route.POST('/login', authController.login)
}
module.exports = { registerRoutes }
