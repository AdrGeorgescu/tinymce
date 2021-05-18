import { describe, it } from '@ephox/bedrock-client';
import fc from 'fast-check';
import * as Arr from 'ephox/katamari/api/Arr';
import { arbNegativeInteger } from 'ephox/katamari/test/arb/ArbDataTypes';
import { assertNone, assertSome } from 'ephox/katamari/test/AssertOptional';

describe('atomic.katamari.api.arr.ArrLastTest', () => {

  it('Arr.indexOf: unit tests', () => {
    const checkNoneHelper = (xs, x) => {
      assertNone(Arr.indexOf(xs, x));
    };

    const checkNone = (xs: any[], x) => {
      checkNoneHelper(xs, x);
      checkNoneHelper(Object.freeze(xs.slice()), x);
    };

    const checkHelper = (expected, xs, x) => {
      assertSome(Arr.indexOf(xs, x), expected);
    };

    const check = (expected, xs: any[], x) => {
      checkHelper(expected, xs, x);
      checkHelper(expected, Object.freeze(xs.slice()), x);
    };

    checkNone([], 'x');
    checkNone([ 'q' ], 'x');
    checkNone([ 1 ], '1');
    checkNone([ 1 ], undefined);
    check(0, [ undefined ], undefined);
    check(0, [ undefined, undefined ], undefined);
    check(1, [ 1, undefined ], undefined);
    check(2, [ 'dog', 3, 'cat' ], 'cat');
  });

  it('Arr.indexOf: find in middle of array', () => {
    fc.assert(fc.property(fc.array(fc.nat()), arbNegativeInteger(), fc.array(fc.nat()), (prefix, element, suffix) => {
      const arr = prefix.concat([ element ]).concat(suffix);
      assertSome(Arr.indexOf(arr, element), prefix.length);
    }));
  });

  it('Arr.indexOf: indexOf of an empty array is none', () => {
    fc.property(
      fc.integer(),
      (x) => {
        assertNone(Arr.indexOf([], x));
      }
    );
  });

  it('Arr.indexOf: indexOf of a [value].concat(array) is some(0)', () => {
    fc.property(
      fc.array(fc.integer()),
      fc.integer(),
      (arr, x) => {
        assertSome(Arr.indexOf([ x ].concat(arr), x), 0);
      }
    );
  });
});
