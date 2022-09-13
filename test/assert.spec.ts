import { expect } from 'chai';
import assert from '../src/assert';

describe('Testing assert.js', () => {
  it('Testing throw', () => {
    expect(() => assert(false, 'message')).to.throw('message');
  });
});
