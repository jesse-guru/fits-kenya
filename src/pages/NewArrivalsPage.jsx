import React, { useState, useMemo } from 'react';
import ProductCard from '../components/ProductCard';
import { Sparkles, Flame, Clock } from 'lucide-react';

export default function NewArrivalsPage({ 
  products, 
  onQuickView, 
  onAddToCart, 
  wishlist, 
  onToggleWishlist 
}) {
  const [selectedSub, setSelectedSub] = useState('all');

  const newProducts = useMemo(() => {
    return products.filter((p) => {
      if (!p.isNew) return false;
      if (selectedSub !== 'all' && p.category !== selectedSub) return false;
      return true;
    });
  }, [products, selectedSub]);

  const subTabs = [
    { id: 'all', label: '🔥 All Fresh Drops' },
    { id: 'shoes', label: '👟 New Kicks' },
    { id: 'clothes', label: '👕 New Streetwear' },
    { id: 'accessories', label: '🧢 New Accessories' }
  ];

  return (
    <div className="py-12 bg-slate-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Page Banner */}
        <div className="bg-gradient-to-r from-white via-amber-50/50 to-white p-8 sm:p-12 rounded-3xl border border-slate-200 shadow-sm relative overflow-hidden text-center sm:text-left">
          <div className="absolute top-0 right-0 w-96 h-96 bg-fits-accent/10 rounded-full blur-[100px] pointer-events-none" />
          
          <div className="relative z-10 space-y-3">
            <div className="inline-flex items-center gap-2 bg-fits-accent text-white px-3.5 py-1 rounded-full font-extrabold text-xs uppercase tracking-wider shadow-sm">
              <Flame className="w-4 h-4 fill-white" /> FRESH IN MITHOO BUSINESS CENTRE
            </div>

            <h1 className="text-3xl sm:text-5xl font-display font-black text-slate-900 uppercase tracking-tight">
              NEW ARRIVALS & <span className="text-fits-accent">LIMITED DROPS</span>
            </h1>

            <p className="text-slate-600 text-xs sm:text-sm max-w-2xl leading-relaxed">
              Explore the latest arrivals hot off the press! Heavyweight graphic tees, tactical cargos, and grail sneakers freshly stocked in our Mithoo Business Centre shop. Same-day delivery across Nairobi.
            </p>
          </div>
        </div>

        {/* Subcategory Pill Filters */}
        <div className="flex items-center justify-between gap-4 overflow-x-auto pb-2 scrollbar-none border-b border-slate-200">
          <div className="flex items-center gap-2">
            {subTabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setSelectedSub(tab.id)}
                className={`px-5 py-2.5 rounded-xl font-extrabold text-xs uppercase tracking-wider transition-all flex-shrink-0 ${
                  selectedSub === tab.id
                    ? 'bg-fits-accent text-white shadow-md'
                    : 'bg-white border border-slate-200 text-slate-700 hover:text-slate-900'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <span className="text-slate-500 text-xs font-bold uppercase tracking-wider whitespace-nowrap">
            Showing {newProducts.length} Fresh Items
          </span>
        </div>

        {/* Product Grid */}
        {newProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {newProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onQuickView={onQuickView}
                onAddToCart={onAddToCart}
                isWishlisted={wishlist.includes(product.id)}
                onToggleWishlist={onToggleWishlist}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-16 bg-white rounded-2xl border border-slate-200 shadow-sm">
            <Clock className="w-10 h-10 text-fits-accent mx-auto mb-3" />
            <h3 className="text-lg font-bold text-slate-900 mb-1">More New Drops Coming Soon</h3>
            <p className="text-slate-500 text-xs max-w-sm mx-auto mb-4">
              Check back daily or follow @fitskenya254 on Instagram for early drop announcements!
            </p>
            <button
              onClick={() => setSelectedSub('all')}
              className="bg-fits-accent text-white font-extrabold text-xs px-5 py-2.5 rounded-xl uppercase shadow"
            >
              View All New Drops
            </button>
          </div>
        )}

      </div>
    </div>
  );
}
