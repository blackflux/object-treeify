const expect = require('chai').expect;
const treeify = require('../src/index');


describe('Testing Treeify', () => {
  it('Testing Comprehensive Null Example', () => {
    expect(treeify({
      vendor: {
        'index.js': null
      },
      page: {
        hello: {
          'index.css': null
        },
        world: {
          'index.css': null,
          'index.js': null
        }
      }
    })).to.deep.equal([
      '├─ page',
      '│  ├─ world',
      '│  │  ├─ index.js',
      '│  │  └─ index.css',
      '│  └─ hello',
      '│     └─ index.css',
      '└─ vendor',
      '   └─ index.js'
    ].join('\n'));
  });

  it('Testing Not Joined Custom', () => {
    expect(treeify({
      vendor: {
        'index.js': null
      },
      page: {
        hello: {
          'index.css': null
        },
        world: {
          'index.css': null,
          'index.js': null
        }
      }
    }, {
      joined: false,
      spacerNoNeighbour: '    ',
      spacerNeighbour: '¦   ',
      keyNoNeighbour: '\'-- ',
      keyNeighbour: '+-- '
    })).to.deep.equal([
      '+-- page',
      '¦   +-- world',
      '¦   ¦   +-- index.js',
      "¦   ¦   '-- index.css",
      "¦   '-- hello",
      "¦       '-- index.css",
      "'-- vendor",
      "    '-- index.js"
    ]);
  });

  it('Testing Comprehensive String Value Example', () => {
    expect(treeify({
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
    })).to.deep.equal([
      '├─ apples',
      '│  ├─ pink lady',
      '│  └─ gala',
      '└─ oranges',
      '   └─ mandarin',
      '      ├─ tangerine: so cheap and juicy!',
      '      └─ clementine'
    ].join('\n'));
  });

  it('Testing Custom Sort Order', () => {
    expect(treeify({
      1: {
        2: {
          3: null
        },
        4: {
          5: null,
          6: null
        }
      },
      7: {
        8: null,
        9: null
      }
    }, {
      sortFn: (a, b) => Number(b) - Number(a)
    })).to.deep.equal([
      '├─ 7',
      '│  ├─ 9',
      '│  └─ 8',
      '└─ 1',
      '   ├─ 4',
      '   │  ├─ 6',
      '   │  └─ 5',
      '   └─ 2',
      '      └─ 3'
    ].join('\n'));
  });
});
