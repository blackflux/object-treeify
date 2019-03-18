const assert = require('assert');

const buildCtx = (opts) => {
  const ctx = Object.assign({
    joined: true,
    spacerNoNeighbour: '    ',
    spacerNeighbour: '|   ',
    keyNoNeighbour: '└── ',
    keyNeighbour: '├── '
  }, opts);
  assert(typeof ctx.joined === 'boolean');
  assert(typeof ctx.spacerNoNeighbour === 'string');
  assert(typeof ctx.spacerNeighbour === 'string');
  assert(typeof ctx.keyNoNeighbour === 'string');
  assert(typeof ctx.keyNeighbour === 'string');
  return ctx;
};

module.exports = (tree, opts = {}) => {
  const ctx = buildCtx(opts);
  const result = [];

  const neighbours = [];
  const keys = Object.keys(tree).sort().map(k => [k]);
  while (keys.length !== 0) {
    const key = keys.shift();
    const node = key.reduce((p, c) => p[c], tree);

    neighbours[key.length - 1] = keys.length !== 0 && keys[0].length === key.length;
    result.push(`${
      neighbours.slice(0, key.length - 1).map(n => (n ? ctx.spacerNeighbour : ctx.spacerNoNeighbour)).join('')
    }${neighbours[key.length - 1] ? ctx.keyNeighbour : ctx.keyNoNeighbour}${key[key.length - 1]}`);

    keys.unshift(...Object.keys(node).sort().map(k => key.concat(k)));
  }

  return ctx.joined === true ? result.join('\n') : result;
};
