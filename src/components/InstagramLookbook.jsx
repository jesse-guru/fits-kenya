import React, { useState } from 'react';
import { Instagram, ShoppingBag, Heart, MapPin, Sparkles, X } from 'lucide-react';
import { lookbookItems } from '../data/lookbook';

export default function InstagramLookbook({ products, onQuickView, onAddToCart }) {
  const [selectedPost, setSelectedPost] = useState(null);

  return (
    <section id="lookbook" className="py-16 bg-fits-dark border-b border-fits-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 bg-fits-card border border-fits-accent/30 rounded-full px-4 py-1.5 text-xs font-extrabold text-fits-accent mb-3">
            <Instagram className="w-3.5 h-3.5" /> SHOP THE INSTAGRAM FEED
          </div>
          <h2 className="text-3xl sm:text-5xl font-display font-extrabold text-white uppercase tracking-tight">
            #FITS<span className="text-fits-accent">KENYA</span> LOOKBOOK
          </h2>
          <p className="text-slate-400 text-sm mt-2">
            Nairobi creators wearing their favorite Fits Kenya streetwear & kicks. Click any photo to shop the exact drip!
          </p>
        </div>

        {/* Instagram Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {lookbookItems.map((post) => (
            <div
              key={post.id}
              onClick={() => setSelectedPost(post)}
              className="group relative bg-fits-card rounded-2xl overflow-hidden border border-fits-border hover:border-fits-accent cursor-pointer transition-all duration-300 shadow-xl"
            >
              <div className="relative aspect-[4/5] overflow-hidden bg-fits-black">
                <img
                  src={post.image}
                  alt={post.caption}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                
                {/* Overlay on hover */}
                <div className="absolute inset-0 bg-gradient-to-t from-fits-black via-fits-black/40 to-transparent opacity-60 group-hover:opacity-80 transition-opacity" />

                {/* Creator tag */}
                <div className="absolute top-3 left-3 bg-fits-black/80 backdrop-blur-md px-3 py-1 rounded-full border border-fits-border flex items-center gap-1 text-xs font-bold text-white">
                  <Instagram className="w-3 h-3 text-fits-accent" />
                  <span>{post.creator}</span>
                </div>

                {/* Likes badge */}
                <div className="absolute top-3 right-3 bg-fits-black/80 backdrop-blur-md px-2.5 py-1 rounded-full border border-fits-border flex items-center gap-1 text-xs font-bold text-slate-300">
                  <Heart className="w-3 h-3 fill-fits-red text-fits-red" />
                  <span>{post.likes}</span>
                </div>

                {/* Bottom caption snippet & shop CTA */}
                <div className="absolute inset-x-3 bottom-3 space-y-2">
                  <div className="flex items-center gap-1 text-[11px] font-bold text-fits-accent">
                    <MapPin className="w-3 h-3" /> {post.location}
                  </div>
                  <p className="text-xs text-slate-200 line-clamp-2 font-medium">
                    {post.caption}
                  </p>
                  <div className="w-full bg-fits-accent text-fits-black font-extrabold text-xs py-2 rounded-xl flex items-center justify-center gap-1.5 opacity-90 group-hover:opacity-100 transition-opacity shadow-md">
                    <ShoppingBag className="w-3.5 h-3.5" /> Shop This Fit ({post.taggedProductIds.length} items)
                  </div>
                </div>

              </div>
            </div>
          ))}
        </div>

        {/* Follow IG Footer Banner */}
        <div className="mt-12 bg-fits-card p-6 rounded-2xl border border-fits-border flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-yellow-500 via-pink-500 to-purple-600 flex items-center justify-center text-white flex-shrink-0">
              <Instagram className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-white font-extrabold text-base">Follow @fits_kenya on Instagram</h4>
              <p className="text-slate-400 text-xs">Tag #FitsKenya in your outfit posts to get featured on our website!</p>
            </div>
          </div>
          <a
            href="https://instagram.com/fits_kenya"
            target="_blank"
            rel="noreferrer"
            className="bg-fits-accent text-fits-black font-extrabold text-xs uppercase tracking-wider px-6 py-3.5 rounded-xl hover:bg-fits-accentHover transition-colors"
          >
            Visit Instagram @fits_kenya
          </a>
        </div>

      </div>

      {/* Shoppable Post Modal Popup */}
      {selectedPost && (
        <div className="fixed inset-0 z-50 bg-fits-black/85 backdrop-blur-md flex items-center justify-center p-4">
          <div className="relative bg-fits-card border border-fits-border rounded-3xl max-w-3xl w-full overflow-hidden shadow-2xl my-6 grid grid-cols-1 md:grid-cols-2">
            
            <button
              onClick={() => setSelectedPost(null)}
              className="absolute top-4 right-4 z-20 p-2 text-slate-400 hover:text-white bg-fits-black/70 rounded-full border border-fits-border"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Left: Image */}
            <div className="relative aspect-[4/5] bg-fits-black">
              <img src={selectedPost.image} alt="" className="w-full h-full object-cover" />
              <div className="absolute top-4 left-4 bg-fits-black/80 backdrop-blur-md px-3 py-1.5 rounded-full border border-fits-border flex items-center gap-1.5 text-xs font-extrabold text-white">
                <Instagram className="w-4 h-4 text-fits-accent" />
                <span>{selectedPost.creator}</span>
              </div>
            </div>

            {/* Right: Tagged Items List */}
            <div className="p-6 flex flex-col justify-between max-h-[80vh] overflow-y-auto">
              <div>
                <div className="flex items-center gap-1.5 text-xs text-fits-accent font-bold mb-2">
                  <MapPin className="w-3.5 h-3.5" /> {selectedPost.location}
                </div>
                <p className="text-sm text-slate-200 font-medium mb-6">
                  "{selectedPost.caption}"
                </p>

                <h4 className="text-xs font-extrabold text-white uppercase tracking-wider mb-3">
                  Tagged Items in This Post:
                </h4>

                <div className="space-y-3">
                  {selectedPost.taggedProductIds.map((pid) => {
                    const prod = products.find(p => p.id === pid);
                    if (!prod) return null;
                    return (
                      <div key={prod.id} className="bg-fits-dark p-3 rounded-xl border border-fits-border flex items-center justify-between gap-3">
                        <img src={prod.images[0]} alt="" className="w-14 h-14 object-cover rounded-lg flex-shrink-0" />
                        <div className="flex-1 min-w-0">
                          <h5 className="text-xs font-bold text-white truncate">{prod.name}</h5>
                          <span className="text-fits-accent font-extrabold text-xs block">KSh {prod.price.toLocaleString()}</span>
                        </div>
                        <button
                          onClick={() => {
                            setSelectedPost(null);
                            onQuickView(prod);
                          }}
                          className="bg-fits-accent text-fits-black font-extrabold text-[11px] px-3 py-2 rounded-lg hover:bg-fits-accentHover whitespace-nowrap"
                        >
                          View Item
                        </button>
                      </div>
                    );
                  })}
                </div>
              </div>

              <div className="pt-4 border-t border-fits-border text-center">
                <span className="text-[11px] text-slate-400 font-semibold">
                  Same-day delivery available in Nairobi for all tagged items!
                </span>
              </div>

            </div>

          </div>
        </div>
      )}

    </section>
  );
}
