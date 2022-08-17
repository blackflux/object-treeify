# object-treeify

[![Build Status](https://circleci.com/gh/blackflux/object-treeify.png?style=shield)](https://circleci.com/gh/blackflux/object-treeify)
[![NPM](https://img.shields.io/npm/v/object-treeify.svg)](https://www.npmjs.com/package/object-treeify)
[![Downloads](https://img.shields.io/npm/dt/object-treeify.svg)](https://www.npmjs.com/package/object-treeify)

Stringify Object as tree structure

```
{
    oranges: {
        'mandarin': {                                          ├─ oranges
            clementine: null,                                  │  └─ mandarin
            tangerine: 'so cheap and juicy!'        -=>        │     ├─ clementine
        }                                                      │     └─ tangerine: so cheap and juicy!
    },                                                         └─ apples
    apples: {                                                     ├─ gala
        'gala': null,                                             └─ pink lady
        'pink lady': null
    }
}
```

Project was inspired by [treeify](https://github.com/notatestuser/treeify) and works almost identical. However
the algorithm is much shorter and faster, works without recursion and is very memory efficient. Furthermore
the output can be sorted using a custom comparator function.

## Install

    $ npm install --save object-treeify

## Usage

<!-- eslint-disable import/no-unresolved,import/no-extraneous-dependencies -->
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
// ├─ oranges
// │  └─ mandarin
// │     ├─ clementine
// │     └─ tangerine: so cheap and juicy!
// └─ apples
//    ├─ gala
//    └─ pink lady
```

### Features

- Allows for custom sorting
- Very fast and memory efficient implementation
- Input traversed exactly once
- Dependency free and small in size
- Tests to verify correctness
- Handles circular references

## Options

### joined

Type: `boolean`<br>
Default: `true`

By default a single string is returned. Can be set to `false` to instead return an array containing lines.

#### spacerNoNeighbour

Type: `string`<br>
Default: `   `

Prefix for depth level when no further neighbour is present.

#### spacerNeighbour

Type: `string`<br>
Default: `│  `

Prefix for depth level when a further neighbour is present.

#### keyNoNeighbour

Type: `string`<br>
Default: `└─ `

Prefix for key when no further neighbour is present.

#### keyNeighbour

Type: `string`<br>
Default: `├─ `

Prefix for key when a further neighbour is present.

#### separator

Type: `string`<br>
Default: `: `

Used to separate node key from node value.

#### renderFn

Type: `function`<br>
Default: `(node) => (['boolean', 'string', 'number'].includes(typeof node) ? node : undefined)`

Can be used to overwrite the node rendering logic. Node is rendered if result is not equal `undefined`.

#### sortFn

Type: `function`<br>
Default: `null`

Function that defines the key sort order. Defaults to ordering of `Object.keys(...)`, which is typically insertion order.

#### breakCircularWith

Type: `string` or `null`<br>
Default: ` (circular ref.)`

When `string`, circular references are broken with that string, at a minor performance cost.

## Examples

More examples can be found in the tests.
