import { products as fallbackProducts } from '../data/products';
import { nairobiLocations as fallbackLocations } from '../data/nairobiLocations';

const API_BASE_URL = 'http://127.0.0.1:8000/api';

/**
 * Log In User via Django REST API
 */
export async function loginUser(username, password) {
  try {
    const res = await fetch(`${API_BASE_URL}/auth/login/`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password }),
    });
    const data = await res.json();
    if (!res.ok) {
      return { error: data.error || 'Invalid credentials' };
    }
    return { user: data.user };
  } catch (err) {
    console.warn('Backend auth API unavailable, performing local login simulation:', err.message);
    if (!username || !password) {
      return { error: 'Please enter a username and password' };
    }
    return {
      user: {
        id: 99,
        username: username,
        email: `${username}@fitskenya.co.ke`,
        first_name: username.split('_')[0] || username,
        phone: '0742265504'
      }
    };
  }
}

/**
 * Register User via Django REST API
 */
export async function registerUser(payload) {
  try {
    const res = await fetch(`${API_BASE_URL}/auth/register/`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
    const data = await res.json();
    if (!res.ok) {
      return { error: data.error || 'Registration failed' };
    }
    return { user: data.user };
  } catch (err) {
    console.warn('Backend auth API unavailable, performing local registration simulation:', err.message);
    return {
      user: {
        id: Date.now(),
        username: payload.username,
        email: payload.email,
        first_name: payload.first_name || payload.username,
        phone: payload.phone || '0742265504'
      }
    };
  }
}

/**
 * Fetch products from Django REST API (with fallback to local data)
 */
export async function fetchProducts(params = {}) {
  try {
    const query = new URLSearchParams();
    if (params.category && params.category !== 'all') {
      query.append('category', params.category);
    }
    if (params.gender && params.gender !== 'all') {
      query.append('gender', params.gender);
    }
    if (params.is_new) {
      query.append('is_new', 'true');
    }
    if (params.search) {
      query.append('search', params.search);
    }

    const res = await fetch(`${API_BASE_URL}/products/?${query.toString()}`);
    if (!res.ok) throw new Error('API response failed');
    const data = await res.json();
    return data.map(transformBackendProduct);
  } catch (err) {
    console.warn('Backend API unavailable, using local product data:', err.message);
    return filterFallbackProducts(fallbackProducts, params);
  }
}

/**
 * Fetch Nairobi delivery locations from Django REST API (with fallback)
 */
export async function fetchLocations() {
  try {
    const res = await fetch(`${API_BASE_URL}/locations/`);
    if (!res.ok) throw new Error('API response failed');
    const data = await res.json();
    return data.map(loc => ({
      id: loc.location_id,
      name: loc.name,
      fee: Number(loc.fee),
      eta: loc.eta
    }));
  } catch (err) {
    return fallbackLocations;
  }
}

/**
 * Create a new customer order via Django REST API
 */
export async function createOrder(orderPayload) {
  try {
    const res = await fetch(`${API_BASE_URL}/orders/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(orderPayload),
    });
    if (!res.ok) throw new Error('Order creation failed');
    return await res.json();
  } catch (err) {
    console.warn('Backend offline, simulated order creation locally:', err.message);
    return {
      order_number: orderPayload.order_number,
      status: 'confirmed',
      total_amount: orderPayload.total_amount
    };
  }
}

function transformBackendProduct(p) {
  return {
    id: `prod-${p.id}`,
    backendId: p.id,
    name: p.name,
    category: p.category_slug || (p.category === 1 ? 'shoes' : p.category === 2 ? 'clothes' : 'accessories'),
    subcategory: p.subcategory,
    gender: p.gender,
    price: Number(p.price),
    originalPrice: p.original_price ? Number(p.original_price) : null,
    rating: Number(p.rating),
    reviewsCount: p.reviews_count,
    badge: p.badge,
    isNew: p.is_new,
    isPopular: p.is_popular,
    images: p.images && p.images.length > 0 ? p.images : ['https://images.unsplash.com/photo-1552346154-21d32810aba3?auto=format&fit=crop&q=80&w=800'],
    sizes: p.sizes && p.sizes.length > 0 ? p.sizes : ['EU 40', 'EU 41', 'EU 42'],
    description: p.description,
    stock: p.stock
  };
}

function filterFallbackProducts(products, params) {
  return products.filter((p) => {
    if (params.category && params.category !== 'all' && p.category !== params.category) {
      return false;
    }
    if (params.gender && params.gender !== 'all' && p.gender !== 'unisex' && p.gender !== params.gender) {
      return false;
    }
    if (params.is_new && !p.isNew) {
      return false;
    }
    if (params.search) {
      const q = params.search.toLowerCase();
      const matchName = p.name.toLowerCase().includes(q);
      const matchSub = p.subcategory.toLowerCase().includes(q);
      if (!matchName && !matchSub) return false;
    }
    return true;
  });
}
