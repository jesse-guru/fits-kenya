import React from 'react';
import { ArrowRight, Zap, ShieldCheck, Truck, Sparkles } from 'lucide-react';

export default function Hero({ onExploreClick, onQuizClick }) {
  return (
    <div className="relative overflow-hidden bg-slate-50 border-b border-slate-200 py-12 md:py-20 lg:py-24">
      
      {/* Background Decorative Lighting */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-fits-accent/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Hero Content */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            
        

            {/* Headline */}
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-display font-black tracking-tight text-slate-900 uppercase leading-[1.05]">
              STEP IN YOUR <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-fits-accent via-amber-600 to-yellow-600">
                TRUE DRIP
              </span>
            </h1>

            {/* Subheading */}
            <p className="text-slate-600 text-base sm:text-lg max-w-2xl font-medium leading-relaxed mx-auto lg:mx-0">
              Curated urban streetwear, heavyweight graphic tees, tactical cargos, and 100% authentic sneakers delivered straight to your door in Nairobi within hours. Pay on delivery via M-Pesa.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
              <button
                onClick={onExploreClick}
                className="w-full sm:w-auto bg-fits-accent text-white font-extrabold text-sm uppercase tracking-wider px-8 py-4 rounded-xl hover:bg-fits-accentHover transition-all flex items-center justify-center gap-3 shadow-lg hover:scale-[1.02]"
              >
                <span>Shop New Drops</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={onQuizClick}
                className="w-full sm:w-auto bg-white border border-slate-300 hover:border-fits-accent text-slate-800 font-bold text-sm uppercase tracking-wider px-6 py-4 rounded-xl transition-all flex items-center justify-center gap-2 hover:bg-slate-50 shadow-sm"
              >
                <span> Take Fit Finder Quiz</span>
              </button>
            </div>

            {/* Micro Feature Badges */}
            <div className="grid grid-cols-3 gap-4 pt-8 border-t border-slate-200 max-w-xl mx-auto lg:mx-0">
              <div className="flex flex-col items-center lg:items-start text-center lg:text-left">
                <div className="flex items-center gap-1.5 text-fits-accent font-extrabold text-sm sm:text-base">
                  <Zap className="w-4 h-4" /> 2-4 Hours
                </div>
                <span className="text-slate-500 text-xs mt-0.5">Express Nairobi Rider</span>
              </div>

              <div className="flex flex-col items-center lg:items-start text-center lg:text-left">
                <div className="flex items-center gap-1.5 text-fits-accent font-extrabold text-sm sm:text-base">
                  <ShieldCheck className="w-4 h-4" /> 100% Legit
                </div>
                <span className="text-slate-400 text-xs mt-0.5">Authentic Gear Only</span>
              </div>

              <div className="flex flex-col items-center lg:items-start text-center lg:text-left">
                <div className="flex items-center gap-1.5 text-fits-accent font-extrabold text-sm sm:text-base">
                  <Truck className="w-4 h-4" /> Pay On Delivery
                </div>
                <span className="text-slate-500 text-xs mt-0.5">M-Pesa / Cash Ready</span>
              </div>
            </div>

          </div>

          {/* Right Hero Image Composition */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              
              {/* Main Visual Image Card */}
              <div className="relative rounded-2xl overflow-hidden border border-slate-200 bg-white shadow-xl group">
                <img
                  src="https://images.unsplash.com/photo-1552346154-21d32810aba3?auto=format&fit=crop&q=80&w=800"
                  alt="Fits Kenya Jordan 4 Drip"
                  className="w-full h-[440px] object-cover object-center group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-transparent to-transparent" />
                
                {/* Floating Tag Badge */}
                <div className="absolute bottom-6 left-6 right-6 bg-white/95 backdrop-blur-md p-4 rounded-xl border border-slate-200 shadow-lg">
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-xs font-bold text-fits-accent uppercase tracking-wider block">Featured Kick</span>
                      <h4 className="text-slate-900 font-extrabold text-sm">Jordan 4 Retro Military Black</h4>
                      <p className="text-slate-700 font-bold text-xs mt-0.5">KSh 7,500</p>
                    </div>
                    <button
                      onClick={onExploreClick}
                      className="bg-fits-accent text-white font-extrabold text-xs px-3 py-2 rounded-lg hover:bg-fits-accentHover shadow-sm"
                    >
                      View Drop
                    </button>
                  </div>
                </div>
              </div>

              {/* Decorative Secondary Overlay Card */}
              <div className="hidden sm:flex absolute -bottom-6 -left-6 bg-white p-3.5 rounded-xl border border-slate-200 shadow-xl items-center gap-3">
                <div className="w-12 h-12 rounded-lg overflow-hidden flex-shrink-0">
                  <img
                    src="https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&q=80&w=200"
                    alt="Heavyweight Graphic Tee"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <div className="flex items-center gap-1 text-[11px] font-bold text-fits-accent">
                     Trending Fit
                  </div>
                  <span className="text-slate-900 font-bold text-xs block">Nairobi Boxy Graphic Tee</span>
                  <span className="text-slate-500 text-[11px]">KSh 2,400</span>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
