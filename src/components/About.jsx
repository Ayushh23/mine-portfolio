import React from 'react';
import { motion } from 'framer-motion';
import { content } from '../data/content';

const About = () => {
    return (
        <div name='about' className='w-full py-32 bg-primary text-gray-300 relative'>
            <div className='max-w-[1200px] mx-auto px-8 flex flex-col justify-center w-full h-full'>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    viewport={{ once: true }}
                    className="mb-12 flex items-center space-x-4"
                >
                    <h2 className='text-4xl md:text-5xl font-bold text-white'>
                        {content.about.title}
                    </h2>
                    <div className="h-[1px] bg-white/10 flex-grow ml-4 mt-2"></div>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7 }}
                    viewport={{ once: true }}
                    className='glass-card p-8 md:p-12 relative overflow-hidden'
                >
                    {/* Decorative glow inside card */}
                    <div className="absolute top-0 right-0 w-64 h-64 bg-accent-cyan/10 rounded-full mix-blend-screen filter blur-[80px] -z-10"></div>
                    <div className="absolute bottom-0 left-0 w-64 h-64 bg-accent-purple/10 rounded-full mix-blend-screen filter blur-[80px] -z-10"></div>

                    <div className='grid md:grid-cols-2 gap-10 md:gap-16 items-center'>
                        <div className='text-3xl md:text-4xl font-bold text-white leading-tight'>
                            <p>Great design is transparent.</p>
                            <p className="text-transparent bg-clip-text bg-gradient-to-r from-accent-purple to-accent-cyan mt-2">
                                So is great code.
                            </p>
                        </div>
                        <div className="space-y-6 text-lg text-gray-400 font-light leading-relaxed">
                            <p>{content.about.description}</p>
                            <div className="flex items-center space-x-4 pt-4">
                                <div className="w-12 h-[1px] bg-accent-cyan"></div>
                                <span className="font-mono text-sm text-accent-cyan tracking-widest uppercase">My Philosophy</span>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

export default About;
