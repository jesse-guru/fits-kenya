import React, { useState } from 'react';
import { X, User, Lock, Mail, Phone, ArrowRight, CheckCircle2, ShieldCheck } from 'lucide-react';
import { loginUser, registerUser } from '../services/api';

export default function AuthModal({ isOpen, onClose, onAuthSuccess }) {
  if (!isOpen) return null;

  const [activeTab, setActiveTab] = useState('login'); // 'login' | 'register'
  
  // Login State
  const [loginUsername, setLoginUsername] = useState('');
  const [loginPassword, setLoginPassword] = useState('');

  // Register State
  const [fullName, setFullName] = useState('');
  const [regPhone, setRegPhone] = useState('07');
  const [regUsername, setRegUsername] = useState('');
  const [regEmail, setRegEmail] = useState('');
  const [regPassword, setRegPassword] = useState('');

  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg('');
    setSuccessMsg('');
    setIsLoading(true);

    const res = await loginUser(loginUsername, loginPassword);
    setIsLoading(false);

    if (res.error) {
      setErrorMsg(res.error);
    } else {
      setSuccessMsg('Signed in successfully!');
      setTimeout(() => {
        onAuthSuccess(res.user);
        onClose();
      }, 1000);
    }
  };

  const handleRegisterSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg('');
    setSuccessMsg('');
    setIsLoading(true);

    const payload = {
      username: regUsername || regEmail.split('@')[0],
      email: regEmail,
      first_name: fullName,
      phone: regPhone,
      password: regPassword
    };

    const res = await registerUser(payload);
    setIsLoading(false);

    if (res.error) {
      setErrorMsg(res.error);
    } else {
      setSuccessMsg('Account created! Logging you in...');
      setTimeout(() => {
        onAuthSuccess(res.user);
        onClose();
      }, 1200);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-md flex items-center justify-center p-4">
      <div className="relative bg-white border border-slate-200 rounded-3xl max-w-md w-full overflow-hidden shadow-2xl my-6">
        
        {/* Header & Tabs */}
        <div className="p-6 bg-slate-50 border-b border-slate-200">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <div className="w-9 h-9 rounded-xl bg-fits-accent/15 border border-fits-accent/30 flex items-center justify-center text-fits-accent font-bold">
                <User className="w-5 h-5" />
              </div>
              <h2 className="text-lg font-display font-extrabold text-slate-900 uppercase">
                Fits Kenya Account
              </h2>
            </div>
            <button onClick={onClose} className="p-2 text-slate-400 hover:text-slate-900 rounded-lg">
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Tab Buttons */}
          <div className="flex bg-slate-200/70 p-1 rounded-xl">
            <button
              type="button"
              onClick={() => {
                setActiveTab('login');
                setErrorMsg('');
              }}
              className={`flex-1 py-2 rounded-lg text-xs font-extrabold uppercase tracking-wider transition-all ${
                activeTab === 'login'
                  ? 'bg-white text-slate-900 shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Sign In
            </button>
            <button
              type="button"
              onClick={() => {
                setActiveTab('register');
                setErrorMsg('');
              }}
              className={`flex-1 py-2 rounded-lg text-xs font-extrabold uppercase tracking-wider transition-all ${
                activeTab === 'register'
                  ? 'bg-white text-slate-900 shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Create Account
            </button>
          </div>
        </div>

        {/* Content Body */}
        <div className="p-6 bg-white">
          
          {errorMsg && (
            <div className="mb-4 bg-rose-50 border border-rose-200 text-rose-700 text-xs p-3 rounded-xl font-bold text-center">
              {errorMsg}
            </div>
          )}

          {successMsg && (
            <div className="mb-4 bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs p-3 rounded-xl font-bold flex items-center justify-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>{successMsg}</span>
            </div>
          )}

          {/* SIGN IN FORM */}
          {activeTab === 'login' && (
            <form onSubmit={handleLoginSubmit} className="space-y-4">
              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">Username or Email</label>
                <div className="relative">
                  <input
                    type="text"
                    required
                    placeholder="e.g. brian_otieno"
                    value={loginUsername}
                    onChange={(e) => setLoginUsername(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 text-xs text-slate-900 rounded-xl py-3 pl-10 pr-4 focus:outline-none focus:border-fits-accent font-medium"
                  />
                  <User className="w-4 h-4 text-slate-400 absolute left-3 top-3.5" />
                </div>
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">Password</label>
                <div className="relative">
                  <input
                    type="password"
                    required
                    placeholder="••••••••"
                    value={loginPassword}
                    onChange={(e) => setLoginPassword(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 text-xs text-slate-900 rounded-xl py-3 pl-10 pr-4 focus:outline-none focus:border-fits-accent font-medium"
                  />
                  <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-3.5" />
                </div>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-fits-accent text-white font-extrabold text-xs uppercase py-4 rounded-xl hover:bg-fits-accentHover transition-all shadow-md flex items-center justify-center gap-2 mt-2"
              >
                <span>{isLoading ? 'Signing In...' : 'Sign In to Account'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <div className="text-center pt-2">
                <span className="text-[11px] text-slate-500">
                  Don't have an account yet?{' '}
                  <button
                    type="button"
                    onClick={() => setActiveTab('register')}
                    className="text-fits-accent font-bold hover:underline"
                  >
                    Create one now
                  </button>
                </span>
              </div>
            </form>
          )}

          {/* CREATE ACCOUNT (SIGN UP) FORM */}
          {activeTab === 'register' && (
            <form onSubmit={handleRegisterSubmit} className="space-y-3.5">
              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">Full Name</label>
                <div className="relative">
                  <input
                    type="text"
                    required
                    placeholder="e.g. Brian Otieno"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 text-xs text-slate-900 rounded-xl py-2.5 pl-10 pr-4 focus:outline-none focus:border-fits-accent font-medium"
                  />
                  <User className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                </div>
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">Phone Number (M-Pesa)</label>
                <div className="relative">
                  <input
                    type="tel"
                    required
                    placeholder="0742265504"
                    value={regPhone}
                    onChange={(e) => setRegPhone(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 text-xs text-slate-900 font-mono rounded-xl py-2.5 pl-10 pr-4 focus:outline-none focus:border-fits-accent"
                  />
                  <Phone className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                </div>
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">Username</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. brian_otieno"
                  value={regUsername}
                  onChange={(e) => setRegUsername(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 text-xs text-slate-900 rounded-xl py-2.5 px-3 focus:outline-none focus:border-fits-accent font-medium"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">Email Address</label>
                <div className="relative">
                  <input
                    type="email"
                    required
                    placeholder="brian@example.com"
                    value={regEmail}
                    onChange={(e) => setRegEmail(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 text-xs text-slate-900 rounded-xl py-2.5 pl-10 pr-4 focus:outline-none focus:border-fits-accent font-medium"
                  />
                  <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                </div>
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">Password</label>
                <div className="relative">
                  <input
                    type="password"
                    required
                    placeholder="••••••••"
                    value={regPassword}
                    onChange={(e) => setRegPassword(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 text-xs text-slate-900 rounded-xl py-2.5 pl-10 pr-4 focus:outline-none focus:border-fits-accent font-medium"
                  />
                  <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                </div>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-fits-accent text-white font-extrabold text-xs uppercase py-3.5 rounded-xl hover:bg-fits-accentHover transition-all shadow-md flex items-center justify-center gap-2 mt-2"
              >
                <span>{isLoading ? 'Creating Account...' : 'Create Fits Account'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>
          )}

          <div className="mt-4 pt-4 border-t border-slate-100 text-center flex items-center justify-center gap-1.5 text-[11px] text-slate-500 font-medium">
            <ShieldCheck className="w-3.5 h-3.5 text-fits-accent" />
            <span>Secure Safaricom & M-Pesa Order Account</span>
          </div>

        </div>

      </div>
    </div>
  );
}
