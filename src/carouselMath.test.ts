/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import test from 'node:test';
import assert from 'node:assert/strict';
import {
  calculateCardGeometry,
  buildRoundedQuadPath,
  calculateTileLayout,
  decayVelocity,
  wrapOffset,
} from './carouselMath';

test('Center card geometry is upright 170x280 at (720, 687)', () => {
  const geom = calculateCardGeometry(0);
  assert.equal(geom.x, 720);
  assert.equal(geom.d, 0);
  assert.equal(geom.w, 170);
  assert.equal(geom.y_center, 687);
  // Edge heights at center card:
  // q = 85 / 706 = 0.1203965...
  // h = 280 + 92 * (0.1203965^2.6) ≈ 280.37
  assert.ok(Math.abs(geom.h_left - 280.37) < 0.2);
  assert.ok(Math.abs(geom.h_right - 280.37) < 0.2);
});

test('Edge cards grow taller and their outer edge is taller than inner edge', () => {
  // Card to the right at unpushed t = 588
  const geomRight = calculateCardGeometry(588);
  assert.ok(geomRight.x > 720);
  assert.ok(geomRight.d > 0.8);
  assert.ok(geomRight.w > 170); // grows by 48 * d^2
  // For a card on the right, x_right is further from 720 than x_left:
  assert.ok(geomRight.q_right > geomRight.q_left);
  // Outer edge (right) is taller than inner edge (left):
  assert.ok(geomRight.h_right > geomRight.h_left);
  assert.ok(geomRight.h_right > 300);

  // Card to the left at unpushed t = -588
  const geomLeft = calculateCardGeometry(-588);
  assert.ok(geomLeft.x < 720);
  // Outer edge (left) is taller than inner edge (right):
  assert.ok(geomLeft.q_left > geomLeft.q_right);
  assert.ok(geomLeft.h_left > geomLeft.h_right);
});

test('buildRoundedQuadPath generates valid SVG path data', () => {
  const path = buildRoundedQuadPath(170, 280, 280, 15, 1);
  assert.ok(path.startsWith('M '));
  assert.ok(path.includes('Q '));
  assert.ok(path.endsWith('Z'));
});

test('calculateTileLayout correctly places tiles across 5x2 grid', () => {
  // Tile 0 is top-left (col 0, row 0)
  const layout0 = calculateTileLayout(170, 280, 0);
  assert.ok(layout0.tile_w >= 170);
  assert.ok(layout0.tile_h >= 280);
  assert.ok(layout0.offsetX <= 0);
  assert.ok(layout0.offsetY <= 0);

  // Tile 4 is top-right (col 4, row 0)
  const layout4 = calculateTileLayout(170, 280, 4);
  assert.ok(layout4.offsetX < -layout4.tile_w * 3);

  // Tile 5 is second row (col 0, row 1)
  const layout5 = calculateTileLayout(170, 280, 5);
  assert.ok(layout5.offsetY <= -layout5.tile_h);
});

test('decayVelocity decays ~95% after 1 second', () => {
  const initialV = 1000;
  const decayed = decayVelocity(initialV, 1.0, 0.95);
  // Expected: 1000 * 0.05 = 50
  assert.ok(Math.abs(decayed - 50) < 1);
});

test('wrapOffset keeps offsets within symmetric span [-980, 980]', () => {
  const pitch = 196;
  const count = 10;
  for (let i = 0; i < count; i++) {
    const t = wrapOffset(i, 0, pitch, count);
    assert.ok(t >= -980 && t <= 980);
  }
  // With large scroll offset, cards still wrap smoothly
  const tLarge = wrapOffset(2, 5000, pitch, count);
  assert.ok(tLarge >= -980 && tLarge <= 980);
});
