const fs = require('node:fs/promises')
const path = require('node:path')

class Template {
  constructor (req, res, engine, getViewFn) {
    this.req = req
    this.res = res
    this.engine = engine || null
    this.getView = getViewFn || getView
  }

  async renderView (view, params) {
    // If there is no template engine, simply return
    if (!this.engine) {
      return
    }
    try {
      const viewFile = await this.getView(view, this.engine ? 'ejs' : 'html')
      const renderedContent = this.engine
        ? await this.engine.render(viewFile, {
          req: this.req, res: this.res, ...params
        })
        : viewFile
      this.res.end(renderedContent)
    } catch (error) {
      console.error('Error rendering template:', error)
      this.res.writeHead(500, { 'Content-Type': 'text/plain' })
      this.res.end('Internal Server Error')
    }
  }
}

const getView = async (view, template = '') => {
  try {
    const _view = Array.isArray(view) ? view : [view]
    const filePath = path.join('src', 'views', ..._view, `index.${template || 'html'}`)
    const html = await fs.readFile(filePath, 'utf-8')

    return html
  } catch (error) {
    console.log(error.message)
    throw Error('Error rendering the view: ' + path.join('views', view, 'index.html'))
  }
}

const getAsset = async (folder, file) => {
  try {
    const asset = await fs.readFile(path.join('src', 'assets', folder, file + '.' + folder))
    return {
      data: asset
    }
  } catch (error) {
    return {
      data: null,
      error
    }
  }
}

const setRenderProperty = async (req, res) => {
  // get the config engine template
  const configEngine = 'ejs'
  const engine = configEngine ? require(configEngine) : null
  const templateObj = new Template(req, res, engine, getView)

  res.render = async (view, params = {}) => {
    templateObj.renderView(view, params)
  }
  res.endWithAsset = async (folder, file) => {
    res.end(await getAsset(folder, file))
  }
}
module.exports = { setRenderProperty }
