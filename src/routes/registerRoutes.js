const { controller } = require('../core/controller')
const { authorize } = require('../middleware/authorize')
const registerRoutes = (route, middleware) => {
  defaultRoutes(route, middleware)
  route.GET('/login', controller.get('auth'))
  route.POST('/login', controller.get('auth', 'login'))
  route.GET('/', controller.get('home'))
  middleware.add(authorize,
    [
      route.GET('/posts/{slug}', controller.get('post', 'show')),
      route.GET('/posts', controller.get('post')),
      route.GET('/teacher', controller.get('teacher')),
      route.POST('/ai', controller.get('openAi')),
      route.POST('/logout', controller.get('auth', 'logout'))
    ]
  )
  route.GET('/about', controller.get('about'))
}

const defaultRoutes = (route) => {
  route.GET('/css/{css}', controller.get('storage', 'css'))
  route.GET('/js/{js}', controller.get('storage', 'js'))
}

module.exports = { registerRoutes }
