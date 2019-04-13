# Convention

Convention parses project structure according to our convention

## Installation

```
npm i @rocketstation/convention
```

## Usage

```javascript
import path from 'path'
import { web } from '@rocketstation/convention'
import webpack from 'webpack'

const convention = web(__dirname)
const structure = convention()

new webpack.ProvidePlugin(
  structure.lib.reduce(([k, v]) => {
    r[k] = v
    return r
  }, {})
)
```

## API

`convention` - process provided project with provided convention

`convention.web`- process provided project with our web convention

## Motivation

We were tired of writing this code again and again

## License

Meta Name is licensed under the [MIT License](http://opensource.org/licenses/MIT)

Created by [RocketStation](http://rstation.io)
