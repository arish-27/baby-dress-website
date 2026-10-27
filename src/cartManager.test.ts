/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import test from 'node:test';
import assert from 'node:assert';
import {
  addToCart,
  removeFromCart,
  updateCartQuantity,
  calculateOrderTotals,
  formatINR,
  FREE_SHIPPING_THRESHOLD_INR,
  STANDARD_SHIPPING_FEE_INR,
} from './cartManager.js';

test('addToCart adds a new product when cart is empty', () => {
  const initial: any[] = [];
  const prod = {
    id: 1,
    name: 'Sage Linen Ruffle Frock',
    priceINR: 699,
    originalPriceINR: 1499,
    photo: '/baby_dresses/dress_1.jpg',
  };

  const updated = addToCart(initial, prod, '3-6M', 1);
  assert.strictEqual(updated.length, 1);
  assert.strictEqual(updated[0].name, 'Sage Linen Ruffle Frock');
  assert.strictEqual(updated[0].size, '3-6M');
  assert.strictEqual(updated[0].quantity, 1);
});

test('addToCart increments quantity when same product and same size added', () => {
  const prod = {
    id: 1,
    name: 'Sage Linen Ruffle Frock',
    priceINR: 699,
    originalPriceINR: 1499,
    photo: '/baby_dresses/dress_1.jpg',
  };

  let cart = addToCart([], prod, '3-6M', 1);
  cart = addToCart(cart, prod, '3-6M', 2);

  assert.strictEqual(cart.length, 1);
  assert.strictEqual(cart[0].quantity, 3);
});

test('addToCart creates separate line item for different size of same product', () => {
  const prod = {
    id: 1,
    name: 'Sage Linen Ruffle Frock',
    priceINR: 699,
    originalPriceINR: 1499,
    photo: '/baby_dresses/dress_1.jpg',
  };

  let cart = addToCart([], prod, '0-3M', 1);
  cart = addToCart(cart, prod, '1-2Y', 1);

  assert.strictEqual(cart.length, 2);
  assert.strictEqual(cart[0].size, '0-3M');
  assert.strictEqual(cart[1].size, '1-2Y');
});

test('removeFromCart removes targeted item by id and size', () => {
  const cart = [
    { id: 1, name: 'Dress 1', priceINR: 699, originalPriceINR: 1499, photo: '', size: '0-3M', quantity: 1 },
    { id: 2, name: 'Dress 2', priceINR: 799, originalPriceINR: 1699, photo: '', size: '3-6M', quantity: 1 },
  ];

  const updated = removeFromCart(cart, 1, '0-3M');
  assert.strictEqual(updated.length, 1);
  assert.strictEqual(updated[0].id, 2);
});

test('updateCartQuantity modifies quantity or removes item if <= 0', () => {
  const cart = [
    { id: 1, name: 'Dress 1', priceINR: 699, originalPriceINR: 1499, photo: '', size: '0-3M', quantity: 2 },
  ];

  const incremented = updateCartQuantity(cart, 1, '0-3M', 3);
  assert.strictEqual(incremented[0].quantity, 3);

  const removed = updateCartQuantity(cart, 1, '0-3M', 0);
  assert.strictEqual(removed.length, 0);
});

test('calculateOrderTotals computes correct subtotal and applies free shipping above threshold', () => {
  const cart = [
    { id: 1, name: 'Dress 1', priceINR: 699, originalPriceINR: 1499, photo: '', size: '0-3M', quantity: 1 },
  ];

  const totals = calculateOrderTotals(cart);
  assert.strictEqual(totals.itemCount, 1);
  assert.strictEqual(totals.subtotalINR, 699);
  assert.strictEqual(totals.shippingINR, 0); // >= 499 free shipping
  assert.strictEqual(totals.finalTotalINR, 699);
});

test('calculateOrderTotals applies 20% coupon BABY20 discount', () => {
  const cart = [
    { id: 1, name: 'Dress 1', priceINR: 1000, originalPriceINR: 2000, photo: '', size: '0-3M', quantity: 1 },
  ];

  const totals = calculateOrderTotals(cart, 'BABY20');
  assert.strictEqual(totals.couponApplied, 'BABY20');
  assert.strictEqual(totals.couponDiscountINR, 200);
  assert.strictEqual(totals.finalTotalINR, 800);
});

test('calculateOrderTotals charges shipping fee for low amounts under threshold', () => {
  const cart = [
    { id: 1, name: 'Dress 1', priceINR: 350, originalPriceINR: 800, photo: '', size: '0-3M', quantity: 1 },
  ];

  const totals = calculateOrderTotals(cart);
  assert.strictEqual(totals.shippingINR, STANDARD_SHIPPING_FEE_INR);
  assert.strictEqual(totals.finalTotalINR, 350 + STANDARD_SHIPPING_FEE_INR);
});

test('formatINR formats numbers with Indian currency symbol', () => {
  assert.strictEqual(formatINR(699), '₹699');
  assert.strictEqual(formatINR(1499), '₹1,499');
});
