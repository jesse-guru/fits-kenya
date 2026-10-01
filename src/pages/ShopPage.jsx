import React from 'react';
import ProductCatalog from '../components/ProductCatalog';

export default function ShopPage({ 
  products, 
  activeCategory, 
  setActiveCategory, 
  searchQuery, 
  onQuickView, 
  onAddToCart, 
  wishlist, 
  onToggleWishlist 
}) {
  return (
    <div className="min-h-screen bg-fits-black py-6">
      <ProductCatalog
        products={products}
        activeCategory={activeCategory}
        setActiveCategory={setActiveCategory}
        searchQuery={searchQuery}
        onQuickView={onQuickView}
        onAddToCart={onAddToCart}
        wishlist={wishlist}
        onToggleWishlist={onToggleWishlist}
      />
    </div>
  );
}
