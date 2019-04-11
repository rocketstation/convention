const mn = require('@rocketstation/meta-name')
const fs = require('fs')
const path = require('path')

const LIB = 'lib'
const SRC = 'src'

const parse = mn({ filters: ['index'] })

const walker = (fn) => {
  const walk = (dir, prefix) =>
    fs.existsSync(dir)
      ? fs
          .readdirSync(dir)
          .reduce((r, v) => {
            const next = path.join(dir, v)

            if (fs.lstatSync(next).isDirectory()) {
              return r.concat(walk(next, prefix))
            }

            if (next.endsWith('.js')) r.push(fn(next, prefix))

            return r
          }, [])
          .filter(Boolean)
      : []

  return walk
}

const parser = (convention = [], dir = __dirname) => {
  const modifiers = convention.map((v) => [].concat(v))

  const lib = path.join(dir, LIB)
  const src = path.join(dir, SRC)

  const walk = walker((v, prefix) => {
    const next = path.relative(dir, v)

    const [modifier, config = {}] =
      modifiers.find((k) => next.includes(k[0])) || []

    if (!modifier) return

    return [
      parse(
        (config.hasModifier === false
          ? next.replace(new RegExp(path.sep + modifier, 'ig'), '')
          : next
        ).replace(prefix, ''),
        config.case
      ),
      config.isDefault ? [next, 'default'] : next,
    ]
  })

  return () => ({
    lib: walk(lib),
    src: fs.readdirSync(src).reduce((r, v) => {
      const app = path.join(src, v)

      if (fs.lstatSync(app).isDirectory()) r[v] = walk(app, path.join(SRC, v))

      return r
    }, {}),
  })
}

Object.defineProperty(exports, '__esModule', { value: true })

exports.web = (web) =>
  parser(
    [
      'actions',
      'assets',
      ['component', { case: 'p', hasModifier: false, isDefault: true }],
      ['configs', { case: 'su', hasModifier: false }],
      'hooks',
      'locales',
      'queries',
      'sagas',
      ['segments', { case: 'p' }],
      ['services', { hasModifier: false }],
      'skins',
    ],
    web
  )

exports.default = parser
