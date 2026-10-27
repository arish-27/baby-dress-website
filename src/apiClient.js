(function () {
  'use strict';

  // Smart API Base URL:
  // Works with Vite /api proxy, direct express on localhost:5000, or production host
  function getApiBase() {
    const origin = window.location.origin;
    const port = window.location.port;
    if (port === '5000') return '/api';
    if (port === '3000' || port === '3001') return '/api';
    if (origin.includes('localhost') || origin.includes('127.0.0.1')) {
      return 'http://localhost:5000/api';
    }
    return '/api';
  }

  const API_BASE = getApiBase();

  window.LittleBloomAPI = {
    baseUrl: API_BASE,

    // 1. Health Check
    async checkHealth() {
      try {
        const res = await fetch(`${API_BASE}/health`, { signal: AbortSignal.timeout ? AbortSignal.timeout(3000) : undefined });
        if (res.ok) return await res.json();
      } catch (e) {
        console.warn('[LittleBloomAPI] Health check failed:', e.message);
      }
      return { status: 'offline' };
    },

    // 2. Fetch all products with optional filters: { category, q, sort, limit }
    async getProducts(params = {}) {
      try {
        const query = new URLSearchParams();
        if (params.category && params.category !== 'all') query.set('category', params.category);
        if (params.q) query.set('q', params.q);
        if (params.sort) query.set('sort', params.sort);
        if (params.limit) query.set('limit', params.limit);

        const url = `${API_BASE}/products${query.toString() ? '?' + query.toString() : ''}`;
        const res = await fetch(url);
        if (res.ok) {
          const json = await res.json();
          if (json.success && Array.isArray(json.data)) {
            return json.data;
          }
        }
      } catch (err) {
        console.warn('[LittleBloomAPI] getProducts backend error:', err.message);
      }
      return null;
    },

    // 3. Get single product by ID
    async getProductById(id) {
      try {
        const res = await fetch(`${API_BASE}/products/${id}`);
        if (res.ok) {
          const json = await res.json();
          if (json.success && json.data) return json.data;
        }
      } catch (err) {
        console.warn('[LittleBloomAPI] getProductById error:', err.message);
      }
      return null;
    },

    // 4. Get all orders
    async getOrders(params = {}) {
      try {
        const query = new URLSearchParams();
        if (params.q) query.set('q', params.q);
        const url = `${API_BASE}/orders${query.toString() ? '?' + query.toString() : ''}`;
        const res = await fetch(url);
        if (res.ok) {
          const json = await res.json();
          if (json.success && Array.isArray(json.data)) return json.data;
        }
      } catch (err) {
        console.warn('[LittleBloomAPI] getOrders error:', err.message);
      }
      return null;
    },

    // 5. Get order by Order ID or Tracking AWB
    async getOrder(orderId) {
      if (!orderId) return null;
      try {
        const res = await fetch(`${API_BASE}/orders/${encodeURIComponent(orderId.trim())}`);
        if (res.ok) {
          const json = await res.json();
          if (json.success && json.data) return json.data;
        }
      } catch (err) {
        console.warn('[LittleBloomAPI] getOrder error:', err.message);
      }
      return null;
    },

    // 6. Create new order (Cart checkout)
    async createOrder(payload) {
      try {
        const res = await fetch(`${API_BASE}/orders`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload)
        });
        if (res.ok) {
          const json = await res.json();
          if (json.success && json.data) return json.data;
        }
      } catch (err) {
        console.warn('[LittleBloomAPI] createOrder error:', err.message);
      }
      return null;
    },

    // 7. Validate coupon
    async validateCoupon(code, total) {
      try {
        const res = await fetch(`${API_BASE}/coupons/validate`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ code, total })
        });
        return await res.json();
      } catch (err) {
        console.warn('[LittleBloomAPI] validateCoupon error:', err.message);
        return { success: false, valid: false, message: 'Could not contact discount server.' };
      }
    },

    // 8. Get customer reviews
    async getReviews() {
      try {
        const res = await fetch(`${API_BASE}/reviews`);
        if (res.ok) {
          const json = await res.json();
          if (json.success && Array.isArray(json.data)) return json.data;
        }
      } catch (err) {
        console.warn('[LittleBloomAPI] getReviews error:', err.message);
      }
      return null;
    },

    // 9. Get atelier stats
    async getStats() {
      try {
        const res = await fetch(`${API_BASE}/stats`);
        if (res.ok) {
          const json = await res.json();
          if (json.success && json.data) return json.data;
        }
      } catch (err) {
        console.warn('[LittleBloomAPI] getStats error:', err.message);
      }
      return null;
    }
  };

  console.log('🌿 [LittleBloom] Backend API Client connected at:', API_BASE);
})();
