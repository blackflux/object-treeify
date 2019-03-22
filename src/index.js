const assert = require('assert');

const buildCtx = (opts) => {
  const ctx = Object.assign({
    joined: true,
    spacerNoNeighbour: '   ',
    spacerNeighbour: '│  ',
    keyNoNeighbour: '└─ ',
    keyNeighbour: '├─ ',
    sortFn: null
  }, opts);
  assert(typeof ctx.joined === 'boolean');
  assert(typeof ctx.spacerNoNeighbour === 'string');
  assert(typeof ctx.spacerNeighbour === 'string');
  assert(typeof ctx.keyNoNeighbour === 'string');
  assert(typeof ctx.keyNeighbour === 'string');
  assert(typeof ctx.sortFn === 'function' || ctx.sortFn === null);
  return ctx;
};

module.exports = (tree, opts = {}) => {
  const ctx = buildCtx(opts);
  const result = [];

  const sort = input => (ctx.sortFn === null ? input : input.sort((a, b) => ctx.sortFn(b, a)));

  const neighbours = [];
  const keys = sort(Object.keys(tree)).map(k => [k]);
  const lookup = [tree];
  while (keys.length !== 0) {
    const key = keys.pop();
    const node = lookup[key.length - 1][key[key.length - 1]];

    neighbours[key.length - 1] = keys.length !== 0 && keys[keys.length - 1].length === key.length;
    result.push([
      neighbours.slice(0, key.length - 1).map(n => (n ? ctx.spacerNeighbour : ctx.spacerNoNeighbour)).join(''),
      neighbours[key.length - 1] ? ctx.keyNeighbour : ctx.keyNoNeighbour,
      key[key.length - 1],
      ['boolean', 'string', 'number'].includes(typeof node) ? `: ${node}` : ''
    ].join(''));

    if (node instanceof Object && !Array.isArray(node)) {
      keys.push(...sort(Object.keys(node)).map(k => key.concat(k)));
      lookup[key.length] = node;
    }
  }

  return ctx.joined === true ? result.join('\n') : result;
};
