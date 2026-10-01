import React from 'react';
import InstagramLookbook from '../components/InstagramLookbook';

export default function LookbookPage({ products, onQuickView, onAddToCart }) {
  return (
    <div className="min-h-screen bg-fits-dark py-6">
      <InstagramLookbook
        products={products}
        onQuickView={onQuickView}
        onAddToCart={onAddToCart}
      />
    </div>
  );
}
