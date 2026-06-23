import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import LogoForContactUs from '../assets/LogoForContactUs.png';
import { useAuth } from '../context/AuthContext';

const AuthPage = () => {
    const navigate = useNavigate();
    const { login, signup, isAuthenticated } = useAuth();

    // Toggle state management ('signup' or 'login')
    const [viewMode, setViewMode] = useState('signup');
    const [error, setError] = useState('');

    // Input fields hook structure
    const [authForm, setAuthForm] = useState({
        name: '',
        identifier: '',
        password: ''
    });

    // If already authenticated, redirect to profile
    React.useEffect(() => {
        if (isAuthenticated) {
            navigate('/my-profile');
        }
    }, [isAuthenticated, navigate]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setAuthForm(prev => ({ ...prev, [name]: value }));
        setError('');
    };

    const handleFormSubmit = (e) => {
        e.preventDefault();
        
        try {
            if (viewMode === 'signup') {
                const success = signup(authForm.name, authForm.identifier, authForm.password);
                if (success) {
                    alert(`Welcome to MOJILO! Account created for ${authForm.name || authForm.identifier}`);
                    navigate('/my-profile');
                }
            } else {
                const success = login(authForm.identifier, authForm.password);
                if (success) {
                    alert(`Welcome back! Authenticated as ${authForm.identifier}`);
                    navigate('/my-profile');
                } else {
                    setError('Invalid email or password');
                }
            }
        } catch (err) {
            setError('An error occurred. Please try again.');
        }
    };

    return (
        <div className="min-h-screen bg-[#fbfbfa] font-sans text-slate-800 flex items-center justify-center p-4 sm:p-6 md:p-12 antialiased">

            {/* --- Main Structural Interface Card --- */}
            <div className="w-full max-w-5xl bg-white rounded-[2rem] border border-slate-100 shadow-[0_24px_70px_rgba(0,0,0,0.03)] grid grid-cols-1 lg:grid-cols-12 overflow-hidden items-stretch min-h-[640px]">

                {/* --- Left Column: Luxury Brand Identity Banner Panel --- */}
                <div className="lg:col-span-5 bg-[#0d0d0d] text-white p-8 md:p-12 flex flex-col justify-between relative overflow-hidden border-b lg:border-b-0 lg:border-r border-slate-900">

                    {/* Subtle branding geometric background texture */}
                    <div className="absolute top-0 right-0 w-64 h-64 bg-[#a47a4c]/5 rounded-full blur-3xl pointer-events-none" />
                    <div className="absolute -bottom-10 -left-10 w-48 h-48 bg-white/[0.02] rounded-full pointer-events-none" />

                    {/* Core Header Brand Logo Layout */}
                    <div className="z-10 my-auto text-center lg:text-left space-y-3">
                        <div className="mb-6">
                            <img src={LogoForContactUs} alt="Mojilo Mart Logo" className="w-60 h-auto" />
                        </div>
                        <div className="h-[2px] w-16 bg-[#a47a4c] my-4 mx-auto lg:mx-0" />
                        <p className="text-[#a47a4c] tracking-[0.45em] text-xs font-bold uppercase whitespace-nowrap">
                            Style to Trend
                        </p>
                    </div>

                    {/* Premium Footer Accent */}
                    <div className="hidden lg:block z-10 pt-8 border-t border-white/10">
                        <p className="text-xs text-slate-500 font-medium tracking-wide leading-relaxed">
                            Join our exclusive collective to discover curated contemporary apparel tailored to your lifestyle trends.
                        </p>
                    </div>
                </div>

                {/* --- Right Column: Interactive Form Control System --- */}
                <div className="lg:col-span-7 flex flex-col justify-center p-8 md:p-12 lg:p-16 xl:p-20 bg-white">
                    <div className="w-full max-w-md mx-auto space-y-8">

                        {/* Dynamic View Header Interface */}
                        <div className="space-y-2.5">
                            <h2 className="text-3xl font-bold tracking-tight text-slate-900 transition-all duration-300">
                                {viewMode === 'signup' ? 'Create an account' : 'Log in to Exclusive'}
                            </h2>
                            <p className="text-sm font-medium text-slate-400">
                                Enter your authentic details below to proceed
                            </p>
                        </div>

                        {/* Authentication Submission Form Frame */}
                        <form onSubmit={handleFormSubmit} className="space-y-5">
                            {error && (
                                <div className="bg-rose-50 border border-rose-200 text-rose-700 px-4 py-3 rounded-xl text-sm font-medium">
                                    {error}
                                </div>
                            )}

                            {viewMode === 'signup' && (
                                <div className="space-y-1.5">
                                    <label className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Full Name</label>
                                    <input
                                        type="text"
                                        name="name"
                                        required
                                        placeholder="John Doe"
                                        value={authForm.name}
                                        onChange={handleInputChange}
                                        className="w-full bg-slate-50/50 border border-slate-200/80 focus:bg-white rounded-xl px-4 py-3.5 text-sm font-medium text-slate-800 placeholder-slate-300 focus:outline-none focus:border-[#a47a4c] focus:ring-4 focus:ring-[#a47a4c]/5 transition-all duration-200"
                                    />
                                </div>
                            )}

                            <div className="space-y-1.5">
                                <label className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Email or Phone Number</label>
                                <input
                                    type="text"
                                    name="identifier"
                                    required
                                    placeholder="name@example.com"
                                    value={authForm.identifier}
                                    onChange={handleInputChange}
                                    className="w-full bg-slate-50/50 border border-slate-200/80 focus:bg-white rounded-xl px-4 py-3.5 text-sm font-medium text-slate-800 placeholder-slate-300 focus:outline-none focus:border-[#a47a4c] focus:ring-4 focus:ring-[#a47a4c]/5 transition-all duration-200"
                                />
                            </div>

                            <div className="space-y-1.5">
                                <div className="flex items-center justify-between">
                                    <label className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Password</label>
                                    {viewMode === 'login' && (
                                        <button
                                            type="button"
                                            onClick={() => alert('Redirecting to password recovery flow...')}
                                            className="text-xs font-bold text-[#a47a4c] hover:text-[#8e673e] transition-colors"
                                        >
                                            Forgot?
                                        </button>
                                    )}
                                </div>
                                <input
                                    type="password"
                                    name="password"
                                    required
                                    placeholder="••••••••"
                                    value={authForm.password}
                                    onChange={handleInputChange}
                                    className="w-full bg-slate-50/50 border border-slate-200/80 focus:bg-white rounded-xl px-4 py-3.5 text-sm font-medium text-slate-800 placeholder-slate-300 focus:outline-none focus:border-[#a47a4c] focus:ring-4 focus:ring-[#a47a4c]/5 transition-all duration-200"
                                />
                            </div>

                            {/* Action Buttons Cluster Layer */}
                            <div className="pt-4 space-y-4">
                                <button
                                    type="submit"
                                    className="w-full bg-[#a47a4c] hover:bg-[#8e673e] text-white font-bold text-sm py-4 rounded-xl transition-all duration-300 shadow-md hover:shadow-lg hover:shadow-[#a47a4c]/10 active:scale-[0.99] tracking-wider uppercase"
                                >
                                    {viewMode === 'signup' ? 'Register Account' : 'Sign In'}
                                </button>

                                {viewMode === 'signup' && (
                                    <button
                                        type="button"
                                        onClick={() => alert('Connecting to Google API services...')}
                                        className="w-full bg-white border border-slate-200 hover:bg-slate-50 text-slate-600 font-bold text-sm py-3.5 rounded-xl transition-all duration-200 flex items-center justify-center gap-3 active:scale-[0.99]"
                                    >
                                        <svg className="w-4 h-4 flex-shrink-0" viewBox="0 0 24 24">
                                            <path fill="#EA4335" d="M12.24 10.285V14.4h6.887c-.648 2.41-2.519 4.114-5.136 4.114A5.772 5.772 0 0 1 8.2 12.74a5.772 5.772 0 0 1 5.79-5.773c1.498 0 2.86.516 3.944 1.516l3.051-3.051C19.102 3.655 16.71 2.7 13.99 2.7 8.528 2.7 4.1 7.128 4.1 12.59c0 5.461 4.428 9.89 9.89 9.89 6.014 0 9.855-4.226 9.855-10.034 0-.629-.055-1.22-.165-1.78l-11.44-.38z" />
                                        </svg>
                                        <span className="text-xs uppercase tracking-wider">Sign up with Google</span>
                                    </button>
                                )}
                            </div>
                        </form>

                        {/* Account Mode Toggle Footer Switch */}
                        <div className="pt-4 border-t border-slate-100 text-center text-sm font-medium text-slate-400">
                            {viewMode === 'signup' ? (
                                <>
                                    Already have an active account?{' '}
                                    <button
                                        type="button"
                                        onClick={() => setViewMode('login')}
                                        className="text-slate-800 hover:text-[#a47a4c] font-bold underline underline-offset-4 ml-1 transition-colors"
                                    >
                                        Log In
                                    </button>
                                </>
                            ) : (
                                <>
                                    New to our digital storefront?{' '}
                                    <button
                                        type="button"
                                        onClick={() => setViewMode('signup')}
                                        className="text-slate-800 hover:text-[#a47a4c] font-bold underline underline-offset-4 ml-1 transition-colors"
                                    >
                                        Create Account
                                    </button>
                                </>
                            )}
                        </div>

                    </div>
                </div>

            </div>
        </div>
    );
};

export default AuthPage;