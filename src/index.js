import assert from './assert.js';

const buildCtx = (opts) => {
  const ctx = {
    joined: true,
    spacerNoNeighbour: '   ',
    spacerNeighbour: '│  ',
    keyNoNeighbour: '└─ ',
    keyNeighbour: '├─ ',
    separator: ': ',
    renderFn: (node) => (['boolean', 'string', 'number'].includes(typeof node) ? node : undefined),
    sortFn: null,
    breakCircularWith: ' (circular ref.)',
    ...opts
  };
  assert(Object.keys(ctx).length === 9, 'Unexpected Option(s) provided');
  assert(typeof ctx.joined === 'boolean', 'Option "joined" has invalid format');
  assert(typeof ctx.spacerNoNeighbour === 'string', 'Option "spacerNoNeighbour" has invalid format');
  assert(typeof ctx.spacerNeighbour === 'string', 'Option "spacerNeighbour" has invalid format');
  assert(typeof ctx.keyNoNeighbour === 'string', 'Option "keyNoNeighbour" has invalid format');
  assert(typeof ctx.keyNeighbour === 'string', 'Option "keyNeighbour" has invalid format');
  assert(typeof ctx.separator === 'string', 'Option "separator" has invalid format');
  assert(typeof ctx.renderFn === 'function', 'Option "renderFn" has invalid format');
  assert(typeof ctx.sortFn === 'function' || ctx.sortFn === null, 'Option "sortFn" has invalid format');
  assert(
    typeof ctx.breakCircularWith === 'string' || ctx.breakCircularWith === null,
    'Option "breakCircularWith" has invalid format'
  );
  return ctx;
};

export default (tree, opts = {}) => {
  const ctx = buildCtx(opts);
  const result = [];

  const rootRendered = ctx.renderFn(tree);
  if (rootRendered !== undefined) {
    result.push(String(rootRendered));
  }

  const sort = (input) => (ctx.sortFn === null ? input.reverse() : input.sort((a, b) => ctx.sortFn(b, a)));

  const neighbours = [];
  const keys = sort(Object.keys(tree)).map((k) => [k]);
  const lookup = [tree];
  while (keys.length !== 0) {
    const key = keys.pop();
    const node = lookup[key.length - 1][key[key.length - 1]];
    const isCircular = ctx.breakCircularWith !== null && lookup.includes(node);

    neighbours[key.length - 1] = keys.length !== 0 && keys[keys.length - 1].length === key.length;
    const nodeRendered = ctx.renderFn(node);
    result.push([
      neighbours.slice(0, key.length - 1).map((n) => (n ? ctx.spacerNeighbour : ctx.spacerNoNeighbour)).join(''),
      neighbours[key.length - 1] ? ctx.keyNeighbour : ctx.keyNoNeighbour,
      key[key.length - 1],
      nodeRendered === undefined ? '' : `${ctx.separator}${node}`,
      isCircular ? ctx.breakCircularWith : ''
    ].join(''));

    if (node instanceof Object && !Array.isArray(node) && !isCircular) {
      keys.push(...sort(Object.keys(node)).map((k) => key.concat(k)));
      lookup[key.length] = node;
    }
  }

  return ctx.joined === true ? result.join('\n') : result;
};
