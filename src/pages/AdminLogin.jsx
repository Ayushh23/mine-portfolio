import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaLock, FaUser, FaArrowLeft, FaShieldAlt } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const AdminLogin = () => {
    const [credentials, setCredentials] = useState({ username: '', password: '' });
    const [error, setError] = useState('');

    const handleChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080';
            const res = await fetch(`${API_BASE_URL}/api/auth/login`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(credentials)
            });

            if (res.ok) {
                const data = await res.json();
                localStorage.setItem('adminToken', data.token);
                window.location.href = '/admin/dashboard';
            } else {
                setError('Invalid username or password');
            }
        } catch (err) {
            setError('Failed to connect to server');
        }
    };

    return (
        <div className="w-full min-h-screen bg-[#030014] flex justify-center items-center px-4 relative overflow-hidden font-sans">
            {/* Dynamic Background Elements */}
            <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-accent-blue/20 rounded-full mix-blend-screen filter blur-[120px] animate-pulse"></div>
            <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-accent-purple/20 rounded-full mix-blend-screen filter blur-[120px] animate-pulse"></div>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-[0.03] pointer-events-none"></div>

            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="max-w-md w-full z-10"
            >
                {/* Brand / Title Area */}
                <div className="flex flex-col items-center mb-10">
                    <motion.div 
                        initial={{ y: -20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.2 }}
                        className="w-16 h-16 rounded-2xl bg-gradient-to-br from-accent-cyan to-accent-blue p-[1px] mb-4 shadow-[0_0_30px_rgba(6,180,248,0.3)]"
                    >
                        <div className="w-full h-full bg-primary rounded-[15px] flex items-center justify-center">
                            <FaShieldAlt className="text-2xl text-accent-cyan" />
                        </div>
                    </motion.div>
                    <motion.h2 
                        initial={{ y: -10, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.3 }}
                        className="text-4xl font-bold text-white tracking-tighter"
                    >
                        Admin<span className="text-accent-cyan">Portal</span>
                    </motion.h2>
                    <motion.p 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.4 }}
                        className="text-gray-500 text-sm mt-2 font-mono"
                    >
                        RESTRICTED ACCESS AREA
                    </motion.p>
                </div>

                {/* Glass Login Card */}
                <div className="relative group">
                    {/* Glowing effect behind card */}
                    <div className="absolute -inset-1 bg-gradient-to-r from-accent-blue via-accent-cyan to-accent-purple rounded-3xl blur opacity-20 group-hover:opacity-30 transition duration-1000 group-hover:duration-200"></div>
                    
                    <div className="relative bg-black/40 backdrop-blur-2xl border border-white/10 p-8 md:p-10 rounded-3xl shadow-2xl">
                        <AnimatePresence mode="wait">
                            {error && (
                                <motion.div
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: 20 }}
                                    className="bg-red-500/10 border border-red-500/50 text-red-500 p-4 rounded-xl mb-6 text-sm flex items-center gap-3"
                                >
                                    <div className="w-1.5 h-1.5 rounded-full bg-red-500 animate-ping"></div>
                                    <span>{error}</span>
                                </motion.div>
                            )}
                        </AnimatePresence>

                        <form onSubmit={handleSubmit} className="flex flex-col space-y-6">
                            <div className="space-y-2">
                                <label className="text-[10px] uppercase tracking-[0.3em] text-gray-500 font-bold ml-1">Identity</label>
                                <div className="relative group/input">
                                    <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within/input:text-accent-cyan transition-colors">
                                        <FaUser className="text-sm" />
                                    </div>
                                    <input
                                        type="text"
                                        name="username"
                                        placeholder="Username"
                                        value={credentials.username}
                                        onChange={handleChange}
                                        className="w-full bg-white/5 border border-white/10 rounded-xl py-4 pl-12 pr-4 text-white focus:border-accent-cyan/50 focus:bg-white/10 outline-none transition-all duration-300 placeholder:text-gray-700"
                                        required
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-[10px] uppercase tracking-[0.3em] text-gray-500 font-bold ml-1">Passcode</label>
                                <div className="relative group/input">
                                    <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within/input:text-accent-purple transition-colors">
                                        <FaLock className="text-sm" />
                                    </div>
                                    <input
                                        type="password"
                                        name="password"
                                        placeholder="••••••••"
                                        value={credentials.password}
                                        onChange={handleChange}
                                        className="w-full bg-white/5 border border-white/10 rounded-xl py-4 pl-12 pr-4 text-white focus:border-accent-purple/50 focus:bg-white/10 outline-none transition-all duration-300 placeholder:text-gray-700"
                                        required
                                    />
                                </div>
                            </div>

                            <button
                                type="submit"
                                className="relative w-full group overflow-hidden rounded-xl p-[1.5px] font-bold text-white transition-all duration-300 hover:scale-[1.02] active:scale-95 shadow-[0_20px_40px_-15px_rgba(6,180,248,0.2)]"
                            >
                                <div className="absolute inset-0 bg-gradient-to-r from-accent-cyan via-accent-blue to-accent-purple animate-shimmer group-hover:opacity-100 opacity-80 transition-opacity"></div>
                                <div className="relative bg-[#030014] rounded-[11px] py-4 flex items-center justify-center gap-2 group-hover:bg-transparent transition-colors duration-300">
                                    <span>Initialize Connection</span>
                                </div>
                            </button>
                        </form>
                    </div>
                </div>

                <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                    className="mt-8 flex justify-center"
                >
                    <Link 
                        to="/" 
                        className="flex items-center gap-2 text-gray-500 hover:text-white transition-colors text-sm font-medium group"
                    >
                        <FaArrowLeft className="text-xs group-hover:-translate-x-1 transition-transform" />
                        Return to Portfolio
                    </Link>
                </motion.div>
            </motion.div>
        </div>
    );
};

export default AdminLogin;
