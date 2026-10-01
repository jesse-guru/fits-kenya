import React, { useState } from 'react';
import { X, Star, ShoppingBag, Truck, ShieldCheck, Heart, MapPin, CheckCircle2 } from 'lucide-react';
import { nairobiLocations } from '../data/nairobiLocations';

export default function QuickViewModal({ 
  product, 
  onClose, 
  onAddToCart, 
  isWishlisted, 
  onToggleWishlist 
}) {
  if (!product) return null;

  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedSize, setSelectedSize] = useState(product.sizes[0] || '');
  const [selectedLocation, setSelectedLocation] = useState(nairobiLocations[1]);
  const [addedToast, setAddedToast] = useState(false);

  const handleAdd = () => {
    onAddToCart(product, selectedSize);
    setAddedToast(true);
    setTimeout(() => setAddedToast(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto">
      <div className="relative bg-white border border-slate-200 rounded-3xl max-w-4xl w-full overflow-hidden shadow-2xl my-8">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 p-2 text-slate-500 hover:text-slate-900 bg-slate-100 rounded-full border border-slate-200 transition-colors"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2">
          
          {/* Left Column: Image Gallery */}
          <div className="p-6 bg-slate-50 flex flex-col justify-between border-r border-slate-100">
            <div className="relative aspect-square rounded-2xl overflow-hidden border border-slate-200 mb-4 bg-white">
              <img
                src={product.images[selectedImage] || product.images[0]}
                alt={product.name}
                className="w-full h-full object-cover object-center"
              />
              {product.badge && (
                <span className="absolute top-4 left-4 bg-fits-accent text-white font-black text-xs uppercase px-3 py-1 rounded-md shadow-sm">
                  {product.badge}
                </span>
              )}
            </div>

            {/* Thumbnail Selectors */}
            {product.images.length > 1 && (
              <div className="flex items-center gap-3">
                {product.images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedImage(idx)}
                    className={`w-16 h-16 rounded-xl overflow-hidden border-2 transition-all ${
                      selectedImage === idx ? 'border-fits-accent scale-105 shadow-sm' : 'border-slate-200 opacity-70 hover:opacity-100'
                    }`}
                  >
                    <img src={img} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Right Column: Product Details & Delivery Estimator */}
          <div className="p-6 md:p-8 flex flex-col justify-between max-h-[85vh] overflow-y-auto bg-white">
            <div>
              {/* Category & Ratings */}
              <div className="flex items-center justify-between text-xs text-slate-500 font-bold uppercase mb-2">
                <span>{product.category} / {product.subcategory}</span>
                <div className="flex items-center gap-1 text-amber-500">
                  <Star className="w-4 h-4 fill-amber-500" />
                  <span className="text-slate-800">{product.rating} ({product.reviewsCount} Nairobi reviews)</span>
                </div>
              </div>

              {/* Product Title */}
              <h2 className="text-2xl font-display font-extrabold text-slate-900 mb-3">
                {product.name}
              </h2>

              {/* Pricing */}
              <div className="flex items-baseline gap-3 mb-6">
                <span className="text-3xl font-black text-fits-accent">
                  KSh {product.price.toLocaleString()}
                </span>
                {product.originalPrice && (
                  <span className="text-slate-400 text-sm line-through font-semibold">
                    KSh {product.originalPrice.toLocaleString()}
                  </span>
                )}
                <span className="text-xs bg-fits-accent/10 text-fits-accent px-2.5 py-1 rounded-full font-bold border border-fits-accent/30">
                  SAVE KSh {(product.originalPrice - product.price).toLocaleString()}
                </span>
              </div>

              {/* Description */}
              <p className="text-slate-600 text-xs sm:text-sm leading-relaxed mb-6">
                {product.description}
              </p>

              {/* Size Selector */}
              <div className="mb-6">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-extrabold text-slate-900 uppercase tracking-wider">
                    Select Size: <span className="text-fits-accent">{selectedSize}</span>
                  </span>
                  <span className="text-[11px] text-slate-500 font-semibold cursor-pointer hover:underline">
                    📏 Nairobi Size Guide
                  </span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {product.sizes.map((size) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                        selectedSize === size
                          ? 'bg-fits-accent text-white border-2 border-fits-accent font-extrabold shadow-sm'
                          : 'bg-slate-100 border border-slate-200 text-slate-700 hover:border-slate-300'
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>

              {/* Estate Delivery Estimator Widget */}
              <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 mb-6">
                <div className="flex items-center gap-2 text-xs font-bold text-fits-accent uppercase tracking-wider mb-2">
                  <Truck className="w-4 h-4" /> Estate Delivery Estimator
                </div>
                <div className="space-y-2">
                  <label className="text-[11px] text-slate-500 block font-medium">Select your Nairobi location / town:</label>
                  <select
                    value={selectedLocation.id}
                    onChange={(e) => {
                      const loc = nairobiLocations.find(l => l.id === e.target.value);
                      if (loc) setSelectedLocation(loc);
                    }}
                    className="w-full bg-white border border-slate-200 text-xs text-slate-900 rounded-xl p-2.5 font-bold focus:outline-none focus:border-fits-accent"
                  >
                    {nairobiLocations.map((loc) => (
                      <option key={loc.id} value={loc.id}>
                        {loc.name} {loc.fee === 0 ? '(FREE)' : `(+KSh ${loc.fee})`}
                      </option>
                    ))}
                  </select>
                  <div className="flex items-center justify-between text-xs pt-1 text-slate-600">
                    <span>Estimated Speed: <strong className="text-slate-900">{selectedLocation.eta}</strong></span>
                    <span>Fee: <strong className="text-fits-accent">{selectedLocation.fee === 0 ? 'FREE' : `KSh ${selectedLocation.fee}`}</strong></span>
                  </div>
                </div>
              </div>

            </div>

            {/* Actions (Add to Cart / Wishlist) */}
            <div className="pt-4 border-t border-slate-200 flex items-center gap-3">
              <button
                onClick={handleAdd}
                className="flex-1 bg-fits-accent text-white font-extrabold text-sm uppercase tracking-wider py-4 rounded-2xl hover:bg-fits-accentHover transition-all flex items-center justify-center gap-2 shadow-md"
              >
                {addedToast ? (
                  <>
                    <CheckCircle2 className="w-5 h-5 text-white" /> Added to Cart!
                  </>
                ) : (
                  <>
                    <ShoppingBag className="w-5 h-5" /> Add to Cart • KSh {product.price.toLocaleString()}
                  </>
                )}
              </button>

              <button
                onClick={() => onToggleWishlist(product.id)}
                className={`p-4 rounded-2xl border transition-colors ${
                  isWishlisted 
                    ? 'bg-fits-red text-white border-fits-red' 
                    : 'bg-slate-100 border-slate-200 text-slate-500 hover:text-slate-900 hover:border-slate-300'
                }`}
              >
                <Heart className={`w-5 h-5 ${isWishlisted ? 'fill-white' : ''}`} />
              </button>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
}
