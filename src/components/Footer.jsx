import React from 'react';
import { Instagram, MapPin, Phone, Mail, ShieldCheck, Heart } from 'lucide-react';

export default function Footer({ onNavigate }) {
  return (
    <footer className="bg-white border-t border-slate-200 pt-16 pb-12 text-slate-600 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-slate-200">
          
          {/* Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3 cursor-pointer group" onClick={() => onNavigate('home')}>
              <div className="w-12 h-12 rounded-xl overflow-hidden border border-fits-accent/40 bg-white p-0.5 shadow-sm">
                <img src="/logo.jpg" alt="Fits Kenya Logo" className="w-full h-full object-contain" />
              </div>
              <span className="font-display font-black text-2xl tracking-tighter text-slate-900">
                FITS <span className="text-fits-accent">KENYA</span>
              </span>
            </div>

            <p className="text-slate-600 text-xs max-w-sm leading-relaxed font-medium">
              Nairobi's premier street fashion & authentic sneaker destination. Located at Mithoo Business Centre, 3rd Floor T57 & 5th Floor 508. Fast same-day express delivery across Nairobi.
            </p>

            <div className="flex items-center gap-3 pt-2">
              <a
                href="https://instagram.com/fitskenya254"
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-full bg-slate-100 border border-slate-200 flex items-center justify-center text-slate-700 hover:text-fits-accent hover:border-fits-accent transition-colors shadow-sm"
                title="Fits Kenya Instagram @fitskenya254"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href="https://wa.me/254742265504"
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-full bg-slate-100 border border-slate-200 flex items-center justify-center text-slate-700 hover:text-emerald-600 hover:border-emerald-600 transition-colors shadow-sm"
                title="WhatsApp 0742 265 504"
              >
                <Phone className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Navigation Links */}
          <div className="space-y-3">
            <h4 className="text-slate-900 font-extrabold text-xs uppercase tracking-wider">Shop Collections</h4>
            <ul className="space-y-2 font-semibold text-slate-700">
              <li><button onClick={() => onNavigate('new-arrivals')} className="hover:text-fits-accent">🔥 Fresh New Arrivals</button></li>
              <li><button onClick={() => onNavigate('shop', 'clothes')} className="hover:text-fits-accent">Streetwear Apparel</button></li>
              <li><button onClick={() => onNavigate('shop', 'shoes')} className="hover:text-fits-accent">Authentic Sneakers & Kicks</button></li>
              <li><button onClick={() => onNavigate('shop', 'accessories')} className="hover:text-fits-accent">Caps & Accessories</button></li>
            </ul>
          </div>

          {/* Quick Features */}
          <div className="space-y-3">
            <h4 className="text-slate-900 font-extrabold text-xs uppercase tracking-wider">Customer Care</h4>
            <ul className="space-y-2 font-semibold text-slate-700">
              <li><button onClick={() => onNavigate('contact')} className="hover:text-fits-accent">Mithoo Business Centre Location</button></li>
              <li><button onClick={() => onNavigate('contact')} className="hover:text-fits-accent">Delivery Fees & Estates</button></li>
              <li><button onClick={() => onNavigate('contact')} className="hover:text-fits-accent">M-Pesa Payment FAQs</button></li>
              <li><button onClick={() => onNavigate('contact')} className="hover:text-fits-accent">Size Exchange Policy</button></li>
              <li><button onClick={() => onNavigate('quiz')} className="hover:text-fits-accent">Take Fit Finder Quiz</button></li>
            </ul>
          </div>

          {/* Payment Methods & Verification */}
          <div className="space-y-3">
            <h4 className="text-slate-900 font-extrabold text-xs uppercase tracking-wider">Contact & Delivery</h4>
            <p className="text-[11px] leading-relaxed text-slate-700 font-medium">
              📞 Lines: <strong className="text-slate-900">0742 265 504</strong> / <strong className="text-slate-900">0741 720 746</strong><br />
              🕒 Mon-Sat: 9am - 8pm<br />
              <span className="text-rose-600 font-bold">🚫 NO TikTok DMs</span>
            </p>
            <div className="space-y-1.5 pt-1">
              <div className="bg-emerald-50 border border-emerald-200 p-2 rounded-lg flex items-center gap-2 font-mono text-[11px] text-emerald-800 font-bold">
                <span>📱 M-PESA Till: 882910</span>
              </div>
              <div className="bg-amber-50 border border-fits-accent/30 p-2 rounded-lg flex items-center gap-2 font-mono text-[11px] text-fits-accent font-bold">
                <span>🚚 Express 2-4 Hr Delivery</span>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Copyright */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <p className="text-[11px] text-slate-500 font-medium">
            © {new Date().getFullYear()} FITS KENYA (@fitskenya254). All rights reserved.
          </p>
          <div className="flex items-center gap-1 text-[11px] text-slate-500 font-medium">
            <span>Designed with</span>
            <Heart className="w-3.5 h-3.5 text-fits-red fill-fits-red" />
            <span>for Nairobi Street Culture</span>
          </div>
        </div>

      </div>
    </footer>
  );
}
