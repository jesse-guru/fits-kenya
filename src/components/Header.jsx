import React, { useState } from 'react';
import { ShoppingBag, Heart, Search, Zap, MapPin, Instagram, X, Menu, User, LogOut, ChevronDown } from 'lucide-react';

export default function Header({ 
  currentPage,
  onNavigate,
  cartCount, 
  wishlistCount, 
  onOpenCart, 
  searchQuery, 
  setSearchQuery,
  setActiveCategory,
  currentUser,
  onOpenAuth,
  onLogout
}) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showSearchModal, setShowSearchModal] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);

  const navLinks = [
    { id: 'home', label: 'Home' },
    { id: 'new-arrivals', label: ' New Arrivals', isSpecial: true },
    { id: 'shop', label: 'Shop All' },
    { id: 'quiz', label: 'Fit Finder' },
    { id: 'contact', label: 'Store & FAQs' }
  ];

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-sm">
      {/* Top Ticker Bar */}
      <div className="bg-fits-accent text-black py-1.5 px-4 font-semibold text-xs overflow-hidden select-none">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2 animate-pulse-slow font-extrabold">
            <Zap className="w-3.5 h-3.5 fill-black" />
            <span> SAME-DAY NAIROBI DELIVERY | CALL: 0742 265 504 / 0741 720 746</span>
          </div>
          <div className="hidden md:flex items-center gap-4 text-[11px] uppercase tracking-wider font-bold">
            <button 
              onClick={() => onNavigate('contact')}
              className="flex items-center gap-1 hover:underline"
            >
              <MapPin className="w-3 h-3" /> Mithoo Business Centre, 3rd Flr T57 & 5th Flr 508
            </button>
            <a 
              href="https://instagram.com/fitskenya254" 
              target="_blank" 
              rel="noreferrer"
              className="flex items-center gap-1 hover:underline"
            >
              <Instagram className="w-3 h-3" /> @fitskenya254
            </a>
          </div>
        </div>
      </div>

      {/* Main Header Nav */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Mobile Menu Button */}
          <div className="flex items-center lg:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-slate-700 hover:text-fits-accent rounded-lg"
              aria-label="Toggle Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

          {/* Logo with uploaded Image */}
          <div className="flex items-center gap-3 cursor-pointer group" onClick={() => onNavigate('home')}>
            <div className="w-11 h-11 rounded-xl overflow-hidden border border-fits-accent/40 bg-white p-0.5 shadow-sm group-hover:scale-105 transition-transform">
              <img src="/logo.jpg" alt="Fits Kenya Logo" className="w-full h-full object-contain" />
            </div>
            <div>
              <span className="font-display font-black text-2xl tracking-tighter text-slate-900 block leading-none">
                FITS <span className="text-fits-accent">KENYA</span>
              </span>
              <span className="text-[10px] text-slate-500 tracking-widest font-semibold uppercase block">
                Nairobi Fashion Plug
              </span>
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-6">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => onNavigate(link.id)}
                className={`text-xs font-extrabold uppercase tracking-wider transition-all relative py-1 ${
                  link.isSpecial 
                    ? 'text-fits-accent hover:text-slate-900 font-black'
                    : currentPage === link.id
                      ? 'text-fits-accent border-b-2 border-fits-accent'
                      : 'text-slate-700 hover:text-fits-accent'
                }`}
              >
                {link.label}
                {link.isSpecial && (
                  <span className="absolute -top-2 -right-3 flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-fits-accent opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-fits-accent"></span>
                  </span>
                )}
              </button>
            ))}
          </nav>

          {/* Right Actions (Search, Account, Wishlist, Cart) */}
          <div className="flex items-center gap-3">
            
            {/* Search Bar Input (Desktop) */}
            <div className="hidden sm:relative sm:block w-40 lg:w-48">
              <input
                type="text"
                placeholder="Search sneakers..."
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  if (currentPage !== 'shop') onNavigate('shop');
                }}
                className="w-full bg-slate-100 border border-slate-200 rounded-full py-2 pl-9 pr-4 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-fits-accent transition-colors"
              />
              <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-2.5" />
              {searchQuery && (
                <button 
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-2.5 text-slate-400 hover:text-slate-700"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            {/* Mobile Search Button */}
            <button
              onClick={() => setShowSearchModal(true)}
              className="sm:hidden p-2.5 text-slate-700 hover:text-fits-accent bg-slate-100 rounded-full border border-slate-200"
              aria-label="Search"
            >
              <Search className="w-4 h-4" />
            </button>

            {/* Account / Sign In Button */}
            <div className="relative">
              {currentUser ? (
                <div>
                  <button
                    onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                    className="flex items-center gap-1.5 bg-slate-100 border border-slate-200 px-3 py-1.5 rounded-full text-xs font-bold text-slate-900 hover:border-fits-accent transition-all"
                  >
                    <div className="w-6 h-6 rounded-full bg-fits-accent text-white flex items-center justify-center text-[11px] font-extrabold">
                      {currentUser.first_name ? currentUser.first_name.charAt(0).toUpperCase() : 'U'}
                    </div>
                    <span className="hidden sm:inline font-extrabold">{currentUser.first_name || currentUser.username}</span>
                    <ChevronDown className="w-3.5 h-3.5 text-slate-500" />
                  </button>

                  {/* Dropdown Menu */}
                  {userDropdownOpen && (
                    <div className="absolute right-0 mt-2 w-48 bg-white border border-slate-200 rounded-2xl shadow-xl py-2 z-50">
                      <div className="px-4 py-2 border-b border-slate-100">
                        <span className="text-[10px] text-slate-400 uppercase font-extrabold block">Signed in as</span>
                        <span className="text-xs font-bold text-slate-900 truncate block">@{currentUser.username}</span>
                      </div>
                      <button
                        onClick={() => {
                          setUserDropdownOpen(false);
                          onNavigate('wishlist');
                        }}
                        className="w-full text-left px-4 py-2 text-xs font-bold text-slate-700 hover:bg-slate-50 hover:text-fits-accent flex items-center gap-2"
                      >
                        <Heart className="w-3.5 h-3.5" /> Saved Wishlist
                      </button>
                      <button
                        onClick={() => {
                          setUserDropdownOpen(false);
                          onLogout();
                        }}
                        className="w-full text-left px-4 py-2 text-xs font-bold text-rose-600 hover:bg-rose-50 flex items-center gap-2"
                      >
                        <LogOut className="w-3.5 h-3.5" /> Log Out
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <button
                  onClick={onOpenAuth}
                  className="flex items-center gap-1.5 bg-slate-100 border border-slate-200 px-3 py-2 rounded-full text-xs font-extrabold text-slate-800 hover:text-fits-accent hover:border-fits-accent transition-colors"
                >
                  <User className="w-4 h-4" />
                  <span className="hidden sm:inline">Sign In</span>
                </button>
              )}
            </div>

            {/* Wishlist Button */}
            <button
              onClick={() => onNavigate('wishlist')}
              className={`relative p-2.5 rounded-full border transition-colors ${
                currentPage === 'wishlist' 
                  ? 'bg-fits-accent/10 text-fits-accent border-fits-accent' 
                  : 'bg-slate-100 text-slate-700 hover:text-fits-accent border-slate-200'
              }`}
              title="View Wishlist Page"
            >
              <Heart className="w-4 h-4" />
              {wishlistCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-fits-accent text-white font-extrabold text-[10px] w-4 h-4 rounded-full flex items-center justify-center shadow">
                  {wishlistCount}
                </span>
              )}
            </button>

            {/* Cart Button */}
            <button
              onClick={onOpenCart}
              className="relative flex items-center gap-2 bg-fits-accent text-white font-extrabold text-xs px-4 py-2.5 rounded-full hover:bg-fits-accentHover transition-all shadow-md"
            >
              <ShoppingBag className="w-4 h-4" />
              <span className="hidden sm:inline">Cart</span>
              <span className="bg-slate-900 text-fits-accent text-[11px] font-extrabold px-2 py-0.5 rounded-full min-w-[20px] text-center">
                {cartCount}
              </span>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-b border-slate-200 px-4 pt-2 pb-6 space-y-3 shadow-lg">
          <div className="mb-4">
            <input
              type="text"
              placeholder="Search sneakers, clothes..."
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                if (currentPage !== 'shop') onNavigate('shop');
              }}
              className="w-full bg-slate-100 border border-slate-200 rounded-lg py-2 px-3 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-fits-accent"
            />
          </div>
          {navLinks.map((link) => (
            <button
              key={link.id}
              onClick={() => {
                onNavigate(link.id);
                setMobileMenuOpen(false);
              }}
              className={`block w-full text-left font-extrabold text-base py-2.5 border-b border-slate-100 ${
                currentPage === link.id ? 'text-fits-accent' : 'text-slate-800'
              }`}
            >
              {link.label}
            </button>
          ))}
          {currentUser ? (
            <button
              onClick={() => {
                onLogout();
                setMobileMenuOpen(false);
              }}
              className="block w-full text-left font-extrabold text-base py-2.5 text-rose-600"
            >
              Log Out (@{currentUser.username})
            </button>
          ) : (
            <button
              onClick={() => {
                onOpenAuth();
                setMobileMenuOpen(false);
              }}
              className="block w-full text-left font-extrabold text-base py-2.5 text-fits-accent"
            >
              👤 Sign In / Create Account
            </button>
          )}
        </div>
      )}

      {/* Mobile Search Modal */}
      {showSearchModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/80 backdrop-blur-sm p-4 flex flex-col pt-16">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-bold text-white">Search Fits Kenya</h3>
            <button onClick={() => setShowSearchModal(false)} className="p-2 text-slate-300 hover:text-white">
              <X className="w-6 h-6" />
            </button>
          </div>
          <div className="relative">
            <input
              type="text"
              autoFocus
              placeholder="Search Jordan 4, Oversized Tee, Cargos..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-white border border-fits-accent rounded-xl py-3 pl-10 pr-4 text-slate-900 placeholder-slate-400 focus:outline-none text-base"
            />
            <Search className="w-5 h-5 text-fits-accent absolute left-3 top-3.5" />
          </div>
          <button
            onClick={() => {
              setShowSearchModal(false);
              onNavigate('shop');
            }}
            className="mt-4 w-full bg-fits-accent text-white font-bold py-3 rounded-xl uppercase tracking-wider"
          >
            View Search Results
          </button>
        </div>
      )}
    </header>
  );
}
