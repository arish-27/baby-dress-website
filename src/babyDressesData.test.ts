/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import test from 'node:test';
import assert from 'node:assert/strict';
import { BABY_DRESSES } from './babyDressesData';

test('BABY_DRESSES has 10 distinct baby dresses', () => {
  assert.equal(BABY_DRESSES.length, 10);
  const names = new Set(BABY_DRESSES.map((d) => d.name));
  assert.equal(names.size, 10, 'All 10 baby dresses must have distinct names');
});

test('Each baby dress has valid color, tag, price, and SVG content', () => {
  BABY_DRESSES.forEach((dress) => {
    assert.ok(dress.name.length > 0);
    assert.ok(dress.tag.length > 0);
    assert.ok(dress.price.startsWith('$'));
    assert.equal(dress.bgGradient.length, 2);
    assert.ok(dress.svgIllustration.includes('<path'));
  });
});
