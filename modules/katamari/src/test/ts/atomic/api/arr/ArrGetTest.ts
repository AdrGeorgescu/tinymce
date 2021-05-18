import { context, describe } from '@ephox/bedrock-client';
import fc from 'fast-check';
import * as Arr from 'ephox/katamari/api/Arr';
import { assertNone, assertSome } from 'ephox/katamari/test/AssertOptional';

describe('atomic.katamari.api.arr.ArrGetTest', () => {
  context('Arr.get', () => {

    describe('Arr.get: empty', () => {
      assertNone(Arr.get<number>([], 0));
    });

    describe('Arr.get: empty with non zero index', () => {
      assertNone(Arr.get<number>([], 5));
    });

    describe('Arr.get: invalid index', () => {
      assertNone(Arr.get<number>([], -1));
    });

    describe('Arr.get: index out of bounds', () => {
      assertNone(Arr.get<number>([ 10, 20, 30 ], 5));
    });

    describe('Arr.get: valid index', () => {
      assertSome(Arr.get<number>([ 10, 20, 30, 13 ], 3), 13);
    });

    describe('Arr.get: fc valid index', () => {
      fc.assert(fc.property(fc.array(fc.integer()), fc.integer(), fc.integer(), (array, h, t) => {
        const arr = [ h ].concat(array);
        const length = arr.push(t);
        const midIndex = Math.round(arr.length / 2);

        assertSome(Arr.get(arr, 0), h);
        assertSome(Arr.get(arr, midIndex), arr[midIndex]);
        assertSome(Arr.get(arr, length - 1), t);
      }));
    });

  });
});
