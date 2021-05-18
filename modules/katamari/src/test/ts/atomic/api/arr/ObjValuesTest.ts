import { describe, it } from '@ephox/bedrock-client';
import { assert } from 'chai';
import * as Obj from 'ephox/katamari/api/Obj';

describe('atomic.katamari.api.arr.ObjValuesTest', () => {
  it('Obj.values', () => {
    const check = (expValues, input) => {
      const c = (expected, v) => {
        v.sort();
        assert.deepEqual(v, expected);
      };
      c(expValues, Obj.values(input));
    };

    check([], {});
    check([ 'A' ], { a: 'A' });
    check([ 'A', 'B', 'C' ], { a: 'A', c: 'C', b: 'B' });
  });
});
