import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-scroll';
import { content as staticContent } from '../data/content';
import { usePortfolioData } from '../hooks/usePortfolioData';

const RotatingText = ({ items }) => {
    const [index, setIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setIndex((prev) => (prev + 1) % items.length);
        }, 3000);
        return () => clearInterval(interval);
    }, [items]);

    return (
        <span className="relative inline-flex overflow-hidden h-[1.2em] w-[10em] align-bottom">
            <AnimatePresence mode="popLayout">
                <motion.span
                    key={index}
                    initial={{ y: 50, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: -50, opacity: 0 }}
                    transition={{ duration: 0.5, ease: "easeOut" }}
                    className="absolute inset-0 text-gradient text-left leading-tight"
                >
                    {items[index]}
                </motion.span>
            </AnimatePresence>
        </span>
    );
};

const Hero = () => {
    const { content } = usePortfolioData();
    return (
        <div name='hero' className='w-full min-h-screen bg-primary flex items-center justify-center relative overflow-hidden pt-20 md:pt-0'>

            {/* Premium Animated Background Layer */}
            <div className="absolute inset-0 z-0 pointer-events-none">
                <div className="absolute top-1/4 left-1/4 w-[30rem] h-[30rem] bg-accent-purple/20 rounded-full mix-blend-screen filter blur-[100px] animate-blob" />
                <div className="absolute top-1/3 right-1/4 w-[30rem] h-[30rem] bg-accent-cyan/20 rounded-full mix-blend-screen filter blur-[100px] animate-blob" style={{ animationDelay: '2s' }} />
                <div className="absolute -bottom-32 left-1/3 w-[30rem] h-[30rem] bg-accent-blue/20 rounded-full mix-blend-screen filter blur-[100px] animate-blob" style={{ animationDelay: '4s' }} />

                {/* Subtle Grid and Noise Overlay */}
                <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10 mix-blend-soft-light"></div>
                <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_60%_at_50%_50%,#000_70%,transparent_100%)]"></div>
            </div>

            <div className='max-w-[1200px] w-full px-8 flex flex-col justify-center h-full z-10'>

                {/* Available for work badge */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="mb-8 inline-flex items-center space-x-2 subheading-badge self-start"
                >
                    <span className="relative flex h-2.5 w-2.5">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent-green opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-accent-green"></span>
                    </span>
                    <span className="tracking-wide">Available for new opportunities</span>
                </motion.div>

                <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                    className='text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold text-white tracking-tight leading-[1.1]'
                >
                    <span className="block text-gray-400 font-medium text-3xl sm:text-4xl md:text-5xl mb-4">Hello, I'm</span>
                    {content.hero.title.replace("Hi, I'm ", "")}
                </motion.h1>

                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className='text-3xl sm:text-4xl md:text-5xl lg:text-5xl font-bold text-gray-300 mt-6 flex flex-wrap items-center gap-x-3'
                >
                    <span>I specialize in</span> <RotatingText items={content.hero?.typingText || staticContent.hero.typingText} />
                </motion.h2>

                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                    className='text-gray-400 font-light py-8 max-w-[700px] text-lg sm:text-xl leading-relaxed'
                >
                    {content.hero.subtitle}
                </motion.p>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                    className='flex flex-col sm:flex-row gap-5 mt-2'
                >
                    <Link to="projects" smooth={true} duration={500}>
                        <button className='group relative px-8 py-4 bg-white text-primary rounded-full font-bold text-lg flex items-center justify-center overflow-hidden transition-all hover:scale-105 active:scale-95 w-full sm:w-auto shadow-[0_0_40px_#ffffff33] hover:shadow-[0_0_60px_#ffffff66]'>
                            <span className="relative z-10 flex items-center">
                                {content.hero.cta}
                                <span className="ml-2 group-hover:translate-x-1 transition-transform duration-300">→</span>
                            </span>
                        </button>
                    </Link>
                    <a href={content.settings?.resume_url || (content.resume ? content.resume.link : '#')} target="_blank" rel="noopener noreferrer" className="w-full sm:w-auto">
                        <button className='group w-full sm:w-auto px-8 py-4 bg-white/5 border border-white/10 hover:bg-white/10 text-white rounded-full font-bold text-lg flex items-center justify-center transition-all hover:scale-105 active:scale-95 backdrop-blur-md'>
                            View Resume
                        </button>
                    </a>
                </motion.div>

            </div>
        </div>
    );
};

export default Hero;
