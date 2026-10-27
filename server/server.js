import express from 'express';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 5000;

// Data directory and paths
const DATA_DIR = path.join(__dirname, 'data');
const PRODUCTS_FILE = path.join(DATA_DIR, 'products.json');
const ORDERS_FILE = path.join(DATA_DIR, 'orders.json');

// Middleware
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// Custom robust CORS middleware
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  if (req.method === 'OPTIONS') {
    return res.sendStatus(200);
  }
  next();
});

// Request logger
app.use((req, res, next) => {
  const timestamp = new Date().toISOString();
  console.log(`[${timestamp}] ${req.method} ${req.url}`);
  next();
});

// Helper functions to safely load and save JSON data
function loadJSON(filePath, fallback = []) {
  try {
    if (fs.existsSync(filePath)) {
      const data = fs.readFileSync(filePath, 'utf8');
      return JSON.parse(data);
    }
  } catch (err) {
    console.error(`Error loading ${filePath}:`, err.message);
  }
  return fallback;
}

function saveJSON(filePath, data) {
  try {
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf8');
    return true;
  } catch (err) {
    console.error(`Error saving ${filePath}:`, err.message);
    return false;
  }
}

// -------------------------------------------------------------
// ROUTES
// -------------------------------------------------------------

// Serve frontend API client if requested directly
app.get('/apiClient.js', (req, res) => {
  res.sendFile(path.join(__dirname, '../src/apiClient.js'));
});

// 1. Health Check
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    service: 'LittleBloom Babywear Atelier Express Backend',
    version: '2.0.0',
    uptimeSeconds: Math.floor(process.uptime()),
    timestamp: new Date().toISOString()
  });
});

