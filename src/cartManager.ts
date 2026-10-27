/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface CartProduct {
  id: number;
  name: string;
  priceINR: number;
  originalPriceINR: number;
  priceUSD: number;
  photo: string;
  tag: string;
  rating: number;
  reviewsCount: number;
  category: string;
  description: string;
  fabric: string;
}

export interface CartItem {
  id: number;
  name: string;
  priceINR: number;
  originalPriceINR: number;
  photo: string;
  size: string;
  quantity: number;
}

export interface OrderTotals {
  itemCount: number;
  subtotalINR: number;
  originalSubtotalINR: number;
  savingsINR: number;
  couponDiscountINR: number;
  couponApplied: string | null;
  shippingINR: number;
  finalTotalINR: number;
}

export const FREE_SHIPPING_THRESHOLD_INR = 499;
export const STANDARD_SHIPPING_FEE_INR = 49;

export const VALID_COUPONS: Record<string, { discountPercent: number; description: string }> = {
  BABY20: { discountPercent: 20, description: "20% OFF on all Baby Dresses" },
  BLOOM10: { discountPercent: 10, description: "10% LittleBloom Club Discount" },
  WELCOME50: { discountPercent: 15, description: "15% First Order Welcome Special" },
};

/**
 * Adds an item to the cart or increments its quantity if the exact (id, size) pair already exists.
 */
export function addToCart(
  cart: CartItem[],
  product: Pick<CartProduct, 'id' | 'name' | 'priceINR' | 'originalPriceINR' | 'photo'>,
  size = "0-3M",
  quantity = 1
): CartItem[] {
  const existingIndex = cart.findIndex(
    (item) => item.id === product.id && item.size === size
  );

  if (existingIndex >= 0) {
    const updated = [...cart];
    updated[existingIndex] = {
      ...updated[existingIndex],
      quantity: updated[existingIndex].quantity + quantity,
    };
    return updated;
  }

  return [
    ...cart,
    {
      id: product.id,
      name: product.name,
      priceINR: product.priceINR,
      originalPriceINR: product.originalPriceINR,
      photo: product.photo,
      size,
      quantity,
    },
  ];
}

/**
 * Removes an item from the cart matching id and size.
 */
export function removeFromCart(cart: CartItem[], id: number, size: string): CartItem[] {
  return cart.filter((item) => !(item.id === id && item.size === size));
}

/**
 * Updates an item's quantity. If quantity drops to 0 or lower, removes the item.
 */
export function updateCartQuantity(
  cart: CartItem[],
  id: number,
  size: string,
  newQuantity: number
): CartItem[] {
  if (newQuantity <= 0) {
    return removeFromCart(cart, id, size);
  }

  return cart.map((item) => {
    if (item.id === id && item.size === size) {
      return { ...item, quantity: newQuantity };
    }
    return item;
  });
}

/**
 * Computes subtotal, coupon discount, delivery fee, and net total.
 */
export function calculateOrderTotals(
  cart: CartItem[],
  couponCode: string | null = null
): OrderTotals {
  let itemCount = 0;
  let subtotalINR = 0;
  let originalSubtotalINR = 0;

  for (const item of cart) {
    itemCount += item.quantity;
    subtotalINR += item.priceINR * item.quantity;
    originalSubtotalINR += item.originalPriceINR * item.quantity;
  }

  let couponDiscountINR = 0;
  let couponApplied: string | null = null;

  if (couponCode) {
    const normalized = couponCode.trim().toUpperCase();
    if (VALID_COUPONS[normalized]) {
      couponApplied = normalized;
      const pct = VALID_COUPONS[normalized].discountPercent;
      couponDiscountINR = Math.round((subtotalINR * pct) / 100);
    }
  }

  const shippingINR =
    subtotalINR === 0 || subtotalINR >= FREE_SHIPPING_THRESHOLD_INR
      ? 0
      : STANDARD_SHIPPING_FEE_INR;

  const finalTotalINR = Math.max(0, subtotalINR - couponDiscountINR + shippingINR);
  const savingsINR = (originalSubtotalINR - subtotalINR) + couponDiscountINR;

  return {
    itemCount,
    subtotalINR,
    originalSubtotalINR,
    savingsINR,
    couponDiscountINR,
    couponApplied,
    shippingINR,
    finalTotalINR,
  };
}

/**
 * Formats Indian Rupee currency representation.
 */
export function formatINR(val: number): string {
  return `₹${val.toLocaleString('en-IN')}`;
}
