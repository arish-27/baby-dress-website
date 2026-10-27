/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface CardGeometry {
  x: number;
  d: number;
  w: number;
  x_left: number;
  x_right: number;
  q_left: number;
  q_right: number;
  h_left: number;
  h_right: number;
  y_center: number;
  card_h: number;
  top: number;
  left: number;
}

export interface TileLayout {
  tile_w: number;
  tile_h: number;
  grid_w: number;
  grid_h: number;
  offsetX: number;
  offsetY: number;
}

/**
 * Computes cylinder-curve geometry for a card at an unpushed offset t from the center 720.
 */
export function calculateCardGeometry(
  t: number,
  centerX = 720,
  halfWidth = 706
): CardGeometry {
  // Center is pushed outward
  const normalizedT = t / halfWidth;
  const x = centerX + t * (1 + 0.083 * Math.pow(normalizedT, 2));
  const d = Math.abs(x - centerX) / halfWidth;
  const w = 170 + 48 * Math.pow(d, 2);

  const x_left = x - w / 2;
  const x_right = x + w / 2;

  const q_left = Math.abs(x_left - centerX) / halfWidth;
  const q_right = Math.abs(x_right - centerX) / halfWidth;

  const h_left = 280 + 92 * Math.pow(q_left, 2.6);
  const h_right = 280 + 92 * Math.pow(q_right, 2.6);

  const y_center = 687 - 12 * Math.pow(d, 2);
  const card_h = Math.max(h_left, h_right);
  const top = y_center - card_h / 2;
  const left = x_left;

  return {
    x,
    d,
    w,
    x_left,
    x_right,
    q_left,
    q_right,
    h_left,
    h_right,
    y_center,
    card_h,
    top,
    left,
  };
}

/**
 * Generates an SVG path string for a rounded quad with 15-unit radius corners.
 * Coordinates are local to the card bounding box [0, 0] to [w, card_h].
 */
export function buildRoundedQuadPath(
  w: number,
  h_left: number,
  h_right: number,
  radius = 15,
  scale = 1
): string {
  const card_h = Math.max(h_left, h_right);
  const sw = w * scale;
  const sh_left = h_left * scale;
  const sh_right = h_right * scale;
  const scard_h = card_h * scale;
  const r = Math.min(radius * scale, sw / 2, Math.min(sh_left, sh_right) / 2);

  // 4 vertices in local bounding box:
  // p0: top-left
  // p1: top-right
  // p2: bottom-right
  // p3: bottom-left
  const yTL = (scard_h - sh_left) / 2;
  const yBL = (scard_h + sh_left) / 2;
  const yTR = (scard_h - sh_right) / 2;
  const yBR = (scard_h + sh_right) / 2;

  const p0 = { x: 0, y: yTL };
  const p1 = { x: sw, y: yTR };
  const p2 = { x: sw, y: yBR };
  const p3 = { x: 0, y: yBL };

  const vertices = [p0, p1, p2, p3];

  function getCorner(i: number) {
    const prev = vertices[(i + 3) % 4];
    const curr = vertices[i];
    const next = vertices[(i + 1) % 4];

    const dIn = Math.hypot(prev.x - curr.x, prev.y - curr.y) || 1;
    const dOut = Math.hypot(next.x - curr.x, next.y - curr.y) || 1;

    const uIn = { x: (prev.x - curr.x) / dIn, y: (prev.y - curr.y) / dIn };
    const uOut = { x: (next.x - curr.x) / dOut, y: (next.y - curr.y) / dOut };

    const start = { x: curr.x + uIn.x * r, y: curr.y + uIn.y * r };
    const end = { x: curr.x + uOut.x * r, y: curr.y + uOut.y * r };

    return { start, control: curr, end };
  }

  const c0 = getCorner(0);
  const c1 = getCorner(1);
  const c2 = getCorner(2);
  const c3 = getCorner(3);

  const fmt = (n: number) => n.toFixed(2);

  return `M ${fmt(c0.end.x)} ${fmt(c0.end.y)} ` +
    `L ${fmt(c1.start.x)} ${fmt(c1.start.y)} ` +
    `Q ${fmt(c1.control.x)} ${fmt(c1.control.y)} ${fmt(c1.end.x)} ${fmt(c1.end.y)} ` +
    `L ${fmt(c2.start.x)} ${fmt(c2.start.y)} ` +
    `Q ${fmt(c2.control.x)} ${fmt(c2.control.y)} ${fmt(c2.end.x)} ${fmt(c2.end.y)} ` +
    `L ${fmt(c3.start.x)} ${fmt(c3.start.y)} ` +
    `Q ${fmt(c3.control.x)} ${fmt(c3.control.y)} ${fmt(c3.end.x)} ${fmt(c3.end.y)} ` +
    `L ${fmt(c0.start.x)} ${fmt(c0.start.y)} ` +
    `Q ${fmt(c0.control.x)} ${fmt(c0.control.y)} ${fmt(c0.end.x)} ${fmt(c0.end.y)} Z`;
}

/**
 * Computes cover-fitted 5x2 sprite grid offsets for card `tileIndex`.
 */
export function calculateTileLayout(
  card_w: number,
  card_h: number,
  tileIndex: number,
  totalCols = 5,
  totalRows = 2,
  aspectRatio = 384 / 540 // ~0.7111
): TileLayout {
  const tile_h = Math.max(card_h, card_w / aspectRatio);
  const tile_w = tile_h * aspectRatio;
  const grid_w = totalCols * tile_w;
  const grid_h = totalRows * tile_h;

  const k = ((tileIndex % 10) + 10) % 10;
  const col = k % totalCols;
  const row = Math.floor(k / totalCols);

  const tileOriginX = col * tile_w;
  const tileOriginY = row * tile_h;

  // Center tile inside card
  const extraX = (tile_w - card_w) / 2;
  const extraY = (tile_h - card_h) / 2;

  const offsetX = -(tileOriginX + extraX);
  const offsetY = -(tileOriginY + extraY);

  return {
    tile_w,
    tile_h,
    grid_w,
    grid_h,
    offsetX,
    offsetY,
  };
}

/**
 * Decays velocity by about 95% per second: v * (1 - 0.95)^dt
 */
export function decayVelocity(velocity: number, dtSeconds: number, decayPerSecond = 0.95): number {
  if (Math.abs(velocity) < 0.1) return 0;
  const factor = Math.pow(Math.max(0, 1 - decayPerSecond), dtSeconds);
  const newV = velocity * factor;
  return Math.abs(newV) < 0.1 ? 0 : newV;
}

/**
 * Wraps an unpushed card offset t within [-span/2, span/2]
 */
export function wrapOffset(cardIndex: number, scrollOffset: number, pitch = 196, count = 10): number {
  const span = count * pitch;
  const raw = (cardIndex * pitch - scrollOffset) % span;
  let t = (raw + span) % span;
  if (t > span / 2) {
    t -= span;
  }
  return t;
}
