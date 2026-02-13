import React, { useState, useEffect } from 'react';
import { Link } from 'react-scroll';
import { FaBars, FaTimes } from 'react-icons/fa';
import { content } from '../data/content';
import { motion } from 'framer-motion';

const Navbar = () => {
    const [nav, setNav] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 50) {
                setScrolled(true);
            } else {
                setScrolled(false);
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const handleClick = () => setNav(!nav);

    return (
        <div className='fixed w-full flex justify-center z-50 transition-all duration-300 pointer-events-none mt-4 px-4'>
            {/* Floating PILL Container for Desktop/Tablet */}
            <motion.div
                initial={{ y: -100, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                className={`pointer-events-auto h-[60px] md:h-[70px] w-full md:w-[90%] max-w-[1200px] flex justify-between items-center px-4 sm:px-6 rounded-2xl transition-all duration-500
            ${scrolled ? 'glass shadow-2xl bg-primary/40 backdrop-blur-xl border border-white/10' : 'bg-transparent'}`}
            >

                {/* Logo */}
                <div className='z-50'>
                    <h1 className='text-2xl md:text-3xl font-bold font-mono text-transparent bg-clip-text bg-gradient-to-r from-accent-cyan to-accent-purple cursor-pointer'>
                        &lt;{content.nav.logo} /&gt;
                    </h1>
                </div>

                {/* Desktop Menu */}
                <ul className='hidden md:flex space-x-8 items-center'>
                    {content.nav.links.map((item, index) => (
                        <li key={index} className='relative group overflow-hidden'>
                            <Link
                                to={item.to}
                                smooth={true}
                                duration={500}
                                offset={-80}
                                className='cursor-pointer text-gray-300 font-medium hover:text-white transition-colors duration-300 text-sm tracking-wide'
                            >
                                <span className="text-accent-cyan mr-1 font-mono text-xs">0{index + 1}.</span>
                                {item.text}
                            </Link>
                            <div className="absolute bottom-0 left-0 w-full h-[2px] bg-accent-purple transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
                        </li>
                    ))}
                    <a href={content.resume.link} target="_blank" rel="noopener noreferrer">
                        <button className='px-5 py-2 rounded-lg border border-accent-green text-accent-green hover:bg-accent-green/10 transition-all text-sm font-mono mr-4'>
                            Resume
                        </button>
                    </a>
                    <Link to="contact" smooth={true} duration={500}>
                        <button className='px-5 py-2 rounded-lg border border-accent-cyan text-accent-cyan hover:bg-accent-cyan/10 transition-all text-sm font-mono'>
                            Hire Me
                        </button>
                    </Link>
                </ul>

                {/* Hamburger */}
                <div onClick={handleClick} className='md:hidden z-50 text-gray-300 text-2xl cursor-pointer hover:text-accent-cyan transition-colors'>
                    {!nav ? <FaBars /> : <FaTimes />}
                </div>
            </motion.div>


            {/* Mobile Menu Overlay */}
            <div className={!nav ? 'hidden' : 'pointer-events-auto fixed top-0 left-0 w-full h-screen bg-primary/95 backdrop-blur-xl flex flex-col justify-center items-center z-40'}>
                {/* Close Button */}
                <div
                    onClick={handleClick}
                    className='absolute top-8 right-8 text-gray-300 text-3xl cursor-pointer hover:text-accent-cyan transition-colors z-50'
                >
                    <FaTimes />
                </div>

                <ul className='space-y-8 text-center'>
                    {content.nav.links.map((item, index) => (
                        <li key={index} className='text-3xl overflow-hidden'>
                            <Link
                                onClick={handleClick}
                                to={item.to}
                                smooth={true}
                                duration={500}
                                offset={-80}
                                className='cursor-pointer text-gray-300 hover:text-accent-cyan font-bold transition-all duration-300 block'
                            >
                                <span className="text-accent-purple text-lg block font-mono mb-2">0{index + 1}.</span>
                                {item.text}
                            </Link>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default Navbar;
