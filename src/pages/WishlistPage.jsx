import React from 'react';
import ProductCard from '../components/ProductCard';
import { Heart, ArrowRight } from 'lucide-react';

export default function WishlistPage({ 
  products, 
  wishlist, 
  onQuickView, 
  onAddToCart, 
  onToggleWishlist,
  onNavigate 
}) {
  const wishlistedProducts = products.filter(p => wishlist.includes(p.id));

  return (
    <div className="py-12 bg-slate-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        <div className="flex flex-col sm:flex-row sm:items-end justify-between border-b border-slate-200 pb-4 gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 text-fits-red font-extrabold text-xs uppercase tracking-widest mb-1">
              <Heart className="w-4 h-4 fill-fits-red" /> SAVED FAVOURITE FITS
            </div>
            <h1 className="text-3xl sm:text-4xl font-display font-extrabold text-slate-900 uppercase tracking-tight">
              YOUR WISHLIST ({wishlistedProducts.length})
            </h1>
          </div>

          <button
            onClick={() => onNavigate('shop')}
            className="inline-flex items-center gap-2 text-xs font-extrabold uppercase tracking-wider text-fits-accent hover:text-slate-900 transition-colors"
          >
            <span>Continue Shopping</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {wishlistedProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {wishlistedProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onQuickView={onQuickView}
                onAddToCart={onAddToCart}
                isWishlisted={true}
                onToggleWishlist={onToggleWishlist}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-16 bg-white rounded-3xl border border-slate-200 shadow-sm max-w-lg mx-auto">
            <div className="w-16 h-16 rounded-full bg-slate-100 border border-slate-200 flex items-center justify-center mx-auto mb-4 text-fits-red">
              <Heart className="w-8 h-8 fill-fits-red" />
            </div>
            <h3 className="text-lg font-bold text-slate-900 mb-1">Your Wishlist is Empty</h3>
            <p className="text-slate-500 text-xs max-w-sm mx-auto mb-6">
              Browse our catalog or new arrivals and tap the heart icon on any sneakers or streetwear item to save it for later!
            </p>
            <button
              onClick={() => onNavigate('shop')}
              className="bg-fits-accent text-white font-extrabold text-xs px-6 py-3 rounded-xl uppercase tracking-wider shadow"
            >
              Explore Shop
            </button>
          </div>
        )}

      </div>
    </div>
  );
}
