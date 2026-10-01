import React, { useState, useEffect } from 'react';
import { X, Smartphone, CheckCircle, ShieldCheck, Truck, MapPin, Printer, ArrowRight, RefreshCw, User } from 'lucide-react';
import { nairobiLocations } from '../data/nairobiLocations';
import { createOrder } from '../services/api';

export default function CheckoutModal({ 
  isOpen, 
  onClose, 
  cart, 
  subtotal,
  onClearCart,
  currentUser
}) {
  if (!isOpen) return null;

  const [step, setStep] = useState('details'); // 'details' | 'mpesa_prompt' | 'success'
  
  // Shipping Form State
  const [fullName, setFullName] = useState(currentUser?.first_name || currentUser?.username || '');
  const [phone, setPhone] = useState(currentUser?.phone || '07');
  const [selectedLocation, setSelectedLocation] = useState(nairobiLocations[1]);
  const [addressNotes, setAddressNotes] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('mpesa');

  // M-Pesa Simulator State
  const [mpesaPin, setMpesaPin] = useState('');
  const [isProcessingMpesa, setIsProcessingMpesa] = useState(false);
  const [mpesaError, setMpesaError] = useState('');
  const [transactionRef, setTransactionRef] = useState('');

  // Auto pre-fill if currentUser changes
  useEffect(() => {
    if (currentUser) {
      if (!fullName) setFullName(currentUser.first_name || currentUser.username);
      if (currentUser.phone && phone === '07') setPhone(currentUser.phone);
    }
  }, [currentUser]);

  const deliveryFee = selectedLocation.fee;
  const grandTotal = subtotal + deliveryFee;

  const generateMpesaRef = () => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let ref = 'QK87';
    for (let i = 0; i < 6; i++) {
      ref += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return ref;
  };

  const submitOrderToBackend = async (ref) => {
    const orderPayload = {
      order_number: ref,
      customer_name: fullName,
      phone: phone,
      delivery_location_name: selectedLocation.name,
      delivery_fee: deliveryFee,
      address_notes: addressNotes,
      payment_method: paymentMethod,
      total_amount: grandTotal,
      status: 'confirmed',
      items: cart.map(item => ({
        product: item.backendId || null,
        product_name: item.name,
        selected_size: item.selectedSize,
        price: item.price,
        quantity: item.quantity
      }))
    };

    await createOrder(orderPayload);
  };

  const handleDetailsSubmit = async (e) => {
    e.preventDefault();
    if (!fullName.trim() || phone.trim().length < 10) {
      alert('Please enter a valid full name and Kenyan phone number (e.g. 0742265504).');
      return;
    }

    if (paymentMethod === 'mpesa') {
      setStep('mpesa_prompt');
    } else {
      const ref = generateMpesaRef();
      setTransactionRef(ref);
      await submitOrderToBackend(ref);
      setStep('success');
      onClearCart();
    }
  };

  const handleSimulateStkPush = (e) => {
    e.preventDefault();
    if (mpesaPin.length < 4) {
      setMpesaError('Please enter a 4-digit M-Pesa PIN.');
      return;
    }

    setIsProcessingMpesa(true);
    setMpesaError('');

    setTimeout(async () => {
      setIsProcessingMpesa(false);
      const ref = generateMpesaRef();
      setTransactionRef(ref);
      await submitOrderToBackend(ref);
      setStep('success');
      onClearCart();
    }, 2000);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-md flex items-center justify-center p-4">
      <div className="relative bg-white border border-slate-200 rounded-3xl max-w-2xl w-full overflow-hidden shadow-2xl my-6">
        
        {/* Modal Header */}
        <div className="p-5 border-b border-slate-200 flex items-center justify-between bg-slate-50">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-fits-accent" />
            <h2 className="text-lg font-display font-extrabold text-slate-900 uppercase tracking-tight">
              {step === 'success' ? 'Order Confirmed' : 'Fits Kenya Express Checkout'}
            </h2>
          </div>
          <button onClick={onClose} className="p-2 text-slate-400 hover:text-slate-900 rounded-lg">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* STEP 1: Shipping Details & Payment Method */}
        {step === 'details' && (
          <form onSubmit={handleDetailsSubmit} className="p-6 space-y-6 max-h-[80vh] overflow-y-auto bg-white">
            
            {/* User Logged-in Notice */}
            {currentUser && (
              <div className="bg-amber-50 border border-fits-accent/30 p-3 rounded-2xl flex items-center gap-2 text-xs text-slate-800 font-medium">
                <User className="w-4 h-4 text-fits-accent flex-shrink-0" />
                <span>LoggedIn as <strong>@{currentUser.username}</strong> — Details pre-filled automatically!</span>
              </div>
            )}

            {/* Delivery Location Selector */}
            <div>
              <label className="text-xs font-extrabold text-fits-accent uppercase tracking-wider block mb-2">
                1. Select Nairobi Estate / Delivery Area
              </label>
              <select
                value={selectedLocation.id}
                onChange={(e) => {
                  const loc = nairobiLocations.find(l => l.id === e.target.value);
                  if (loc) setSelectedLocation(loc);
                }}
                className="w-full bg-slate-50 border border-slate-200 text-xs text-slate-900 rounded-xl p-3 font-bold focus:outline-none focus:border-fits-accent"
              >
                {nairobiLocations.map((loc) => (
                  <option key={loc.id} value={loc.id}>
                    {loc.name} {loc.fee === 0 ? '(FREE Store Pickup)' : `(+KSh ${loc.fee})`} — ETA: {loc.eta}
                  </option>
                ))}
              </select>
            </div>

            {/* Contact Details */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">Full Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Brian Otieno"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 text-xs text-slate-900 rounded-xl p-3 focus:outline-none focus:border-fits-accent font-medium"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">M-Pesa Phone Number</label>
                <input
                  type="tel"
                  required
                  placeholder="0742265504"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 text-xs text-slate-900 font-mono rounded-xl p-3 focus:outline-none focus:border-fits-accent font-bold"
                />
              </div>
            </div>

            {/* Detailed Street / House Address */}
            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1">Building Name / Apartment / Street Notes</label>
              <input
                type="text"
                placeholder="e.g. Mithoo Business Centre 3rd Flr Shop T57 / Westlands"
                value={addressNotes}
                onChange={(e) => setAddressNotes(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 text-xs text-slate-900 rounded-xl p-3 focus:outline-none focus:border-fits-accent font-medium"
              />
            </div>

            {/* Payment Method Selector */}
            <div>
              <label className="text-xs font-extrabold text-fits-accent uppercase tracking-wider block mb-2">
                2. Select Payment Method
              </label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setPaymentMethod('mpesa')}
                  className={`p-4 rounded-xl border flex flex-col items-center justify-center text-center transition-all ${
                    paymentMethod === 'mpesa'
                      ? 'bg-amber-50 border-fits-accent text-fits-accent'
                      : 'bg-slate-50 border-slate-200 text-slate-600 hover:text-slate-900'
                  }`}
                >
                  <Smartphone className="w-6 h-6 mb-1" />
                  <span className="text-xs font-extrabold">M-PESA Express</span>
                  <span className="text-[10px] text-slate-500">STK Push Simulation</span>
                </button>

                <button
                  type="button"
                  onClick={() => setPaymentMethod('cod')}
                  className={`p-4 rounded-xl border flex flex-col items-center justify-center text-center transition-all ${
                    paymentMethod === 'cod'
                      ? 'bg-amber-50 border-fits-accent text-fits-accent'
                      : 'bg-slate-50 border-slate-200 text-slate-600 hover:text-slate-900'
                  }`}
                >
                  <Truck className="w-6 h-6 mb-1" />
                  <span className="text-xs font-extrabold">Cash on Delivery</span>
                  <span className="text-[10px] text-slate-500">Pay Rider Upon Inspection</span>
                </button>
              </div>
            </div>

            {/* Summary Breakdown */}
            <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 space-y-2 text-xs">
              <div className="flex justify-between text-slate-600">
                <span>Items Subtotal ({cart.length} items):</span>
                <span className="font-bold text-slate-900">KSh {subtotal.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-slate-600">
                <span>Nairobi Delivery ({selectedLocation.name}):</span>
                <span className="font-bold text-fits-accent">
                  {deliveryFee === 0 ? 'FREE' : `KSh ${deliveryFee}`}
                </span>
              </div>
              <div className="flex justify-between pt-2 border-t border-slate-200 text-sm font-extrabold text-slate-900">
                <span>Total Amount Due:</span>
                <span className="text-fits-accent text-base">KSh {grandTotal.toLocaleString()}</span>
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-fits-accent text-white font-extrabold text-sm uppercase py-4 rounded-xl hover:bg-fits-accentHover transition-all shadow-md flex items-center justify-center gap-2"
            >
              <span>{paymentMethod === 'mpesa' ? 'Simulate M-Pesa Payment' : 'Confirm Order'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>

          </form>
        )}

        {/* STEP 2: Interactive M-Pesa STK Push Simulator */}
        {step === 'mpesa_prompt' && (
          <div className="p-8 text-center space-y-6 bg-white">
            
            {/* Simulated Phone Screen Graphic */}
            <div className="max-w-xs mx-auto bg-green-950/90 border-2 border-green-500 rounded-3xl p-6 text-slate-100 shadow-xl">
              <div className="w-12 h-1 bg-green-500/40 rounded-full mx-auto mb-4" />
              <Smartphone className="w-10 h-10 text-green-400 mx-auto mb-2 animate-bounce-subtle" />
              
              <h3 className="font-mono text-sm font-extrabold text-green-400 mb-1">SAFARICOM M-PESA</h3>
              <p className="text-xs text-slate-200 font-sans mb-4">
                Do you want to pay <strong className="text-white">KSh {grandTotal.toLocaleString()}</strong> to <strong className="text-green-300">FITS KENYA</strong> for Account <strong className="text-white">{phone}</strong>?
              </p>

              {isProcessingMpesa ? (
                <div className="py-6 flex flex-col items-center justify-center gap-2">
                  <RefreshCw className="w-8 h-8 text-green-400 animate-spin" />
                  <span className="text-xs font-bold text-green-300">Processing STK Push...</span>
                </div>
              ) : (
                <form onSubmit={handleSimulateStkPush} className="space-y-3">
                  <input
                    type="password"
                    maxLength={4}
                    autoFocus
                    placeholder="Enter 4-Digit M-Pesa PIN"
                    value={mpesaPin}
                    onChange={(e) => setMpesaPin(e.target.value)}
                    className="w-full bg-slate-900 border border-green-500 text-center text-lg font-mono text-white tracking-widest rounded-xl py-2 focus:outline-none"
                  />
                  {mpesaError && <p className="text-[11px] text-red-400 font-bold">{mpesaError}</p>}
                  
                  <button
                    type="submit"
                    className="w-full bg-green-500 text-black font-extrabold text-xs uppercase py-3 rounded-xl hover:bg-green-400 transition-colors"
                  >
                    Send M-Pesa Payment
                  </button>
                </form>
              )}
            </div>

            <p className="text-xs text-slate-500">
              Simulating Safaricom STK Push query for test phone <strong className="text-slate-800">{phone}</strong>.
            </p>

            <button
              onClick={() => setStep('details')}
              className="text-xs text-slate-500 hover:text-slate-900 underline font-semibold"
            >
              ← Back to Details
            </button>

          </div>
        )}

        {/* STEP 3: Order Confirmation & Receipt */}
        {step === 'success' && (
          <div className="p-8 text-center space-y-6 bg-white">
            <div className="w-16 h-16 bg-fits-accent/15 border border-fits-accent rounded-full flex items-center justify-center mx-auto text-fits-accent">
              <CheckCircle className="w-10 h-10" />
            </div>

            <div>
              <span className="text-xs font-bold text-fits-accent uppercase tracking-widest block mb-1">
                Order #{transactionRef} Placed
              </span>
              <h3 className="text-2xl font-display font-extrabold text-slate-900">
                THANK YOU, {fullName.toUpperCase()}!
              </h3>
              <p className="text-xs text-slate-600 mt-1">
                Your order is recorded in our Django store backend and dispatches to <strong>{selectedLocation.name}</strong>.
              </p>
            </div>

            {/* Receipt Box */}
            <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 text-left space-y-2 text-xs font-mono text-slate-800">
              <div className="flex justify-between border-b border-slate-200 pb-2">
                <span>M-PESA REF:</span>
                <span className="text-fits-accent font-bold">{transactionRef}</span>
              </div>
              <div className="flex justify-between">
                <span>Customer:</span>
                <span className="text-slate-900">{fullName} ({phone})</span>
              </div>
              <div className="flex justify-between">
                <span>Destination:</span>
                <span className="text-slate-900">{selectedLocation.name}</span>
              </div>
              <div className="flex justify-between">
                <span>Payment Method:</span>
                <span className="text-slate-900 uppercase">{paymentMethod === 'mpesa' ? 'M-Pesa STK Push' : 'Cash on Delivery'}</span>
              </div>
              <div className="flex justify-between border-t border-slate-200 pt-2 text-sm font-extrabold text-slate-900 font-sans">
                <span>Total Paid:</span>
                <span className="text-fits-accent">KSh {grandTotal.toLocaleString()}</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <a
                href={`https://wa.me/254742265504?text=Hi%20Fits%20Kenya,%20I%20just%20placed%20order%20%23${transactionRef}%20for%20${selectedLocation.name}!`}
                target="_blank"
                rel="noreferrer"
                className="flex-1 bg-green-600 text-white font-extrabold text-xs uppercase py-3.5 rounded-xl hover:bg-green-500 transition-colors flex items-center justify-center gap-2 shadow-sm"
              >
                Track Order on WhatsApp (0742 265 504)
              </a>
              <button
                onClick={() => window.print()}
                className="bg-white border border-slate-300 hover:border-fits-accent text-slate-800 text-xs font-bold px-4 py-3.5 rounded-xl transition-colors flex items-center justify-center gap-2 shadow-sm"
              >
                <Printer className="w-4 h-4" /> Print Receipt
              </button>
            </div>

            <button
              onClick={onClose}
              className="text-xs text-slate-500 hover:text-slate-900 uppercase tracking-wider font-extrabold pt-2 block mx-auto"
            >
              Continue Shopping
            </button>

          </div>
        )}

      </div>
    </div>
  );
}
