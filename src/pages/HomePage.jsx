import React from 'react';
import Hero from '../components/Hero';
import ProductCard from '../components/ProductCard';
import { ArrowRight, Sparkles, Zap, ShieldCheck, Truck } from 'lucide-react';

export default function HomePage({ 
  products, 
  onNavigate, 
  onQuickView, 
  onAddToCart, 
  wishlist, 
  onToggleWishlist 
}) {
  const newArrivalsPreview = products.filter(p => p.isNew).slice(0, 4);
  const popularPreview = products.filter(p => p.isPopular).slice(0, 4);

  return (
    <div className="space-y-16 pb-16 bg-slate-50 min-h-screen">
      
      {/* Hero Section */}
      <Hero
        onExploreClick={() => onNavigate('shop')}
        onQuizClick={() => onNavigate('quiz')}
      />

      {/* Featured New Drops Teaser */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4 border-b border-slate-200 pb-4">
          <div>
            <div className="inline-flex items-center gap-1.5 text-fits-accent font-extrabold text-xs uppercase tracking-widest mb-1">
              <Sparkles className="w-3.5 h-3.5" /> JUST LANDED IN NAIROBI
            </div>
            <h2 className="text-3xl font-display font-extrabold text-slate-900 uppercase tracking-tight">
              FRESH NEW ARRIVALS
            </h2>
          </div>
          <button
            onClick={() => onNavigate('new-arrivals')}
            className="inline-flex items-center gap-2 text-xs font-extrabold uppercase tracking-wider text-fits-accent hover:text-slate-900 transition-colors"
          >
            <span>View All New Drops ({products.filter(p => p.isNew).length})</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {newArrivalsPreview.map((product) => (
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
      </section>

      {/* Categories Banner Grid */}
      <section className="bg-slate-100 py-12 border-y border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-xl mx-auto mb-8">
            <h2 className="text-2xl sm:text-3xl font-display font-extrabold text-slate-900 uppercase tracking-tight">
              EXPLORE BY CATEGORY
            </h2>
            <p className="text-slate-600 text-xs sm:text-sm mt-1">Pick your lane: Streetwear apparel, authentic kicks, or accessories.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            
            {/* Category 1: Streetwear */}
            <div 
              onClick={() => onNavigate('shop', 'clothes')}
              className="group relative rounded-2xl overflow-hidden h-64 cursor-pointer border border-slate-200 hover:border-fits-accent transition-all shadow-md"
            >
              <img
                src="https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&q=80&w=800"
                alt="Streetwear Clothes"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/30 to-transparent" />
              <div className="absolute bottom-6 left-6 right-6">
                <span className="text-xs font-extrabold text-fits-accentLight uppercase tracking-wider block">Collection</span>
                <h3 className="text-xl font-extrabold text-white uppercase">STREETWEAR APPAREL</h3>
                <span className="text-xs text-slate-200 mt-1 inline-flex items-center gap-1 group-hover:text-fits-accentLight font-semibold">
                  Shop Tees, Hoodies & Cargos →
                </span>
              </div>
            </div>

            {/* Category 2: Sneakers */}
            <div 
              onClick={() => onNavigate('shop', 'shoes')}
              className="group relative rounded-2xl overflow-hidden h-64 cursor-pointer border border-slate-200 hover:border-fits-accent transition-all shadow-md"
            >
              <img
                src="https://images.unsplash.com/photo-1552346154-21d32810aba3?auto=format&fit=crop&q=80&w=800"
                alt="Kicks and Shoes"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/30 to-transparent" />
              <div className="absolute bottom-6 left-6 right-6">
                <span className="text-xs font-extrabold text-fits-accentLight uppercase tracking-wider block">Collection</span>
                <h3 className="text-xl font-extrabold text-white uppercase">KICKS & SNEAKERS</h3>
                <span className="text-xs text-slate-200 mt-1 inline-flex items-center gap-1 group-hover:text-fits-accentLight font-semibold">
                  Shop Jordans, Dunks & Yeezys →
                </span>
              </div>
            </div>

            {/* Category 3: Accessories */}
            <div 
              onClick={() => onNavigate('shop', 'accessories')}
              className="group relative rounded-2xl overflow-hidden h-64 cursor-pointer border border-slate-200 hover:border-fits-accent transition-all shadow-md"
            >
              <img
                src="https://images.unsplash.com/photo-1588850561407-ed78c282e89b?auto=format&fit=crop&q=80&w=800"
                alt="Accessories"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/30 to-transparent" />
              <div className="absolute bottom-6 left-6 right-6">
                <span className="text-xs font-extrabold text-fits-accentLight uppercase tracking-wider block">Collection</span>
                <h3 className="text-xl font-extrabold text-white uppercase">CAPS & ACCESSORIES</h3>
                <span className="text-xs text-slate-200 mt-1 inline-flex items-center gap-1 group-hover:text-fits-accentLight font-semibold">
                  Shop Caps & Mini Bags →
                </span>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Most Popular Drops Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4 border-b border-slate-200 pb-4">
          <div>
            <div className="inline-flex items-center gap-1.5 text-fits-accent font-extrabold text-xs uppercase tracking-widest mb-1">
              🔥 MOST WANTED IN NAIROBI
            </div>
            <h2 className="text-3xl font-display font-extrabold text-slate-900 uppercase tracking-tight">
              POPULAR BESTSELLERS
            </h2>
          </div>
          <button
            onClick={() => onNavigate('shop')}
            className="inline-flex items-center gap-2 text-xs font-extrabold uppercase tracking-wider text-fits-accent hover:text-slate-900 transition-colors"
          >
            <span>Explore Full Shop</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {popularPreview.map((product) => (
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
      </section>

      {/* Nairobi Delivery & Authenticity Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm grid grid-cols-1 md:grid-cols-3 gap-6 text-center md:text-left">
          <div className="flex flex-col md:flex-row items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-amber-50 border border-fits-accent/30 flex items-center justify-center text-fits-accent flex-shrink-0">
              <Zap className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-slate-900 font-extrabold text-base">2 - 4 Hour Nairobi Delivery</h4>
              <p className="text-slate-600 text-xs mt-0.5">Dispatched directly from Mithoo Business Centre via express rider.</p>
            </div>
          </div>

          <div className="flex flex-col md:flex-row items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-amber-50 border border-fits-accent/30 flex items-center justify-center text-fits-accent flex-shrink-0">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-slate-900 font-extrabold text-base">100% Authentic Gear</h4>
              <p className="text-slate-600 text-xs mt-0.5">Strict quality inspection on every tee, hoodie, and sneaker.</p>
            </div>
          </div>

          <div className="flex flex-col md:flex-row items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-amber-50 border border-fits-accent/30 flex items-center justify-center text-fits-accent flex-shrink-0">
              <Truck className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-slate-900 font-extrabold text-base">M-Pesa Pay on Delivery</h4>
              <p className="text-slate-600 text-xs mt-0.5">Inspect your fit upon delivery before sending M-Pesa payment.</p>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
