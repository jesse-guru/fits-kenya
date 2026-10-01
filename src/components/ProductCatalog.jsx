import React, { useState, useMemo } from 'react';
import ProductCard from './ProductCard';
import { SlidersHorizontal, ArrowUpDown, Filter, Sparkles } from 'lucide-react';

export default function ProductCatalog({ 
  products, 
  activeCategory, 
  setActiveCategory,
  searchQuery,
  onQuickView, 
  onAddToCart,
  wishlist,
  onToggleWishlist
}) {
  const [selectedGender, setSelectedGender] = useState('all');
  const [priceRange, setPriceRange] = useState(12000);
  const [sortBy, setSortBy] = useState('popular');

  const categories = [
    { id: 'all', label: '🔥 All Drops' },
    { id: 'clothes', label: '👕 Streetwear Clothes' },
    { id: 'shoes', label: '👟 Kicks & Shoes' },
    { id: 'accessories', label: '🧢 Accessories' }
  ];

  const filteredProducts = useMemo(() => {
    return products.filter((item) => {
      // Category Filter
      if (activeCategory !== 'all' && item.category !== activeCategory) {
        return false;
      }
      // Gender Filter
      if (selectedGender !== 'all' && item.gender !== 'unisex' && item.gender !== selectedGender) {
        return false;
      }
      // Price Filter
      if (item.price > priceRange) {
        return false;
      }
      // Search Query
      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        const matchName = item.name.toLowerCase().includes(query);
        const matchSub = item.subcategory.toLowerCase().includes(query);
        const matchDesc = item.description.toLowerCase().includes(query);
        if (!matchName && !matchSub && !matchDesc) return false;
      }
      return true;
    }).sort((a, b) => {
      if (sortBy === 'price-low') return a.price - b.price;
      if (sortBy === 'price-high') return b.price - a.price;
      if (sortBy === 'rating') return b.rating - a.rating;
      return (b.isPopular ? 1 : 0) - (a.isPopular ? 1 : 0);
    });
  }, [products, activeCategory, selectedGender, priceRange, searchQuery, sortBy]);

  return (
    <section id="catalog" className="py-12 bg-slate-50 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Title */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 pb-4 border-b border-slate-200 gap-4">
          <div>
            <div className="flex items-center gap-2 text-fits-accent font-extrabold text-xs uppercase tracking-widest mb-1">
              <Sparkles className="w-4 h-4" /> Fresh Drops & Authentic Footwear
            </div>
            <h2 className="text-3xl sm:text-4xl font-display font-extrabold text-slate-900 uppercase tracking-tight">
              THE FITS CATALOG
            </h2>
          </div>
          
          <div className="flex items-center gap-3">
            {searchQuery && (
              <span className="text-xs bg-white border border-fits-accent text-fits-accent px-3 py-1.5 rounded-full font-bold shadow-sm">
                Search: "{searchQuery}"
              </span>
            )}
            <span className="text-slate-500 text-xs font-bold uppercase tracking-wider">
              Showing {filteredProducts.length} Items
            </span>
          </div>
        </div>

        {/* Category Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 scrollbar-none mb-6">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-5 py-2.5 rounded-xl font-extrabold text-xs uppercase tracking-wider transition-all flex-shrink-0 ${
                activeCategory === cat.id
                  ? 'bg-fits-accent text-white shadow-md'
                  : 'bg-white border border-slate-200 text-slate-700 hover:text-slate-900 hover:border-slate-300'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Controls & Filter Bar */}
        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm mb-8 flex flex-col md:flex-row items-center justify-between gap-4">
          
          {/* Gender Filter Pills */}
          <div className="flex items-center gap-2 w-full md:w-auto">
            <span className="text-xs font-bold text-slate-500 uppercase mr-1 hidden sm:inline">Gender:</span>
            {['all', 'men', 'women'].map((g) => (
              <button
                key={g}
                onClick={() => setSelectedGender(g)}
                className={`px-3.5 py-1.5 rounded-lg font-bold text-xs capitalize transition-colors ${
                  selectedGender === g
                    ? 'bg-fits-accent/15 text-fits-accent border border-fits-accent'
                    : 'bg-slate-100 text-slate-600 hover:text-slate-900 border border-transparent'
                }`}
              >
                {g}
              </button>
            ))}
          </div>

          {/* Price Range Slider */}
          <div className="flex items-center gap-3 w-full md:w-auto">
            <span className="text-xs font-bold text-slate-600 uppercase whitespace-nowrap">
              Max Price: <span className="text-fits-accent">KSh {priceRange.toLocaleString()}</span>
            </span>
            <input
              type="range"
              min="1500"
              max="12000"
              step="500"
              value={priceRange}
              onChange={(e) => setPriceRange(Number(e.target.value))}
              className="w-full sm:w-36 accent-fits-accent cursor-pointer"
            />
          </div>

          {/* Sort Dropdown */}
          <div className="flex items-center gap-2 w-full md:w-auto justify-end">
            <ArrowUpDown className="w-4 h-4 text-slate-500" />
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="bg-slate-100 border border-slate-200 text-xs text-slate-800 font-bold rounded-lg px-3 py-2 focus:outline-none focus:border-fits-accent"
            >
              <option value="popular">Sort: Popular Drops</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="rating">Top Rated</option>
            </select>
          </div>

        </div>

        {/* Product Grid */}
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredProducts.map((product) => (
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
            <div className="w-16 h-16 rounded-full bg-slate-100 flex items-center justify-center mx-auto mb-4 text-slate-400">
              <Filter className="w-8 h-8" />
            </div>
            <h3 className="text-lg font-bold text-slate-900 mb-1">No Fits Match Your Filters</h3>
            <p className="text-slate-500 text-sm max-w-md mx-auto mb-4">
              Try adjusting your price slider or searching for different terms like "Sneakers", "Tee", or "Hoodie".
            </p>
            <button
              onClick={() => {
                setActiveCategory('all');
                setSelectedGender('all');
                setPriceRange(12000);
              }}
              className="bg-fits-accent text-white font-extrabold text-xs px-5 py-2.5 rounded-xl uppercase tracking-wider shadow"
            >
              Reset Filters
            </button>
          </div>
        )}

      </div>
    </section>
  );
}