// 2. Products API: Get all products with filters, search, sorting & pagination
app.get('/api/products', (req, res) => {
  try {
    const products = loadJSON(PRODUCTS_FILE, []);
    let { category, q, sort, limit } = req.query;

    let results = [...products];

    // Filter by category
    if (category && category !== 'all') {
      const catLower = category.toLowerCase();
      results = results.filter(p => {
        const pCat = (p.category || '').toLowerCase();
        return pCat.includes(catLower);
      });
    }

    // Filter by search query
    if (q && q.trim()) {
      const query = q.trim().toLowerCase();
      results = results.filter(p => {
        const nameMatch = (p.name || '').toLowerCase().includes(query);
        const tagMatch = (p.tag || '').toLowerCase().includes(query);
        const descMatch = (p.desc || '').toLowerCase().includes(query);
        const catMatch = (p.category || '').toLowerCase().includes(query);
        return nameMatch || tagMatch || descMatch || catMatch;
      });
    }

    // Sort order
    if (sort === 'price-asc') {
      results.sort((a, b) => (a.priceINR || 0) - (b.priceINR || 0));
    } else if (sort === 'price-desc') {
      results.sort((a, b) => (b.priceINR || 0) - (a.priceINR || 0));
    } else if (sort === 'rating') {
      results.sort((a, b) => (b.rating || 0) - (a.rating || 0));
    }

    // Limit
    if (limit && !isNaN(Number(limit))) {
      results = results.slice(0, Number(limit));
    }

    res.json({
      success: true,
      count: results.length,
      total: products.length,
      data: results
    });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// 3. Products API: Get single product by ID
app.get('/api/products/:id', (req, res) => {
  try {
    const products = loadJSON(PRODUCTS_FILE, []);
    const id = Number(req.params.id);
    const product = products.find(p => p.id === id);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: `Product with ID ${req.params.id} not found.`
      });
    }

    res.json({
      success: true,
      data: product
    });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// 4. Orders API: Get list of all orders
app.get('/api/orders', (req, res) => {
  try {
    const ordersMap = loadJSON(ORDERS_FILE, {});
    let ordersList = Object.values(ordersMap);

    // Optional search by order ID or phone
    const { q } = req.query;
    if (q && q.trim()) {
      const query = q.trim().toLowerCase();
      ordersList = ordersList.filter(o => {
        const idMatch = (o.id || '').toLowerCase().includes(query);
        const phoneMatch = (o.shippingAddress || '').toLowerCase().includes(query) || (o.partnerPhone || '').toLowerCase().includes(query);
        return idMatch || phoneMatch;
      });
    }

    res.json({
      success: true,
      count: ordersList.length,
      data: ordersList
    });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// 5. Orders API: Get single order by Order ID or AWB Tracking Number
app.get('/api/orders/:id', (req, res) => {
  try {
    const ordersMap = loadJSON(ORDERS_FILE, {});
    const targetId = req.params.id.trim().toUpperCase();

    // 1. Direct match on key
    if (ordersMap[targetId]) {
      return res.json({ success: true, data: ordersMap[targetId] });
    }

    // 2. Case-insensitive search or tracking AWB search
    const found = Object.values(ordersMap).find(o => {
      const matchId = (o.id || '').toUpperCase() === targetId;
      const matchAwb = (o.trackingAwb || '').toUpperCase() === targetId;
      const cleanMatch = (o.id || '').replace(/[^a-zA-Z0-9]/g, '').toUpperCase() === targetId.replace(/[^a-zA-Z0-9]/g, '');
      return matchId || matchAwb || cleanMatch;
    });

    if (found) {
      return res.json({ success: true, data: found });
    }

    return res.status(404).json({
      success: false,
      message: `Order #${req.params.id} not found in Atelier delivery records.`
    });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// 6. Orders API: Create new Order (from Cart Checkout)
app.post('/api/orders', (req, res) => {
  try {
    const ordersMap = loadJSON(ORDERS_FILE, {});
    const body = req.body || {};

    // Generate distinctive order ID
    const randomSuffix = Math.floor(10000 + Math.random() * 90000);
    const orderId = body.id || `LB-EXP-${randomSuffix}`;

    const items = Array.isArray(body.items) && body.items.length > 0 ? body.items : [
      {
        name: body.dressName || "LittleBloom Organic Baby Frock",
        size: body.size || "0-3M",
        quantity: body.quantity || 1,
        priceINR: body.priceINR || 699,
        photo: body.photo || "/baby_dresses/dress_sage_linen.jpg"
      }
    ];

    const customerName = body.customerName || body.fullName || "Valued Parent";
    const address = body.address || body.shippingAddress || "Indiranagar, Bengaluru, Karnataka";
    const phone = body.phone || "+91 98450 " + Math.floor(10000 + Math.random() * 90000);
    const totalAmount = body.totalAmount || body.finalPayable || items.reduce((acc, it) => acc + (it.priceINR * (it.quantity || 1)), 0);
    const paymentMethod = body.paymentMethod || "UPI Express (Paid ₹" + totalAmount + ")";

    const newOrder = {
      id: orderId,
      platform: "Atelier Certified",
      status: "confirmed",
      statusPillClass: "pill-confirmed",
      statusPillText: "Order Confirmed & Atelier Dispatched",
      eta: "Delivering in 2-3 Days (Free Express 48h)",
      courierName: "LittleBloom Express Fleet",
      trackingAwb: "LBEXP" + Math.floor(10000000 + Math.random() * 90000000) + "IN",
      deliveryPartner: "Arun V (Atelier Courier Associate)",
      partnerPhone: "+91 98450 " + Math.floor(10000 + Math.random() * 90000),
      deliveryOtp: String(Math.floor(1000 + Math.random() * 9000)),
      shippingAddress: `${customerName}, ${address} · Phone: ${phone}`,
      paymentMethod: paymentMethod,
      items: items,
      timelineStep: 1,
      progressPct: "25%",
      createdAt: new Date().toISOString(),
      activityLog: [
        {
          time: "Just now",
          text: `Order Confirmed: Payment verified via LittleBloom Secure Gateway. Packing with breathable muslin gift wrap.`
        },
        {
          time: "Next Step",
          text: `Quality Inspection: Passing 21-point infant skin safety & hypoallergenic dye test at South Hub Atelier.`
        }
      ]
    };

    // Store in orders map and persist
    ordersMap[orderId] = newOrder;
    saveJSON(ORDERS_FILE, ordersMap);

    console.log(`[Order Created] #${orderId} for ${customerName} (Total: ₹${totalAmount})`);

    res.status(201).json({
      success: true,
      message: "Order placed successfully in LittleBloom Atelier system.",
      data: newOrder
    });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// 7. Coupons API: Validate discount promo codes
app.post('/api/coupons/validate', (req, res) => {
  try {
    const { code, total } = req.body || {};
    if (!code) {
      return res.status(400).json({ success: false, message: 'Please enter a coupon code.' });
    }

    const cleanCode = code.trim().toUpperCase();
    const cartTotal = Number(total) || 0;

    if (cleanCode === 'BABY20') {
      const discount = Math.round(cartTotal * 0.20);
      return res.json({
        success: true,
        valid: true,
        code: 'BABY20',
        discountPercent: 20,
        discountAmount: discount,
        message: '🎉 20% Baby Festival Discount Applied!'
      });
    }

    if (cleanCode === 'FIRST10') {
      const discount = Math.round(cartTotal * 0.10);
      return res.json({
        success: true,
        valid: true,
        code: 'FIRST10',
        discountPercent: 10,
        discountAmount: discount,
        message: '🎉 10% First Order Welcome Discount Applied!'
      });
    }

    if (cleanCode === 'FREESHIP') {
      return res.json({
        success: true,
        valid: true,
        code: 'FREESHIP',
        freeShipping: true,
        discountAmount: 0,
        message: '🚚 Free Express Shipping Coupon Applied!'
      });
    }

    return res.status(404).json({
      success: false,
      valid: false,
      message: 'Invalid promo code. Try using BABY20 for 20% off.'
    });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// 8. Reviews API: Verified Buyer Testimonials
app.get('/api/reviews', (req, res) => {
  res.json({
    success: true,
    data: [
      {
        id: 1,
        author: "Sneha M.",
        role: "Mom of Ananya (8M) · Bengaluru",
        rating: 5,
        badge: "Verified LittleBloom Order",
        dress: "Sage Linen Ruffle Frock",
        text: "The Sage Linen Ruffle Frock is unimaginably soft! Most baby party dresses have rough tulle, but this one is pure organic muslin on the inside. My 8-month daughter looked adorable on her naming ceremony."
      },
      {
        id: 2,
        author: "Rohan & Deepa",
        role: "Gifted for 1st Birthday · Mumbai",
        rating: 5,
        badge: "Verified Atelier Buyer",
        dress: "Lilac Fairy Tulle Ballerina",
        text: "Ordered the Lilac Fairy Tulle Ballerina for my niece's 1st birthday. Arrived in 2 days with safe packaging. The snap buttons make diaper changes super easy without taking off the whole dress!"
      },
      {
        id: 3,
        author: "Kavita Rajan",
        role: "Mom of Twins (18M) · Chennai",
        rating: 5,
        badge: "Repeat Customer",
        dress: "Buttercup Daisy Sundress & Peplum",
        text: "We have 4 frocks from LittleBloom now. After 15 machine washes, the colors haven't faded at all. The 3D view on this website showed the exact flare before buying. Highly recommended!"
      }
    ]
  });
});

// 9. Stats API
app.get('/api/stats', (req, res) => {
  const products = loadJSON(PRODUCTS_FILE, []);
  const orders = loadJSON(ORDERS_FILE, {});
  res.json({
    success: true,
    data: {
      totalProducts: products.length,
      totalOrdersTracked: Object.keys(orders).length,
      averageRating: 4.9,
      organicMuslinPurity: "100% Certified GOTS",
      expressDeliverySla: "48 Hours Doorstep"
    }
  });
});

// Start Server
app.listen(PORT, '0.0.0.0', () => {
  console.log(`
╔════════════════════════════════════════════════════════════════╗
║   🌿 LittleBloom Babywear Atelier Express Backend Server       ║
║   URL: http://localhost:${PORT}                                 ║
║   API Health: http://localhost:${PORT}/api/health               ║
║   Products API: http://localhost:${PORT}/api/products           ║
║   Orders API: http://localhost:${PORT}/api/orders               ║
╚════════════════════════════════════════════════════════════════╝
  `);
});
