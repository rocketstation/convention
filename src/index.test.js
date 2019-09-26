const path = require('path')

const convention = require('./index')

it('parses structure according to our convention', () => {
  expect(
    convention.project(path.resolve(__dirname, '..', 'fixtures', 'foo')),
  ).toEqual({
    api: {
      lib: {
        LIB: 'lib/configs.js',
        lib: 'lib/services.js',
        Lib: ['lib/model.js', 'default'],
        LIB_MODULE: 'lib/module/configs.js',
        libApi: 'lib/endpoints.js',
        libAssets: 'lib/assets/index.js',
        libModule: 'lib/module/services.js',
        LibModule: ['lib/module/model.js', 'default'],
        libModuleApi: 'lib/module/endpoints.js',
        libModuleAssets: 'lib/module/assets/index.js',
      },
      src: [
        {
          modules: {
            assets: 'src/app/assets/index.js',
            CONFIGS: 'src/app/configs.js',
            Model: ['src/app/model.js', 'default'],
            MODULE: 'src/app/module/configs.js',
            module: 'src/app/module/services.js',
            Module: ['src/app/module/model.js', 'default'],
            moduleAssets: 'src/app/module/assets/index.js',
            services: 'src/app/services.js',
          },
          name: 'app',
        },
      ],
    },
    web: {
      lib: {
        LIB: 'lib/configs.js',
        lib: 'lib/services.js',
        Lib: ['lib/component.js', 'default'],
        LIB_MODULE: 'lib/module/configs.js',
        libAssets: 'lib/assets/index.js',
        libModule: 'lib/module/services.js',
        LibModule: ['lib/module/component.js', 'default'],
        libModuleAssets: 'lib/module/assets/index.js',
        LibModuleSegments: 'lib/module/segments.js',
        libModuleSkins: 'lib/module/skins.js',
        libModuleUse: 'lib/module/hooks.js',
        LibSegments: 'lib/segments.js',
        libSkins: 'lib/skins.js',
        libUse: 'lib/hooks.js',
      },
      src: [
        {
          modules: {
            assets: 'src/app/assets/index.js',
            Component: ['src/app/component.js', 'default'],
            CONFIGS: 'src/app/configs.js',
            MODULE: 'src/app/module/configs.js',
            module: 'src/app/module/services.js',
            Module: ['src/app/module/component.js', 'default'],
            moduleAssets: 'src/app/module/assets/index.js',
            ModuleSegments: 'src/app/module/segments.js',
            moduleSkins: 'src/app/module/skins.js',
            moduleUse: 'src/app/module/hooks.js',
            Segments: 'src/app/segments.js',
            services: 'src/app/services.js',
            skins: 'src/app/skins.js',
            use: 'src/app/hooks.js',
          },
          name: 'app',
        },
      ],
    },
  })

  expect(
    convention.project(path.resolve(__dirname, '..', 'fixtures', 'bar')),
  ).toEqual({
    api: {
      lib: {
        LIB: 'lib/configs/index.js',
        lib: 'lib/services/index.js',
        Lib: ['lib/model.js', 'default'],
        LIB_MODULE: 'lib/module/configs/index.js',
        libApi: 'lib/endpoints/index.js',
        libAssets: 'lib/assets/index.js',
        libModule: 'lib/module/services/index.js',
        LibModule: ['lib/module/model.js', 'default'],
        libModuleApi: 'lib/module/endpoints/index.js',
        libModuleAssets: 'lib/module/assets/index.js',
      },
      src: [
        {
          modules: {
            assets: 'src/app/assets/index.js',
            CONFIGS: 'src/app/configs/index.js',
            Model: ['src/app/model.js', 'default'],
            MODULE: 'src/app/module/configs/index.js',
            module: 'src/app/module/services/index.js',
            Module: ['src/app/module/model.js', 'default'],
            moduleAssets: 'src/app/module/assets/index.js',
            services: 'src/app/services/index.js',
          },
          name: 'app',
        },
      ],
    },
    web: {
      lib: {
        LIB: 'lib/configs/index.js',
        lib: 'lib/services/index.js',
        Lib: ['lib/component.js', 'default'],
        LIB_MODULE: 'lib/module/configs/index.js',
        libAssets: 'lib/assets/index.js',
        libModule: 'lib/module/services/index.js',
        LibModule: ['lib/module/component.js', 'default'],
        libModuleAssets: 'lib/module/assets/index.js',
        LibModuleSegments: 'lib/module/segments/index.js',
        libModuleSkins: 'lib/module/skins/index.js',
        libModuleUse: 'lib/module/hooks/index.js',
        LibSegments: 'lib/segments/index.js',
        libSkins: 'lib/skins/index.js',
        libUse: 'lib/hooks/index.js',
      },
      src: [
        {
          modules: {
            assets: 'src/app/assets/index.js',
            Component: ['src/app/component.js', 'default'],
            CONFIGS: 'src/app/configs/index.js',
            MODULE: 'src/app/module/configs/index.js',
            module: 'src/app/module/services/index.js',
            Module: ['src/app/module/component.js', 'default'],
            moduleAssets: 'src/app/module/assets/index.js',
            ModuleSegments: 'src/app/module/segments/index.js',
            moduleSkins: 'src/app/module/skins/index.js',
            moduleUse: 'src/app/module/hooks/index.js',
            Segments: 'src/app/segments/index.js',
            services: 'src/app/services/index.js',
            skins: 'src/app/skins/index.js',
            use: 'src/app/hooks/index.js',
          },
          name: 'app',
        },
      ],
    },
  })
})
