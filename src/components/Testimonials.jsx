import React from 'react';
import { motion } from 'framer-motion';
import { content } from '../data/content';
import { FaQuoteLeft, FaLinkedin } from 'react-icons/fa';

const Testimonials = () => {
    return (
        <div name='recommendations' className='w-full py-20 bg-primary text-gray-300'>
            <div className='max-w-[1200px] mx-auto p-4 flex flex-col justify-center w-full h-full'>
                <div className='pb-12 text-center'>
                    <motion.h2
                        initial={{ opacity: 0, y: -20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        viewport={{ once: true }}
                        className='text-4xl md:text-5xl font-bold inline-block border-b-4 border-accent-purple text-transparent bg-clip-text bg-gradient-to-r from-accent-purple to-white'
                    >
                        {content.testimonials.title}
                    </motion.h2>
                    <p className='py-6 font-mono text-accent-cyan/80'>// What people say about working with me</p>
                </div>

                <div className='grid md:grid-cols-2 lg:grid-cols-3 gap-8'>
                    {content.testimonials.items.map((item, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            viewport={{ once: true }}
                            whileHover={{ scale: 1.02 }}
                            className='bg-secondary/20 backdrop-blur-md p-8 rounded-2xl border border-white/5 shadow-xl flex flex-col relative group hover:border-accent-purple/30 transition-all duration-300'
                        >
                            <FaQuoteLeft className='text-4xl text-accent-purple/20 mb-4 group-hover:text-accent-purple/50 transition-colors' />

                            <p className='text-gray-300 italic mb-6 flex-grow'>"{item.quote}"</p>

                            <div className='flex items-center mt-auto justify-between'>
                                <div className='flex items-center'>
                                    <img
                                        src={item.image}
                                        alt={item.name}
                                        className='w-12 h-12 rounded-full mr-4 border-2 border-accent-purple object-cover'
                                    />
                                    <div>
                                        <h4 className='font-bold text-white group-hover:text-accent-cyan transition-colors'>{item.name}</h4>
                                        <p className='text-xs text-gray-500 font-mono'>{item.role}</p>
                                    </div>
                                </div>
                                {item.linkedin && (
                                    <a href={item.linkedin} target="_blank" rel="noopener noreferrer" className='text-[#0077b5] text-2xl hover:scale-110 transition-transform' title="View LinkedIn Profile">
                                        <FaLinkedin />
                                    </a>
                                )}
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Testimonials;
