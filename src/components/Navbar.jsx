import React, { useState, useEffect } from 'react';
import { Link } from 'react-scroll';
import { Link as RouterLink } from 'react-router-dom';
import { FaLock } from 'react-icons/fa';
import { usePortfolioData } from '../hooks/usePortfolioData';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar = () => {
    const { content } = usePortfolioData();
    const [nav, setNav] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Lock body scroll when menu is open
    useEffect(() => {
        document.body.style.overflow = nav ? 'hidden' : '';
        return () => { document.body.style.overflow = ''; };
    }, [nav]);

    const handleClick = () => setNav(!nav);
    const closeNav = () => setNav(false);

    return (
        <>
            {/* ── Floating Pill Navbar ── */}
            <div className='fixed w-full flex justify-center z-[60] transition-all duration-300 pointer-events-none mt-3 px-4'>
                <motion.div
                    initial={{ y: -100, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    className={`pointer-events-auto h-[56px] md:h-[70px] w-full max-w-[1200px] flex justify-between items-center px-4 md:px-6 rounded-full transition-all duration-500
                    ${scrolled ? 'glass bg-secondary/40 backdrop-blur-xl border border-white/10 shadow-2xl' : 'bg-transparent'}`}
                >
                    {/* Logo & Admin Link */}
                    <div className='z-50 flex items-center gap-4'>
                        <h1 className='text-2xl font-bold font-sans tracking-tighter text-white cursor-pointer hover:text-accent-cyan transition-colors'>
                            {content.nav.logo}
                            <span className="text-accent-cyan">.</span>
                        </h1>
                        <RouterLink
                            to="/admin"
                            className="flex items-center gap-1.5 text-[10px] uppercase tracking-[0.2em] text-gray-500 hover:text-accent-cyan transition-all duration-300 font-bold border-l border-white/10 pl-4 leading-none h-full"
                        >
                            <FaLock className="text-[9px] mb-[1px]" />
                            <span>Admin</span>
                        </RouterLink>
                    </div>

                    {/* Desktop Menu */}
                    <ul className='hidden md:flex space-x-8 items-center'>
                        {content.nav.links.map((item, index) => (
                            <li key={index} className='group'>
                                <Link
                                    to={item.to}
                                    smooth={true}
                                    duration={400}
                                    offset={-80}
                                    className='cursor-pointer text-gray-300 font-medium hover:text-white transition-colors duration-300 text-sm tracking-wide flex items-center gap-1.5'
                                >
                                    <span className="text-accent-cyan/70 font-mono text-xs opacity-0 group-hover:opacity-100 transition-opacity -ml-4 group-hover:ml-0">0{index + 1}.</span>
                                    {item.text}
                                </Link>
                            </li>
                        ))}
                        <div className="flex items-center gap-4 ml-4 pl-4 border-l border-white/10">
                            <a href={content.settings?.resume_url || content.resume.link} target="_blank" rel="noopener noreferrer">
                                <button className='px-4 py-2 rounded-full border border-white/20 text-white hover:bg-white/10 transition-all text-sm font-medium'>
                                    Resume
                                </button>
                            </a>
                            <Link to="contact" smooth={true} duration={400}>
                                <button className='px-4 py-2 rounded-full bg-white text-primary font-bold hover:scale-105 transition-all text-sm'>
                                    Hire Me
                                </button>
                            </Link>
                        </div>
                    </ul>

                    {/* ── Animated Hamburger Button ── */}
                    <button
                        onClick={handleClick}
                        aria-label="Toggle menu"
                        className='md:hidden relative z-[70] pointer-events-auto w-10 h-10 flex flex-col justify-center items-center gap-[5px] rounded-full transition-all duration-300'
                    >
                        {/* Glow ring when open */}
                        <span className={`absolute inset-0 rounded-full transition-all duration-500
                            ${nav
                                ? 'bg-accent-cyan/10 border border-accent-cyan/30 shadow-[0_0_20px_rgba(0,255,255,0.15)]'
                                : 'bg-white/5 border border-white/10'
                            }`}
                        />
                        {/* Bar 1 */}
                        <span className={`relative block h-[2px] rounded-full transition-all duration-350 ease-in-out origin-center
                            ${nav ? 'w-5 rotate-45 translate-y-[7px] bg-accent-cyan' : 'w-5 bg-white'}`}
                        />
                        {/* Bar 2 */}
                        <span className={`relative block h-[2px] rounded-full transition-all duration-250 ease-in-out
                            ${nav ? 'w-0 opacity-0 bg-accent-cyan' : 'w-3.5 opacity-100 bg-white/70'}`}
                        />
                        {/* Bar 3 */}
                        <span className={`relative block h-[2px] rounded-full transition-all duration-350 ease-in-out origin-center
                            ${nav ? 'w-5 -rotate-45 -translate-y-[7px] bg-accent-cyan' : 'w-5 bg-white'}`}
                        />
                    </button>
                </motion.div>
            </div>

            {/* ── Mobile Menu Overlay ── */}
            <AnimatePresence>
                {nav && (
                    <>
                        {/* Backdrop */}
                        <motion.div
                            key="backdrop"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.3 }}
                            onClick={closeNav}
                            className='fixed inset-0 z-[65] bg-black/60 backdrop-blur-sm'
                        />

                        {/* Slide-in Panel */}
                        <motion.div
                            key="panel"
                            initial={{ x: '100%' }}
                            animate={{ x: 0 }}
                            exit={{ x: '100%' }}
                            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                            className='fixed top-0 right-0 h-full w-[75vw] max-w-[320px] z-[70] flex flex-col overflow-hidden'
                            style={{
                                background: 'linear-gradient(135deg, #0d0d0d 0%, #111827 50%, #0d0d0d 100%)',
                                borderLeft: '1px solid rgba(0,255,255,0.08)',
                            }}
                        >
                            {/* Top glow accent */}
                            <div className="absolute top-0 right-0 w-48 h-48 bg-accent-cyan/10 rounded-full filter blur-[60px] pointer-events-none" />
                            <div className="absolute bottom-0 left-0 w-48 h-48 bg-accent-purple/10 rounded-full filter blur-[60px] pointer-events-none" />

                            {/* Panel Header */}
                            <div className="flex items-center justify-between px-6 pt-5 pb-6 border-b border-white/5">
                                <div>
                                    <p className="text-xs text-accent-cyan/60 font-mono tracking-[0.25em] uppercase mb-0.5">Navigation</p>
                                    <h2 className="text-white font-bold text-lg tracking-tight">
                                        {content.nav.logo}<span className="text-accent-cyan">.</span>
                                    </h2>
                                </div>
                                {/* Close pill badge */}
                                <button
                                    onClick={closeNav}
                                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 hover:border-accent-cyan/30 transition-all duration-200 text-gray-400 hover:text-white text-xs font-medium"
                                >
                                    <span>Close</span>
                                </button>
                            </div>

                            {/* Nav Links */}
                            <nav className="flex-1 px-6 py-8 overflow-y-auto">
                                <ul className="space-y-1">
                                    {content.nav.links.map((item, index) => (
                                        <motion.li
                                            key={index}
                                            initial={{ x: 40, opacity: 0 }}
                                            animate={{ x: 0, opacity: 1 }}
                                            transition={{ delay: 0.05 + index * 0.07, type: 'spring', stiffness: 300, damping: 25 }}
                                        >
                                            <Link
                                                onClick={closeNav}
                                                to={item.to}
                                                smooth={true}
                                                duration={400}
                                                offset={-80}
                                                className='group flex items-center gap-4 px-4 py-3.5 rounded-xl cursor-pointer transition-all duration-200 hover:bg-white/5 border border-transparent hover:border-white/5'
                                            >
                                                <span className="text-accent-cyan font-mono text-xs w-6 shrink-0 group-hover:text-accent-cyan transition-colors">
                                                    0{index + 1}.
                                                </span>
                                                <span className="text-gray-300 group-hover:text-white font-medium text-lg tracking-wide transition-colors">
                                                    {item.text}
                                                </span>
                                                <span className="ml-auto text-gray-600 group-hover:text-accent-cyan group-hover:translate-x-1 transition-all duration-200 text-sm">
                                                    →
                                                </span>
                                            </Link>
                                        </motion.li>
                                    ))}
                                </ul>
                            </nav>

                            {/* Bottom CTAs */}
                            <motion.div
                                initial={{ y: 20, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                transition={{ delay: 0.35 }}
                                className="px-6 pb-8 pt-4 border-t border-white/5 space-y-3"
                            >
                                <a href={content.settings?.resume_url || content.resume.link} target="_blank" rel="noopener noreferrer" className="block">
                                    <button className="w-full py-3 rounded-xl border border-white/10 text-gray-300 hover:text-white hover:bg-white/5 transition-all text-sm font-medium tracking-wide">
                                        View Resume
                                    </button>
                                </a>
                                <Link to="contact" smooth={true} duration={400} onClick={closeNav}>
                                    <button className="w-full py-3 rounded-xl bg-white text-primary font-bold text-sm hover:scale-[1.02] transition-all shadow-[0_0_30px_rgba(255,255,255,0.15)]">
                                        Hire Me →
                                    </button>
                                </Link>
                            </motion.div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </>
    );
};

export default Navbar;
