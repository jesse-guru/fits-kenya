import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import HomePage from './pages/HomePage';
import NewArrivalsPage from './pages/NewArrivalsPage';
import ShopPage from './pages/ShopPage';
import QuizPage from './pages/QuizPage';
import ContactPage from './pages/ContactPage';
import WishlistPage from './pages/WishlistPage';
import QuickViewModal from './components/QuickViewModal';
import CartDrawer from './components/CartDrawer';
import CheckoutModal from './components/CheckoutModal';
import AuthModal from './components/AuthModal';
import Footer from './components/Footer';
import { fetchProducts } from './services/api';
import { products as fallbackProducts } from './data/products';
import { CheckCircle2 } from 'lucide-react';

export default function App() {
  // Page Navigation State
  const [currentPage, setCurrentPage] = useState('home');

  // User Auth State
  const [currentUser, setCurrentUser] = useState(() => {
    try {
      const saved = localStorage.getItem('fits_kenya_user');
      return saved ? JSON.parse(saved) : null;
    } catch (e) {
      return null;
    }
  });
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

  // E-Commerce Data State
  const [productsList, setProductsList] = useState(fallbackProducts);
  const [isLoadingProducts, setIsLoadingProducts] = useState(true);
  const [cart, setCart] = useState([]);
  const [wishlist, setWishlist] = useState(['prod-1', 'prod-4']);
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  
  // Modals state
  const [quickViewProduct, setQuickViewProduct] = useState(null);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);

  // Toast Notification
  const [toast, setToast] = useState(null);

  // Load live products from Django backend (or fallback) on mount
  useEffect(() => {
    async function loadData() {
      setIsLoadingProducts(true);
      const data = await fetchProducts();
      if (data && data.length > 0) {
        setProductsList(data);
      }
      setIsLoadingProducts(false);
    }
    loadData();
  }, []);

  const showToastNotification = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(null), 3000);
  };

  // Auth Handlers
  const handleAuthSuccess = (userData) => {
    setCurrentUser(userData);
    try {
      localStorage.setItem('fits_kenya_user', JSON.stringify(userData));
    } catch (e) {}
    showToastNotification(`Welcome back, ${userData.first_name || userData.username}!`);
  };

  const handleLogout = () => {
    setCurrentUser(null);
    try {
      localStorage.removeItem('fits_kenya_user');
    } catch (e) {}
    showToastNotification('Logged out successfully.');
  };

  // Page Switcher Navigation Helper
  const handleNavigate = (pageId, categoryFilter = null) => {
    setCurrentPage(pageId);
    if (categoryFilter) {
      setActiveCategory(categoryFilter);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Cart Functions
  const handleAddToCart = (product, size) => {
    const targetSize = size || product.sizes[0];
    setCart((prevCart) => {
      const existingIdx = prevCart.findIndex(
        (item) => item.id === product.id && item.selectedSize === targetSize
      );

      if (existingIdx > -1) {
        const updated = [...prevCart];
        updated[existingIdx].quantity += 1;
        return updated;
      } else {
        return [...prevCart, { ...product, selectedSize: targetSize, quantity: 1 }];
      }
    });

    showToastNotification(`Added "${product.name}" (${targetSize}) to cart!`);
  };

  const handleUpdateQuantity = (id, size, newQty) => {
    if (newQty <= 0) {
      handleRemoveFromCart(id, size);
      return;
    }
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.id === id && item.selectedSize === size ? { ...item, quantity: newQty } : item
      )
    );
  };

  const handleRemoveFromCart = (id, size) => {
    setCart((prevCart) =>
      prevCart.filter((item) => !(item.id === id && item.selectedSize === size))
    );
  };

  const handleClearCart = () => {
    setCart([]);
  };

  // Wishlist Functions
  const handleToggleWishlist = (productId) => {
    setWishlist((prev) => {
      if (prev.includes(productId)) {
        showToastNotification('Removed item from Wishlist');
        return prev.filter((id) => id !== productId);
      } else {
        showToastNotification('Saved item to Wishlist ❤️');
        return [...prev, productId];
      }
    });
  };

  const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);
  const cartSubtotal = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

  return (
    <div className="min-h-screen bg-fits-black text-slate-900 flex flex-col font-sans">
      
      {/* Header */}
      <Header
        currentPage={currentPage}
        onNavigate={handleNavigate}
        cartCount={cartCount}
        wishlistCount={wishlist.length}
        onOpenCart={() => setIsCartOpen(true)}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        setActiveCategory={setActiveCategory}
        currentUser={currentUser}
        onOpenAuth={() => setIsAuthModalOpen(true)}
        onLogout={handleLogout}
      />

      {/* Page Content Rendering */}
      <main className="flex-1">
        {currentPage === 'home' && (
          <HomePage
            products={productsList}
            onNavigate={handleNavigate}
            onQuickView={(p) => setQuickViewProduct(p)}
            onAddToCart={handleAddToCart}
            wishlist={wishlist}
            onToggleWishlist={handleToggleWishlist}
          />
        )}

        {currentPage === 'new-arrivals' && (
          <NewArrivalsPage
            products={productsList}
            onQuickView={(p) => setQuickViewProduct(p)}
            onAddToCart={handleAddToCart}
            wishlist={wishlist}
            onToggleWishlist={handleToggleWishlist}
          />
        )}

        {currentPage === 'shop' && (
          <ShopPage
            products={productsList}
            activeCategory={activeCategory}
            setActiveCategory={setActiveCategory}
            searchQuery={searchQuery}
            onQuickView={(p) => setQuickViewProduct(p)}
            onAddToCart={handleAddToCart}
            wishlist={wishlist}
            onToggleWishlist={handleToggleWishlist}
          />
        )}

        {currentPage === 'quiz' && (
          <QuizPage
            products={productsList}
            onQuickView={(p) => setQuickViewProduct(p)}
            onAddToCart={handleAddToCart}
          />
        )}

        {currentPage === 'contact' && (
          <ContactPage />
        )}

        {currentPage === 'wishlist' && (
          <WishlistPage
            products={productsList}
            wishlist={wishlist}
            onQuickView={(p) => setQuickViewProduct(p)}
            onAddToCart={handleAddToCart}
            onToggleWishlist={handleToggleWishlist}
            onNavigate={handleNavigate}
          />
        )}
      </main>

      {/* Footer */}
      <Footer onNavigate={handleNavigate} />

      {/* Auth Modal (Sign In / Register) */}
      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        onAuthSuccess={handleAuthSuccess}
      />

      {/* Quick View Modal */}
      {quickViewProduct && (
        <QuickViewModal
          product={quickViewProduct}
          onClose={() => setQuickViewProduct(null)}
          onAddToCart={handleAddToCart}
          isWishlisted={wishlist.includes(quickViewProduct.id)}
          onToggleWishlist={handleToggleWishlist}
        />
      )}

      {/* Cart Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cart={cart}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveFromCart}
        onProceedCheckout={() => {
          setIsCartOpen(false);
          setIsCheckoutOpen(true);
        }}
      />

      {/* Checkout Modal */}
      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        cart={cart}
        subtotal={cartSubtotal}
        onClearCart={handleClearCart}
        currentUser={currentUser}
      />

      {/* Floating Toast Notification */}
      {toast && (
        <div className="fixed bottom-6 right-6 z-50 bg-fits-accent text-white px-4 py-3 rounded-xl font-extrabold text-xs shadow-2xl flex items-center gap-2 border border-black/10">
          <CheckCircle2 className="w-4 h-4" />
          <span>{toast}</span>
        </div>
      )}

    </div>
  );
}
