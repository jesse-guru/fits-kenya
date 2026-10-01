import React, { useState } from 'react';
import { MapPin, Phone, Clock, MessageSquare, ChevronDown, ChevronUp, Instagram, AlertTriangle } from 'lucide-react';

export default function StoreLocation() {
  const [openFaq, setOpenFaq] = useState(null);

  const faqs = [
    {
      q: 'Where is the Fits Kenya store located in Nairobi?',
      a: 'We are located at Mithoo Business Centre, 3rd Floor Shop T57 & 5th Floor Shop 508. Walk in Monday to Saturday between 9:00 AM and 8:00 PM to fit shoes or try on streetwear clothes!'
    },
    {
      q: 'How can I place an order or contact customer care?',
      a: 'You can call or WhatsApp us directly at 0742 265 504 or 0741 720 746. Please note: NO TikTok DMs 🚫 — WhatsApp and phone calls get instant responses!'
    },
    {
      q: 'How does Pay on Delivery via M-Pesa work?',
      a: 'For Nairobi deliveries, our express rider brings your items to your location. You inspect the fit first and pay via M-Pesa to our till or via STK push.'
    },
    {
      q: 'What if the shoe or clothing size does not fit?',
      a: 'We offer hassle-free size exchanges! If the rider is still at your estate, they will swap it on the spot. Upcountry orders can be shipped back to our Mithoo Business Centre shop for size swapping.'
    }
  ];

  return (
    <section id="contact" className="py-16 bg-slate-50 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left: Location & Contact Cards */}
          <div className="lg:col-span-6 space-y-6">
            <div>
              <span className="text-xs font-extrabold text-fits-accent uppercase tracking-widest block mb-1">
                📍 VISIT OUR NAIROBI STORE
              </span>
              <h2 className="text-3xl sm:text-4xl font-display font-extrabold text-slate-900 uppercase tracking-tight">
                SHOP LOCATION & CONTACT
              </h2>
              <p className="text-slate-600 text-sm mt-2">
                Walk into our Mithoo Business Centre store or call our Nairobi drip team directly for instant sizing and stock availability!
              </p>
            </div>

            {/* Address Info Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              
              <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-2">
                <div className="w-10 h-10 rounded-xl bg-amber-50 border border-fits-accent/30 flex items-center justify-center text-fits-accent">
                  <MapPin className="w-5 h-5" />
                </div>
                <h4 className="text-slate-900 font-extrabold text-sm">Store Address</h4>
                <p className="text-slate-700 text-xs leading-relaxed font-semibold">
                  Mithoo Business Centre<br />
                  3rd Floor, Shop T57 &<br />
                  5th Floor, Shop 508
                </p>
              </div>

              <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-2">
                <div className="w-10 h-10 rounded-xl bg-amber-50 border border-fits-accent/30 flex items-center justify-center text-fits-accent">
                  <Clock className="w-5 h-5" />
                </div>
                <h4 className="text-slate-900 font-extrabold text-sm">Store Hours</h4>
                <p className="text-slate-700 text-xs leading-relaxed font-semibold">
                  Monday - Saturday:<br />
                  9:00 AM - 8:00 PM<br />
                  <span className="text-slate-500 font-normal">(Sunday Closed)</span>
                </p>
              </div>

            </div>

            {/* Contact Phones Card */}
            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-amber-50 border border-fits-accent/30 flex items-center justify-center text-fits-accent">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-slate-900 font-extrabold text-sm">Call / WhatsApp Customer Lines</h4>
                  <p className="text-fits-accent font-extrabold text-sm">0742 265 504 / 0741 720 746</p>
                </div>
              </div>
            </div>

            {/* No TikTok DMs Alert Banner */}
            <div className="bg-rose-50 border border-rose-200 p-4 rounded-2xl flex items-center gap-3 text-rose-900 text-xs font-semibold shadow-sm">
              <AlertTriangle className="w-5 h-5 text-rose-600 flex-shrink-0" />
              <span>
                <strong>NO TikTok DMs 🚫</strong> — Please call or WhatsApp <strong>0742 265 504</strong> or <strong>0741 720 746</strong> for fast service and inquiries!
              </span>
            </div>

            {/* Direct WhatsApp Action Button */}
            <div className="bg-gradient-to-r from-emerald-50 to-white p-6 rounded-2xl border border-emerald-200 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-emerald-600 text-white flex items-center justify-center font-extrabold flex-shrink-0 shadow-sm">
                  <MessageSquare className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="text-slate-900 font-extrabold text-base">WhatsApp Fast Order</h4>
                  <p className="text-slate-600 text-xs">Chat directly with our team on 0742 265 504</p>
                </div>
              </div>
              <a
                href="https://wa.me/254742265504?text=Hi%20Fits%20Kenya,%20I'm%20looking%20to%20buy%20clothes%20and%20shoes!"
                target="_blank"
                rel="noreferrer"
                className="w-full sm:w-auto bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs uppercase px-6 py-3.5 rounded-xl transition-all text-center whitespace-nowrap shadow-sm"
              >
                Chat on WhatsApp
              </a>
            </div>

          </div>

          {/* Right: FAQ Accordion */}
          <div className="lg:col-span-6 space-y-4">
            <span className="text-xs font-extrabold text-fits-accent uppercase tracking-widest block mb-1">
              ❓ FREQUENTLY ASKED QUESTIONS
            </span>
            <h3 className="text-2xl font-display font-extrabold text-slate-900 uppercase tracking-tight mb-4">
              NAIROBI SHOPPING FAQs
            </h3>

            <div className="space-y-3">
              {faqs.map((faq, idx) => (
                <div
                  key={idx}
                  className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden transition-colors"
                >
                  <button
                    onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                    className="w-full p-4 text-left font-extrabold text-sm text-slate-900 flex items-center justify-between gap-4 hover:text-fits-accent"
                  >
                    <span>{faq.q}</span>
                    {openFaq === idx ? (
                      <ChevronUp className="w-4 h-4 text-fits-accent flex-shrink-0" />
                    ) : (
                      <ChevronDown className="w-4 h-4 text-slate-400 flex-shrink-0" />
                    )}
                  </button>

                  {openFaq === idx && (
                    <div className="px-4 pb-4 text-xs text-slate-600 leading-relaxed border-t border-slate-100 pt-3">
                      {faq.a}
                    </div>
                  )}
                </div>
              ))}
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
