/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export const ACCEPTED_IMAGE_TYPES = [
  'image/jpeg',
  'image/png',
  'image/webp',
  'image/gif',
  'image/avif',
  'image/svg+xml',
];

/**
 * Validates if an uploaded file MIME type is an acceptable image.
 */
export function isValidImageMimeType(mime: string): boolean {
  if (!mime) return false;
  return ACCEPTED_IMAGE_TYPES.includes(mime.toLowerCase());
}

/**
 * Distributes uploaded image URLs across card slots (default 10 cards).
 * If user uploads 3 images, cards loop through them evenly.
 */
export function distributeImagesToCards(
  imageUrls: string[],
  cardCount = 10
): string[] {
  if (!imageUrls || imageUrls.length === 0) {
    return [];
  }
  const result: string[] = [];
  for (let i = 0; i < cardCount; i++) {
    result.push(imageUrls[i % imageUrls.length]);
  }
  return result;
}
