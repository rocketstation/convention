const path = require('path')

const { web } = require('./index')

it('parses web structure according to our convention', () => {
  const structure = web(path.resolve(__dirname, '..', 'fixtures', 'web'))

  expect(structure()).toEqual({
    lib: [['LibModule', ['lib/module/component.js', 'default']]],
    src: {
      user: [
        ['moduleActions', 'src/user/module/actions.js'],
        ['moduleAssets', 'src/user/module/assets/index.js'],
        ['Module', ['src/user/module/component.js', 'default']],
        ['MODULE', 'src/user/module/configs/index.js'],
        ['moduleHooks', 'src/user/module/hooks.js'],
        ['moduleQueries', 'src/user/module/queries.js'],
        ['moduleSagas', 'src/user/module/sagas.js'],
        ['ModuleSegments', 'src/user/module/segments.js'],
        ['module', 'src/user/module/services.js'],
        ['moduleSkins', 'src/user/module/skins.js'],
      ],
    },
  })
})
