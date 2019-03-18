# object-treeify

[![Build Status](https://circleci.com/gh/blackflux/object-treeify.png?style=shield)](https://circleci.com/gh/blackflux/object-treeify)
[![Test Coverage](https://img.shields.io/coveralls/blackflux/object-treeify/master.svg)](https://coveralls.io/github/blackflux/object-treeify?branch=master)
[![Dependabot Status](https://api.dependabot.com/badges/status?host=github&repo=blackflux/object-treeify)](https://dependabot.com)
[![Dependencies](https://david-dm.org/blackflux/object-treeify/status.svg)](https://david-dm.org/blackflux/object-treeify)
[![NPM](https://img.shields.io/npm/v/object-treeify.svg)](https://www.npmjs.com/package/object-treeify)
[![Downloads](https://img.shields.io/npm/dt/object-treeify.svg)](https://www.npmjs.com/package/object-treeify)
[![Semantic-Release](https://github.com/blackflux/js-gardener/blob/master/assets/icons/semver.svg)](https://github.com/semantic-release/semantic-release)
[![Gardener](https://github.com/blackflux/js-gardener/blob/master/assets/badge.svg)](https://github.com/blackflux/js-gardener)

Stringify Object as tree structure

```
{
    oranges: {
        'mandarin': {                                          ├─ apples,
            clementine: null,                                  │  ├─ gala
            tangerine: 'so cheap and juicy!'        -=>        │  └─ pink lady
        }                                                      └─ oranges
    },                                                           └─ mandarin
    apples: {                                                       ├─ clementine
        'gala': null,                                               └─ tangerine: so cheap and juicy!
        'pink lady': null
    }
}
```

Project was inspired by [treeify](https://github.com/notatestuser/treeify) and works almost identical. However
the algorithm is much shorter and faster, works without recursion and is very memory efficient. Furthermore
the output is sorted alphabetically as one would expect.

## Install

    $ npm install --save object-treeify

## Usage

<!-- eslint-disable import/no-unresolved -->
```js
const treeify = require('object-treeify');

treeify({
  oranges: {
    mandarin: {
      clementine: null,
      tangerine: 'so cheap and juicy!'
    }
  },
  apples: {
    gala: null,
    'pink lady': null
  }
}, {/* options */});

// =>
// ├─ apples
// │  ├─ gala
// │  └─ pink lady
// └─ oranges
//   └─ mandarin
//      ├─ clementine
//      └─ tangerine: so cheap and juicy!
```

### Features

- Output is sorted alphabetically as one would expect
- Very fast and memory efficient implementation
- Input traversed exactly once
- Dependency free and small in size
- Tests to verify correctness

## Options

### joined

Type: `boolean`<br>
Default: `true`

By default a single string is returned. Can be set to `false` to instead return an array containing lines.

#### spacerNoNeighbour

Type: `string`<br>
Default: `   `

Prefix for depth level when no further neighbour is present.

#### spacerNeighbour

Type: `string`<br>
Default: `│  `

Prefix for depth level when a further neighbour is present.

#### keyNoNeighbour

Type: `string`<br>
Default: `└─ `

Prefix for key when no further neighbour is present.

#### keyNeighbour

Type: `string`<br>
Default: `├─ `

Prefix for key when a further neighbour is present.

## Examples

More examples can be found in the tests.
