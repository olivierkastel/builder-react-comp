# builder-react-comp
[![npm version](https://badge.fury.io/js/builder-react-comp.svg)](https://badge.fury.io/js/builder-react-comp)

React component archetype for [builder][builder-link].
It brings a lot of features that help you to make a react component.

It is used by [react-component-seed][react-component-seed-link]. 
Please check this project to understand how to use these builder tasks.

## Getting started
You could check [builder][builder-link] if you want to understand how it works.

```
npm install --save-dev builder
npm install --save builder-react-comp
npm install --save-dev builder-react-comp-dev
```

```yaml
# .builderrc
---
archetypes:
  - builder-react-comp
```

## Tasks
### Build
* `builder run build:commomjs`: Compile the component to ES5. Commonjs module compatible. The output folder is `./lib`
* `builder run build:es`: Compile the component to ES5. ES2015 module compatible. The output folder is `./es`
* `builder run build:typescript`: Compile the component to ES2015. ES2015 module compatible. The output folder is `./libTS` and generate typescript definition files
* `builder run build`: Execute the 3 previous tasks in parallel

### Server playground
* `builder run serve:playground`: Serve the component playground. Check `http://localhost:3000` :smile:

### Test
* `builder run test:all`: Test the component once
* `builder run test:all:watch`: Test the component once and enter in watch mode (usefull for tdd)
* `builder run test:all:coverage`: Test the component and generate test coverage

### Typings
* `builder run typings:install`: Install type definition files

### Linters
* `builder run eslint`: Run eslint on the project
* `builder run tslint`: Run tslint on the project
* `builder run lint`: Run the 2 previous tasks

### Release the component
* `builder run release -- semverCompatibleVersion`: **Only if you are using git flow**. Create a release of the component. `semverCompatipleVersion` must be valid according to [semver][semver-link]
  This will update `package.json` and create a git flow release

## Builder Help

```
$ builder help builder-react-comp
Usage:

  builder <action> <task(s)>

Actions:

  run, concurrent, envs, help
  
Tasks:

  build:commonjs
    [builder-react-comp] rimraf ./lib && BABEL_ENV=commonjs babel ./libTs/src --out-dir ./lib --ignore **/__tests__/**,**/*.d.js

  build:es
    [builder-react-comp] rimraf ./es && BABEL_ENV=es babel ./libTs/src --out-dir ./es --ignore **/__tests__/**,**/*.d.js

  build:typescript
    [builder-react-comp] rimraf ./libTs && tsc -p .

  serve:playground
    [builder-react-comp] BABEL_ENV=development node node_modules/builder-react-comp/lib/index serve playground

  test:all
    [builder-react-comp] BABEL_ENV=commonjs jest --config node_modules/builder-react-comp/config/jest/config.json --colors

  test:all:coverage
    [builder-react-comp] BABEL_ENV=commonjs jest --config node_modules/builder-react-comp/config/jest/config.coverage.json --colors

  test:all:watch
    [builder-react-comp] BABEL_ENV=commonjs jest --config node_modules/builder-react-comp/config/jest/config.json --watch --watchExtensions ts,tsx,js --colors

  typings:install
    [builder-react-comp] typings install

  build
    [builder-react-comp] builder run build:typescript && builder concurrent build:commonjs build:es

  eslint
    [builder-react-comp] eslint --color '{playground,src}/**/*.{js,jsx}'

  lint
    [builder-react-comp] builder concurrent eslint tslint

  prepublish
    [builder-react-comp] npm run builder:compile

  release
    [builder-react-comp] node node_modules/builder-react-comp/lib/index release

  tslint
    [builder-react-comp] tslint -c tslint.json '{playground,src}/**/*.{ts,tsx}'
```

[builder-link]: http://builder.formidable.com/
[react-component-seed-link]: https://github.com/hourliert/react-component-seed
[semver-link]: https://github.com/npm/node-semver
