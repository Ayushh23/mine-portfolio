import React, { useState, useEffect } from 'react';
import { Link } from 'react-scroll';
import { Link as RouterLink } from 'react-router-dom';
import { FaBars, FaTimes, FaLock } from 'react-icons/fa';
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

    const handleClick = () => setNav(!nav);

    return (
        <div className='fixed w-full flex justify-center z-50 transition-all duration-300 pointer-events-none mt-3 px-4'>
            {/* Floating PILL Container for Desktop/Tablet */}
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

                {/* Hamburger */}
                <div onClick={handleClick} className='md:hidden z-50 text-gray-300 text-2xl cursor-pointer hover:text-white transition-colors pointer-events-auto'>
                    {!nav ? <FaBars /> : <FaTimes className="text-white" />}
                </div>
            </motion.div>

            {/* Mobile Menu Overlay */}
            <AnimatePresence>
                {nav && (
                    <motion.div
                        initial={{ opacity: 0, backdropFilter: "blur(0px)" }}
                        animate={{ opacity: 1, backdropFilter: "blur(24px)" }}
                        exit={{ opacity: 0, backdropFilter: "blur(0px)" }}
                        className='pointer-events-auto fixed inset-0 w-full h-screen bg-primary/90 flex flex-col justify-center items-center z-40'
                    >
                        <ul className='space-y-8 text-center'>
                            {content.nav.links.map((item, index) => (
                                <motion.li
                                    key={index}
                                    initial={{ y: 20, opacity: 0 }}
                                    animate={{ y: 0, opacity: 1 }}
                                    transition={{ delay: index * 0.1 }}
                                    className='overflow-hidden'
                                >
                                    <Link
                                        onClick={handleClick}
                                        to={item.to}
                                        smooth={true}
                                        duration={400}
                                        offset={-80}
                                        className='cursor-pointer text-4xl text-gray-300 hover:text-white font-bold transition-all duration-300 block'
                                    >
                                        <span className="text-accent-cyan text-sm block font-mono mb-2 tracking-widest">0{index + 1}.</span>
                                        {item.text}
                                    </Link>
                                </motion.li>
                            ))}
                        </ul>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default Navbar;
