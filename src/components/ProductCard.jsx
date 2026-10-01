import React, { useState } from 'react';
import { Heart, ShoppingBag, Eye, Star, Check } from 'lucide-react';

export default function ProductCard({ 
  product, 
  onQuickView, 
  onAddToCart, 
  isWishlisted, 
  onToggleWishlist 
}) {
  const [selectedSize, setSelectedSize] = useState(product.sizes[0] || '');
  const [isHovered, setIsHovered] = useState(false);
  const [addedAnimation, setAddedAnimation] = useState(false);

  const handleAdd = (e) => {
    e.stopPropagation();
    onAddToCart(product, selectedSize);
    setAddedAnimation(true);
    setTimeout(() => setAddedAnimation(false), 1500);
  };

  return (
    <div 
      className="group relative bg-white rounded-2xl border border-slate-200 hover:border-fits-accent transition-all duration-300 flex flex-col justify-between overflow-hidden shadow-sm hover:shadow-md"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Product Image Container */}
      <div 
        className="relative aspect-square overflow-hidden bg-slate-100 cursor-pointer"
        onClick={() => onQuickView(product)}
      >
        <img
          src={isHovered && product.images[1] ? product.images[1] : product.images[0]}
          alt={product.name}
          className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
        />

        {/* Badge */}
        {product.badge && (
          <span className="absolute top-3 left-3 bg-fits-accent text-white font-extrabold text-[10px] uppercase tracking-wider px-2.5 py-1 rounded-md shadow-sm z-10">
            {product.badge}
          </span>
        )}

        {/* Wishlist Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onToggleWishlist(product.id);
          }}
          className={`absolute top-3 right-3 p-2 rounded-full backdrop-blur-md transition-all z-10 ${
            isWishlisted 
              ? 'bg-fits-red text-white' 
              : 'bg-white/80 text-slate-600 hover:text-fits-accent hover:bg-white shadow-sm'
          }`}
          aria-label="Wishlist"
        >
          <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-white' : ''}`} />
        </button>

        {/* Quick View Button on Hover */}
        <div className="absolute inset-x-3 bottom-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex gap-2 z-10">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onQuickView(product);
            }}
            className="w-full bg-slate-900/90 backdrop-blur-md text-white hover:text-fits-accent font-bold text-xs py-2.5 rounded-xl border border-slate-700 flex items-center justify-center gap-1.5 transition-colors shadow-md"
          >
            <Eye className="w-3.5 h-3.5" /> Quick View
          </button>
        </div>
      </div>

      {/* Card Details */}
      <div className="p-4 flex-1 flex flex-col justify-between">
        <div>
          {/* Subcategory & Gender */}
          <div className="flex items-center justify-between text-[11px] font-semibold text-slate-500 mb-1 uppercase tracking-wider">
            <span>{product.subcategory}</span>
            <div className="flex items-center gap-1 text-amber-500">
              <Star className="w-3 h-3 fill-amber-500" />
              <span className="text-slate-700 font-bold">{product.rating}</span>
            </div>
          </div>

          {/* Product Title */}
          <h3 
            onClick={() => onQuickView(product)}
            className="text-slate-900 font-extrabold text-sm line-clamp-1 group-hover:text-fits-accent transition-colors cursor-pointer"
          >
            {product.name}
          </h3>

          {/* Sizes Badges Quick Select */}
          <div className="mt-2.5 flex items-center gap-1 overflow-x-auto pb-1 scrollbar-none">
            {product.sizes.slice(0, 4).map((size) => (
              <button
                key={size}
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedSize(size);
                }}
                className={`text-[10px] font-bold px-2 py-0.5 rounded border transition-colors flex-shrink-0 ${
                  selectedSize === size
                    ? 'border-fits-accent text-fits-accent bg-fits-accent/10'
                    : 'border-slate-200 text-slate-600 hover:text-slate-900'
                }`}
              >
                {size}
              </button>
            ))}
            {product.sizes.length > 4 && (
              <span className="text-[10px] text-slate-400 font-bold px-1">
                +{product.sizes.length - 4}
              </span>
            )}
          </div>
        </div>

        {/* Pricing & Add to Cart Action */}
        <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between">
          <div>
            <div className="flex items-baseline gap-1.5">
              <span className="text-fits-accent font-black text-base">
                KSh {product.price.toLocaleString()}
              </span>
              {product.originalPrice && (
                <span className="text-slate-400 text-xs line-through font-semibold">
                  KSh {product.originalPrice.toLocaleString()}
                </span>
              )}
            </div>
            <span className="text-[10px] text-slate-500 font-medium block">In Stock ({product.stock})</span>
          </div>

          <button
            onClick={handleAdd}
            className={`p-2.5 rounded-xl font-bold text-xs transition-all flex items-center gap-1.5 ${
              addedAnimation 
                ? 'bg-green-600 text-white scale-105 shadow-md' 
                : 'bg-fits-accent text-white hover:bg-fits-accentHover shadow'
            }`}
            title="Add to Cart"
          >
            {addedAnimation ? (
              <>
                <Check className="w-4 h-4" /> Added
              </>
            ) : (
              <>
                <ShoppingBag className="w-4 h-4" /> Add
              </>
            )}
          </button>
        </div>

      </div>
    </div>
  );
}
