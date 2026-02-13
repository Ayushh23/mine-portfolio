import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-scroll';
import { content } from '../data/content';

// Hacker Text Effect Hook
const useHackerEffect = (text) => {
    const [displayText, setDisplayText] = useState('');
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890!@#$%^&*()_+";

    useEffect(() => {
        let iteration = 0;
        const interval = setInterval(() => {
            setDisplayText(text
                .split("")
                .map((letter, index) => {
                    if (index < iteration) {
                        return text[index];
                    }
                    return chars[Math.floor(Math.random() * chars.length)]
                })
                .join("")
            );

            if (iteration >= text.length) {
                clearInterval(interval);
            }

            iteration += 1 / 3;
        }, 30);

        return () => clearInterval(interval);
    }, [text]);

    return displayText;
};

// Component helper for the rotating text
const RotatingText = () => {
    const [index, setIndex] = useState(0);
    const text = content.hero.typingText[index];
    const hackerText = useHackerEffect(text);

    useEffect(() => {
        const interval = setInterval(() => {
            setIndex((prev) => (prev + 1) % content.hero.typingText.length);
        }, 4000); // Change word every 4 seconds
        return () => clearInterval(interval);
    }, []);

    return <span className='text-accent-cyan'>{hackerText}</span>;
};

const Hero = () => {
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const containerRef = useRef(null);

    const handleMouseMove = (e) => {
        if (containerRef.current) {
            const rect = containerRef.current.getBoundingClientRect();
            setMousePosition({
                x: e.clientX - rect.left,
                y: e.clientY - rect.top,
            });
        }
    };

    return (
        <div
            name='hero'
            ref={containerRef}
            onMouseMove={handleMouseMove}
            className='w-full min-h-screen bg-primary flex items-center justify-center relative overflow-hidden'
        >

            {/* Grid Pattern Background */}
            <div
                className="absolute inset-0 pointer-events-none z-0"
                style={{
                    backgroundImage: `radial-gradient(circle 1px at center, rgba(255, 255, 255, 0.1) 1px, transparent 0)`,
                    backgroundSize: '40px 40px',
                }}
            ></div>

            {/* Interactive Spotlight */}
            <div
                className="absolute inset-0 pointer-events-none z-0 transition-opacity duration-300"
                style={{
                    background: `radial-gradient(600px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(139, 92, 246, 0.08), transparent 40%)`
                }}
            ></div>

            <div className='max-w-[1000px] w-full px-8 flex flex-col justify-center h-full z-10 pointers-events-none'>

                <motion.p
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5 }}
                    className='text-accent-green font-mono mb-4 text-lg'
                >
                    &gt; initializing_protocol...
                </motion.p>

                <motion.h1
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                    className='text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-bold text-gray-200'
                >
                    {content.hero.title.replace("Hi, I'm ", "")}
                </motion.h1>

                <motion.h2
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className='text-2xl sm:text-3xl md:text-5xl lg:text-6xl font-bold text-gray-400 mt-2 flex flex-wrap items-center gap-x-2 sm:gap-x-3'
                >
                    <span>I'm a</span> <RotatingText />
                </motion.h2>

                <motion.p
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                    className='text-gray-400 py-4 max-w-[700px] text-lg'
                >
                    {content.hero.subtitle}
                </motion.p>

                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                    className='flex flex-col sm:flex-row gap-4'
                >
                    <Link to="projects" smooth={true} duration={500}>
                        <button className='relative group border-2 border-accent-cyan px-6 py-3 my-2 flex items-center justify-center hover:bg-accent-cyan/10 transition-all duration-300 rounded-sm font-mono text-white overflow-hidden w-full sm:w-auto'>
                            <span className='z-10 relative'>{content.hero.cta}</span>
                            <span className='absolute inset-0 bg-accent-cyan opacity-0 group-hover:opacity-10 transition-opacity duration-300'></span>
                            <span className='group-hover:rotate-90 duration-300 ml-3 z-10'>
                                &rarr;
                            </span>
                        </button>
                    </Link>
                    <a href={content.resume.link} target="_blank" rel="noopener noreferrer">
                        <button className='relative group border-2 border-accent-green px-6 py-3 my-2 flex items-center justify-center hover:bg-accent-green/10 transition-all duration-300 rounded-sm font-mono text-white overflow-hidden w-full sm:w-auto'>
                            <span className='z-10 relative'>Resume</span>
                        </button>
                    </a>
                </motion.div>

            </div>
        </div>
    );
};

export default Hero;
