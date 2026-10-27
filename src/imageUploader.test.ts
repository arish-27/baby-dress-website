/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import test from 'node:test';
import assert from 'node:assert/strict';
import { isValidImageMimeType, distributeImagesToCards } from './imageUploader';

test('isValidImageMimeType validates common image types', () => {
  assert.equal(isValidImageMimeType('image/jpeg'), true);
  assert.equal(isValidImageMimeType('image/png'), true);
  assert.equal(isValidImageMimeType('image/webp'), true);
  assert.equal(isValidImageMimeType('application/pdf'), false);
  assert.equal(isValidImageMimeType(''), false);
});

test('distributeImagesToCards tiles uploaded images across all 10 cards', () => {
  const uploads = ['img1.jpg', 'img2.jpg', 'img3.jpg'];
  const distributed = distributeImagesToCards(uploads, 10);
  assert.equal(distributed.length, 10);
  assert.equal(distributed[0], 'img1.jpg');
  assert.equal(distributed[1], 'img2.jpg');
  assert.equal(distributed[2], 'img3.jpg');
  assert.equal(distributed[3], 'img1.jpg');
  assert.equal(distributed[9], 'img1.jpg');
});

test('distributeImagesToCards returns empty array on empty input', () => {
  assert.deepEqual(distributeImagesToCards([]), []);
});
