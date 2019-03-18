const expect = require('chai').expect;
const treeify = require('../src/index');


describe('Testing Treeify', () => {
  it('Testing Comprehensive Example', () => {
    expect(treeify({
      vendor: {
        'index.js': {}
      },
      page: {
        hello: {
          'index.css': {}
        },
        world: {
          'index.css': {},
          'index.js': {}
        }
      }
    })).to.deep.equal([
      '├── page',
      '|   ├── hello',
      '|   |   └── index.css',
      '|   └── world',
      '|       ├── index.css',
      '|       └── index.js',
      '└── vendor',
      '    └── index.js'
    ].join('\n'));
  });
});
