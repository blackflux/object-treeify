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
      '|  ├─ hello',
      '|  |  └─ index.css',
      '|  └─ world',
      '|     ├─ index.css',
      '|     └─ index.js',
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
      '¦   +-- hello',
      "¦   ¦   '-- index.css",
      "¦   '-- world",
      '¦       +-- index.css',
      "¦       '-- index.js",
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
      '|  ├─ gala',
      '|  └─ pink lady',
      '└─ oranges',
      '   └─ mandarin',
      '      ├─ clementine',
      '      └─ tangerine: so cheap and juicy!'
    ].join('\n'));
  });
});
