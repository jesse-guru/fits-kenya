import React, { useState } from 'react';
import { Sparkles, Check, RefreshCw, ArrowRight, ShoppingBag, Eye } from 'lucide-react';

export default function FitFinderQuiz({ products, onQuickView, onAddToCart }) {
  const [step, setStep] = useState(1);
  const [vibe, setVibe] = useState('');
  const [budget, setBudget] = useState(10000);
  const [focus, setFocus] = useState('');
  const [completed, setCompleted] = useState(false);

  const vibes = [
    { id: 'drill', label: '🔥 Drill & Tactical Drip', desc: 'Cargo pants, dark heavy hoodies, tactical bags, clean Jordans' },
    { id: 'oversized', label: '🛹 Oversized Vintage Minimal', desc: 'Heavyweight graphic tees, acid washes, boxy fleece, Dunks' },
    { id: 'sneakerhead', label: '👟 Pure Sneakerhead', desc: 'Grail Jordan 4s, Travis Scott Mocha, New Balance 2002R' },
    { id: 'loud', label: '⚡ Bold High-Street Fashion', desc: 'Signature puffer jackets, corduroy overshirts, rubber trucker caps' }
  ];

  const focusOptions = [
    { id: 'shoes', label: '👟 Fresh Footwear & Kicks' },
    { id: 'clothes', label: '👕 Streetwear Apparel & Fits' },
    { id: 'accessories', label: '🧢 Cap, Bag & Chain Accessories' },
    { id: 'any', label: '✨ Give Me Full Drip Recommendations' }
  ];

  const handleFinish = () => {
    setCompleted(true);
  };

  const resetQuiz = () => {
    setStep(1);
    setVibe('');
    setBudget(10000);
    setFocus('');
    setCompleted(false);
  };

  const recommendations = products.filter((p) => {
    if (p.price > budget) return false;
    if (focus !== 'any' && focus !== '' && p.category !== focus) return false;
    return true;
  }).slice(0, 3);

  return (
    <section id="quiz" className="py-16 bg-slate-50 border-b border-slate-200 relative overflow-hidden">
      
      {/* Glow effect background */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[250px] bg-fits-accent/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 bg-white border border-fits-accent/40 rounded-full px-4 py-1.5 text-xs font-extrabold text-fits-accent mb-2 shadow-sm">
            <Sparkles className="w-3.5 h-3.5" /> PERSONALIZED STYLE QUIZ
          </div>
          <h2 className="text-3xl sm:text-4xl font-display font-extrabold text-slate-900 uppercase tracking-tight">
            THE FITS KENYA <span className="text-fits-accent">FIT FINDER</span>
          </h2>
          <p className="text-slate-600 text-xs sm:text-sm mt-1 max-w-xl mx-auto">
            Not sure what drip to pick? Answer 3 quick questions and our Nairobi style engine will match you with your exact outfit.
          </p>
        </div>

        {/* Quiz Box */}
        <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-10 shadow-lg">
          
          {!completed ? (
            <div className="space-y-8">
              
              {/* Progress Bar */}
              <div className="flex items-center justify-between text-xs font-extrabold text-slate-500">
                <span>STEP {step} OF 3</span>
                <span>{step === 1 ? '33%' : step === 2 ? '66%' : '100%'}</span>
              </div>
              <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden border border-slate-200">
                <div 
                  className="h-full bg-fits-accent transition-all duration-300"
                  style={{ width: `${(step / 3) * 100}%` }}
                />
              </div>

              {/* STEP 1: Select Vibe */}
              {step === 1 && (
                <div className="space-y-4">
                  <h3 className="text-lg font-extrabold text-slate-900">1. What's your overall style vibe?</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {vibes.map((v) => (
                      <button
                        key={v.id}
                        type="button"
                        onClick={() => setVibe(v.id)}
                        className={`p-4 rounded-2xl border text-left transition-all ${
                          vibe === v.id
                            ? 'bg-amber-50 border-fits-accent text-slate-900 shadow-sm'
                            : 'bg-slate-50 border-slate-200 text-slate-700 hover:border-slate-300'
                        }`}
                      >
                        <div className="font-extrabold text-sm mb-1 text-slate-900">{v.label}</div>
                        <div className="text-xs text-slate-500 font-medium">{v.desc}</div>
                      </button>
                    ))}
                  </div>

                  <div className="pt-4 flex justify-end">
                    <button
                      disabled={!vibe}
                      onClick={() => setStep(2)}
                      className={`px-6 py-3 rounded-xl font-extrabold text-xs uppercase tracking-wider flex items-center gap-2 transition-all ${
                        vibe 
                          ? 'bg-fits-accent text-white hover:bg-fits-accentHover shadow-md' 
                          : 'bg-slate-100 text-slate-400 border border-slate-200 cursor-not-allowed'
                      }`}
                    >
                      <span>Next Question</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              )}

              {/* STEP 2: Select Focus */}
              {step === 2 && (
                <div className="space-y-4">
                  <h3 className="text-lg font-extrabold text-slate-900">2. What are you looking to buy today?</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {focusOptions.map((f) => (
                      <button
                        key={f.id}
                        type="button"
                        onClick={() => setFocus(f.id)}
                        className={`p-4 rounded-2xl border text-left font-extrabold text-sm transition-all ${
                          focus === f.id
                            ? 'bg-amber-50 border-fits-accent text-fits-accent shadow-sm'
                            : 'bg-slate-50 border-slate-200 text-slate-700 hover:border-slate-300'
                        }`}
                      >
                        {f.label}
                      </button>
                    ))}
                  </div>

                  <div className="pt-4 flex justify-between">
                    <button
                      onClick={() => setStep(1)}
                      className="text-xs text-slate-500 hover:text-slate-900 font-bold"
                    >
                      ← Back
                    </button>

                    <button
                      disabled={!focus}
                      onClick={() => setStep(3)}
                      className={`px-6 py-3 rounded-xl font-extrabold text-xs uppercase tracking-wider flex items-center gap-2 transition-all ${
                        focus 
                          ? 'bg-fits-accent text-white hover:bg-fits-accentHover shadow-md' 
                          : 'bg-slate-100 text-slate-400 border border-slate-200 cursor-not-allowed'
                      }`}
                    >
                      <span>Next Question</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              )}

              {/* STEP 3: Select Budget */}
              {step === 3 && (
                <div className="space-y-6">
                  <h3 className="text-lg font-extrabold text-slate-900">3. What is your budget limit?</h3>
                  
                  <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200 text-center space-y-3">
                    <span className="text-slate-500 text-xs uppercase font-extrabold block">Max Budget:</span>
                    <span className="text-3xl font-black text-fits-accent block">
                      KSh {budget.toLocaleString()}
                    </span>
                    <input
                      type="range"
                      min="2500"
                      max="12000"
                      step="500"
                      value={budget}
                      onChange={(e) => setBudget(Number(e.target.value))}
                      className="w-full max-w-xs mx-auto accent-fits-accent cursor-pointer"
                    />
                  </div>

                  <div className="pt-4 flex justify-between items-center">
                    <button
                      onClick={() => setStep(2)}
                      className="text-xs text-slate-500 hover:text-slate-900 font-bold"
                    >
                      ← Back
                    </button>

                    <button
                      onClick={handleFinish}
                      className="bg-fits-accent text-white font-extrabold text-xs uppercase tracking-wider px-8 py-4 rounded-xl hover:bg-fits-accentHover shadow-md flex items-center gap-2"
                    >
                      <span>Show My Matched Fits</span>
                      <Sparkles className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              )}

            </div>
          ) : (
            /* Quiz Completed Results */
            <div className="space-y-6 text-center">
              <div className="inline-flex items-center gap-1 text-fits-accent font-extrabold text-xs uppercase tracking-widest bg-amber-50 px-3 py-1 rounded-full border border-fits-accent/30 shadow-sm">
                <Check className="w-4 h-4" /> STYLE ENGINE MATCH COMPLETE
              </div>

              <h3 className="text-2xl font-display font-extrabold text-slate-900">
                YOUR MATCHED NAIROBI DRIP:
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-left">
                {recommendations.length > 0 ? (
                  recommendations.map((prod) => (
                    <div key={prod.id} className="bg-slate-50 p-4 rounded-2xl border border-slate-200 flex flex-col justify-between shadow-sm">
                      <div>
                        <img src={prod.images[0]} alt="" className="w-full h-36 object-cover rounded-xl mb-3 border border-slate-200 bg-white" />
                        <span className="text-[10px] text-fits-accent font-extrabold uppercase block">{prod.subcategory}</span>
                        <h4 className="text-xs font-bold text-slate-900 line-clamp-1">{prod.name}</h4>
                        <span className="text-fits-accent font-extrabold text-sm block mt-1">KSh {prod.price.toLocaleString()}</span>
                      </div>
                      <div className="mt-4 flex gap-2">
                        <button
                          onClick={() => onQuickView(prod)}
                          className="flex-1 bg-white border border-slate-200 text-slate-800 text-[11px] font-bold py-2 rounded-lg hover:border-fits-accent text-center shadow-sm"
                        >
                          View Fit
                        </button>
                        <button
                          onClick={() => onAddToCart(prod, prod.sizes[0])}
                          className="bg-fits-accent text-white font-extrabold text-[11px] p-2 rounded-lg hover:bg-fits-accentHover shadow-sm"
                          title="Add to Cart"
                        >
                          <ShoppingBag className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="col-span-3 text-center py-8 text-slate-500 text-xs">
                    No exact items found under KSh {budget.toLocaleString()}. Try raising your budget slider!
                  </div>
                )}
              </div>

              <button
                onClick={resetQuiz}
                className="mt-6 inline-flex items-center gap-2 text-xs font-bold text-slate-500 hover:text-slate-900 uppercase tracking-wider"
              >
                <RefreshCw className="w-3.5 h-3.5" /> Retake Fit Finder Quiz
              </button>
            </div>
          )}

        </div>

      </div>
    </section>
  );
}
