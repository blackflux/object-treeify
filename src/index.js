import assert from './assert.js';
import util from "util";

const consolelogFormatter = util.format;

/**
 * Check if object is POJO
 */
function isPlainObject(value) {
  return value?.constructor === Object;
} 

const COLLAPSED = Symbol("collapsed");

const buildOptions = (_opts) => {
  const defaultOpts = {
    joined: true,
    spacerNoNeighbour: '   ',
    spacerNeighbour: '│  ',
    keyNoNeighbour: '└─ ',
    keyNeighbour: '├─ ',
    separator: ': ',
    separatorMultiline: ': |',
    renderFn: (node, _meta) => [undefined, null].includes(node) ? null : node,
    collapsedObject: "{...}",
    collapsedArray: "[...]",
    sortFn: null,
    breakCircularWith: ' (circular ref.)',
  }
  const opts = {
    ...defaultOpts,
    ..._opts
  };
  assert(Object.keys(opts).length === Object.keys(defaultOpts).length, 'Unexpected Option(s) provided');
  for (const [k, v] of Object.entries(opts)) {
    if (k === "sortFn") {
      assert(typeof v === 'function' || v === null, 'sortFn must be a function or null');
    }
    // TODO Legacy support, throw error in future releases
    else if (k === "breakCircularWith") {
      assert(typeof v === 'string' || v === null,'breakCircularWith must be a function or null');
      if (v === null) {
        console.warn("treeify: setting breakCircularWith to null is deprecated. Set it to '' instead");
      }
    } else {
      assert(typeof defaultOpts[k] === typeof v, `Option ${k} has incorrect type`);
    }
  }
  return opts;
};

const treeify = (tree, _opts = {}) => {
  const opts = buildOptions(_opts);
  const result = [];

  const sort = (input) => (opts.sortFn === null ? input.reverse() : input.sort((a, b) => opts.sortFn(b, a)));

  const neighbours = [];
  const keys = sort(Object.keys(tree)).map((k) => [k]);
  const lookup = [tree];

  /**
   * Get array of strings or string of rendered node using render fn
   */
  function render(node, meta) {
    const { indent, isCircular, collapsed } = meta;

    if (isPlainObject(node)) {
      if (isCircular) {
        return opts.breakCircularWith;
      }
      if (collapsed) {
        return opts.separator + opts.collapsedObject;
      }
      if (Object.keys(node).length === 0) {
        return opts.separator + '{}';
      }
      return ""
    }
    if (Array.isArray(node)) {
      if (isCircular) {
        return opts.breakCircularWith;
      }
      if (collapsed) {
        return opts.separator + opts.collapsedArray;
      }
      if (node.length === 0) {
        return opts.separator + '[]';
      }
      return ""
    }

    let r = opts.renderFn(node);
    if (r === null) {
      return "";
    }
    if (typeof r === "array") {
      // Assume multiline render
      return r;
    }

    if (typeof r !== "string") {
      r = consolelogFormatter(r);
    }

    // r is now string
    // apply indentation if necessary (multiline support)
    let arr = r.split("\n");
    if (arr.length > 1) {
      arr = arr.map(v => indent + opts.spacerNoNeighbour + "  " + v);
      // Inserts to 0 index
      arr.splice(0, 0, opts.separatorMultiline);

      return arr;
    }

    return opts.separator + r;
  }

  const rootString = render(tree, { collapsed: tree?.[COLLAPSED] === true});

  // Trimming
  if (rootString !== "") {
    result.push(rootString);
  }

  while (keys.length !== 0) {
    const key = keys.pop();
    const node = lookup[key.length - 1][key[key.length - 1]];

    neighbours[key.length - 1] = keys.length !== 0 && keys[keys.length - 1].length === key.length;

    const isCircular = lookup.includes(node);
    const collapsed = node?.[COLLAPSED] === true

    const indent = neighbours.slice(0, key.length - 1).map((n) => (n ? opts.spacerNeighbour : opts.spacerNoNeighbour)).join('');
    const renderResult = render(node, { indent, isCircular, collapsed });

    const q = [
      indent,
      neighbours[key.length - 1] ? opts.keyNeighbour : opts.keyNoNeighbour,
      key[key.length - 1],
    ];

    if (typeof renderResult === "string") {
      q.push(renderResult);
      result.push(q.join(''));
    } else {
      q.push(renderResult[0]);
      result.push(q.join(''))
      result.push(...renderResult.slice(1));
    }


    if (node instanceof Object 
      // This was originally prohibiting arrays from being rendered
      // Now, its commented out and indicies are treated as keys
      // && !Array.isArray(node) 
      // This "isCircular" value was affected by
      // breakCircularWith option (by setting it to null)
      // This caused circular reference printing to crash the program
      // TODO remove this information comment in the next major release
      && !isCircular
      && !collapsed
      ) {
      keys.push(...sort(Object.keys(node)).map((k) => key.concat(k)));
      lookup[key.length] = node;
    }
  }

  return opts.joined ? result.join('\n') : result;
};

treeify.COLLAPSED = COLLAPSED;

export default treeify;
