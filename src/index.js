const cc = require('@rocketstation/change-case')
const fs = require('fs')
const path = require('path')

const API = {
  assets: { case: 'c', suffix: 'assets' },
  configs: { case: 'su' },
  endpoints: { case: 'c', suffix: 'API' },
  locales: { case: 'c', suffix: 'say' },
  model: { case: 'p', isDefault: true },
  services: { case: 'c' },
}

const WEB = {
  assets: { case: 'c', suffix: 'assets' },
  component: { case: 'p', isDefault: true },
  configs: { case: 'su' },
  hooks: { case: 'c', suffix: 'use' },
  locales: { case: 'c', suffix: 'say' },
  segments: { case: 'p', suffix: 'segments' },
  services: { case: 'c' },
  skins: { case: 'c', suffix: 'skins' },
}

const walker = (parse) => {
  const walk = (dir) => {
    return fs.readdirSync(dir).reduce((r, v) => {
      const next = path.join(dir, v)

      if (fs.lstatSync(next).isDirectory()) return Object.assign(r, walk(next))

      parse(r, next)

      return r
    }, {})
  }

  return walk
}

const parseKey = (match, config) => {
  let key = match[1].split('/')
  if (config.suffix) key.push(config.suffix)

  if (match[2] === 'src') {
    key = key.slice(2)
    if (key.length <= 0) key.push(match[3])
  }

  return cc[config.case](key)
}

const parseVal = (match, config) => {
  return config.isDefault ? [match[0], 'default'] : match[0]
}

const app = (convention) => {
  return walker((r, v) => {
    const match = v.match(
      new RegExp(
        `((lib|src).*)/(${Object.keys(convention).join('|')})(?:/index)?.js$`,
      ),
    )

    if (match) {
      const config = convention[match[3]]

      r[parseKey(match, config)] = parseVal(match, config)
    }
  })
}

const apiApp = app(API)

const webApp = app(WEB)

const api = (dir) => {
  if (fs.existsSync(dir) && fs.lstatSync(dir).isDirectory()) {
    const structure = {}

    const lib = path.resolve(dir, 'lib')
    const src = path.resolve(dir, 'src')

    structure.lib = apiApp(lib)

    structure.src = fs.readdirSync(src).reduce((r, v) => {
      const next = path.resolve(src, v)

      if (fs.lstatSync(next).isDirectory()) {
        r.push({ modules: apiApp(next), name: v })
      }

      return r
    }, [])

    return structure
  }
}

const web = (dir) => {
  if (fs.existsSync(dir) && fs.lstatSync(dir).isDirectory()) {
    const structure = {}

    const lib = path.resolve(dir, 'lib')
    const src = path.resolve(dir, 'src')

    structure.lib = webApp(lib)

    structure.src = fs.readdirSync(src).reduce((r, v) => {
      const next = path.resolve(src, v)

      if (fs.lstatSync(next).isDirectory()) {
        r.push({ modules: webApp(next), name: v })
      }

      return r
    }, [])

    return structure
  }
}

const project = (dir) => {
  return {
    api: api(path.resolve(dir, 'api')),
    web: web(path.resolve(dir, 'web')),
  }
}

module.exports = { api, API, apiApp, app, project, web, WEB, webApp }
