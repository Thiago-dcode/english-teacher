class Middleware {
  currentMiddleware = -1
  queue = []

  constructor (req, res) {
    this.req = req
    this.res = res
  }

  add (middleware, params = []) {
    if (typeof middleware !== 'function') {
      throw new Error('MIDDLEWARE MUST BE A FUNCTION')
    }
    if (params.length > 0) {
      this.queue.push(() => {
        middleware(this.req, this.res, params, this.next.bind(this))
      })
      return
    }
    this.queue.push(() => {
      middleware(this.req, this.res, this.next.bind(this))
    })
  }

  next () {
    try {
      this.currentMiddleware++
      if (this.currentMiddleware < this.queue.length) {
        this.queue[this.currentMiddleware]()
      }
    } catch (error) {
      throw new Error(`Error in middleware ${this.currentMiddleware}: ${error.message}`)
    }
  }
}

const initMiddleWare = (req, res) => {
  return new Middleware(req, res)
}
module.exports = { initMiddleWare }
