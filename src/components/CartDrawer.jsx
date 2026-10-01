import React, { useState } from 'react';
import { X, Trash2, Plus, Minus, ShoppingBag, ArrowRight, ShieldCheck, Tag, Zap } from 'lucide-react';

export default function CartDrawer({ 
  isOpen, 
  onClose, 
  cart, 
  onUpdateQuantity, 
  onRemoveItem,
  onProceedCheckout 
}) {
  if (!isOpen) return null;

  const [promoInput, setPromoInput] = useState('');
  const [appliedPromo, setAppliedPromo] = useState(null);
  const [promoError, setPromoError] = useState('');

  const FREE_DELIVERY_THRESHOLD = 8000;

  const subtotal = cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);
  const discountAmount = appliedPromo ? Math.round(subtotal * 0.1) : 0;
  const finalSubtotal = Math.max(0, subtotal - discountAmount);

  const freeDeliveryProgress = Math.min(100, Math.round((subtotal / FREE_DELIVERY_THRESHOLD) * 100));
  const amountToFreeDelivery = Math.max(0, FREE_DELIVERY_THRESHOLD - subtotal);

  const handleApplyPromo = (e) => {
    e.preventDefault();
    if (promoInput.trim().toUpperCase() === 'NAIROBI10' || promoInput.trim().toUpperCase() === 'FITSKENYA') {
      setAppliedPromo(promoInput.trim().toUpperCase());
      setPromoError('');
    } else {
      setPromoError('Invalid promo code. Try "NAIROBI10" for 10% off');
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-slate-900/60 backdrop-blur-sm transition-opacity">
      <div className="absolute inset-0" onClick={onClose} />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white border-l border-slate-200 flex flex-col shadow-2xl">
          
          {/* Cart Header */}
          <div className="p-5 border-b border-slate-200 flex items-center justify-between bg-slate-50">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-fits-accent" />
              <h2 className="text-lg font-display font-extrabold text-slate-900 uppercase tracking-tight">
                YOUR SHOPPING BAG ({cart.reduce((a, b) => a + b.quantity, 0)})
              </h2>
            </div>
            <button 
              onClick={onClose}
              className="p-2 text-slate-400 hover:text-slate-900 rounded-lg transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Free Delivery Tracker Bar */}
          <div className="bg-amber-50/60 p-3.5 border-b border-amber-200/60 px-5">
            <div className="flex items-center justify-between text-xs font-bold text-slate-700 mb-1.5">
              <span>
                {amountToFreeDelivery > 0 ? (
                  <>Add <strong className="text-fits-accent">KSh {amountToFreeDelivery.toLocaleString()}</strong> more for FREE Nairobi Delivery!</>
                ) : (
                  <span className="text-fits-accent flex items-center gap-1 font-extrabold">
                    <Zap className="w-3.5 h-3.5" /> 🎉 YOU QUALIFY FOR FREE NAIROBI DELIVERY!
                  </span>
                )}
              </span>
              <span>{freeDeliveryProgress}%</span>
            </div>
            <div className="w-full h-2 bg-slate-200 rounded-full overflow-hidden border border-slate-300">
              <div 
                className="h-full bg-fits-accent transition-all duration-500" 
                style={{ width: `${freeDeliveryProgress}%` }}
              />
            </div>
          </div>

          {/* Cart Items List */}
          <div className="flex-1 overflow-y-auto p-5 space-y-4">
            {cart.length === 0 ? (
              <div className="text-center py-16">
                <div className="w-16 h-16 rounded-full bg-slate-100 border border-slate-200 flex items-center justify-center mx-auto mb-4 text-slate-400">
                  <ShoppingBag className="w-8 h-8" />
                </div>
                <h3 className="text-base font-bold text-slate-900 mb-1">Your Shopping Bag is Empty</h3>
                <p className="text-xs text-slate-500 max-w-xs mx-auto mb-6">
                  Browse our catalog to pick out your fresh sneakers, heavyweight tees, or tactical cargos!
                </p>
                <button
                  onClick={onClose}
                  className="bg-fits-accent text-white font-extrabold text-xs px-6 py-3 rounded-xl uppercase tracking-wider shadow"
                >
                  Start Shopping
                </button>
              </div>
            ) : (
              cart.map((item) => (
                <div 
                  key={`${item.id}-${item.selectedSize}`}
                  className="bg-slate-50 p-3.5 rounded-2xl border border-slate-200 flex gap-4 items-center"
                >
                  <img
                    src={item.images[0]}
                    alt={item.name}
                    className="w-20 h-20 object-cover rounded-xl border border-slate-200 flex-shrink-0 bg-white"
                  />

                  <div className="flex-1 min-w-0">
                    <h4 className="text-xs font-extrabold text-slate-900 truncate">{item.name}</h4>
                    <div className="flex items-center gap-2 mt-1 text-[11px]">
                      <span className="bg-white text-fits-accent font-bold px-2 py-0.5 rounded border border-slate-200">
                        Size: {item.selectedSize}
                      </span>
                      <span className="text-slate-500">{item.subcategory}</span>
                    </div>
                    <span className="text-fits-accent font-black text-sm block mt-1.5">
                      KSh {(item.price * item.quantity).toLocaleString()}
                    </span>
                  </div>

                  {/* Quantity Actions */}
                  <div className="flex flex-col items-end justify-between h-full gap-2">
                    <button
                      onClick={() => onRemoveItem(item.id, item.selectedSize)}
                      className="text-slate-400 hover:text-fits-red p-1 transition-colors"
                      title="Remove Item"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>

                    <div className="flex items-center border border-slate-300 bg-white rounded-lg overflow-hidden">
                      <button
                        onClick={() => onUpdateQuantity(item.id, item.selectedSize, item.quantity - 1)}
                        className="px-2 py-1 text-slate-500 hover:text-slate-900"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="px-2 text-xs font-bold text-slate-900">{item.quantity}</span>
                      <button
                        onClick={() => onUpdateQuantity(item.id, item.selectedSize, item.quantity + 1)}
                        className="px-2 py-1 text-slate-500 hover:text-slate-900"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Cart Footer */}
          {cart.length > 0 && (
            <div className="p-5 bg-slate-50 border-t border-slate-200 space-y-4">
              
              {/* Promo Code Input */}
              <form onSubmit={handleApplyPromo} className="relative">
                <div className="flex gap-2">
                  <div className="relative flex-1">
                    <input
                      type="text"
                      placeholder="Promo code (e.g. NAIROBI10)"
                      value={promoInput}
                      onChange={(e) => setPromoInput(e.target.value)}
                      className="w-full bg-white border border-slate-200 rounded-xl py-2 pl-9 pr-3 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-fits-accent uppercase"
                    />
                    <Tag className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-3" />
                  </div>
                  <button
                    type="submit"
                    className="bg-white border border-slate-200 hover:border-fits-accent text-slate-800 hover:text-fits-accent text-xs font-bold px-3 py-2 rounded-xl transition-colors shadow-sm"
                  >
                    Apply
                  </button>
                </div>
                {appliedPromo && (
                  <span className="text-[11px] text-fits-accent font-bold mt-1 block">
                    ✓ Code '{appliedPromo}' Applied! 10% Discount Saved.
                  </span>
                )}
                {promoError && (
                  <span className="text-[11px] text-fits-red font-bold mt-1 block">
                    {promoError}
                  </span>
                )}
              </form>

              {/* Cost Summary */}
              <div className="space-y-1.5 text-xs text-slate-600">
                <div className="flex justify-between">
                  <span>Bag Subtotal:</span>
                  <span className="font-bold text-slate-900">KSh {subtotal.toLocaleString()}</span>
                </div>
                {appliedPromo && (
                  <div className="flex justify-between text-fits-accent font-bold">
                    <span>Promo Discount (10%):</span>
                    <span>- KSh {discountAmount.toLocaleString()}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>Nairobi Delivery:</span>
                  <span className="text-slate-400 italic">Calculated at Checkout</span>
                </div>
                <div className="flex justify-between pt-2 border-t border-slate-200 text-base font-extrabold text-slate-900">
                  <span>Total Due:</span>
                  <span className="text-fits-accent text-lg">KSh {finalSubtotal.toLocaleString()}</span>
                </div>
              </div>

              {/* Checkout CTA */}
              <button
                onClick={onProceedCheckout}
                className="w-full bg-fits-accent text-white font-extrabold text-sm uppercase tracking-wider py-4 rounded-xl hover:bg-fits-accentHover transition-all flex items-center justify-center gap-2 shadow-md"
              >
                <span>Proceed to Checkout</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <div className="flex items-center justify-center gap-2 text-[11px] text-slate-500 font-medium pt-1">
                <ShieldCheck className="w-3.5 h-3.5 text-fits-accent" />
                <span>M-Pesa STK Push & Cash on Delivery Accepted</span>
              </div>

            </div>
          )}

        </div>
      </div>
    </div>
  );
}
