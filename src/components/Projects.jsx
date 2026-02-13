import React from 'react';
import { motion } from 'framer-motion';
import { FaGithub, FaExternalLinkAlt } from 'react-icons/fa';
import { content } from '../data/content';

const Projects = () => {
    return (
        <div name='projects' className='w-full min-h-screen bg-primary text-gray-300 py-20'>
            <div className='max-w-[1200px] mx-auto p-4 flex flex-col justify-center w-full h-full'>
                <div className='pb-12 text-center'>
                    <motion.h2
                        initial={{ opacity: 0, y: -20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        viewport={{ once: true }}
                        className='text-4xl md:text-5xl font-bold inline-block border-b-4 border-accent-cyan text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-400'
                    >
                        {content.projects.title}
                    </motion.h2>
                    <p className='py-6 font-mono text-accent-purple/80'>// Some things I've built</p>
                </div>

                <div className='grid sm:grid-cols-2 lg:grid-cols-3 gap-8'>
                    {content.projects.items.map((item, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            viewport={{ once: true }}
                            whileHover={{ y: -10 }}
                            className='relative group rounded-xl overflow-hidden bg-secondary/30 backdrop-blur-sm border border-white/5 hover:border-accent-cyan/50 transition-all duration-300 shadow-xl'
                        >
                            {/* Image Container */}
                            <div className='relative overflow-hidden h-48'>
                                <img src={item.image} alt={item.title} className='w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500' />
                                <div className='absolute inset-0 bg-gradient-to-t from-primary via-transparent to-transparent opacity-60'></div>
                            </div>

                            {/* Content */}
                            <div className='p-6'>
                                <div className='flex justify-between items-center mb-4'>
                                    <h3 className='text-2xl font-bold text-white group-hover:text-accent-cyan transition-colors duration-300'>{item.title}</h3>
                                    <div className='flex space-x-4'>
                                        <a href={item.github} target="_blank" rel="noopener noreferrer" className='text-gray-400 hover:text-white text-xl transition-colors'>
                                            <FaGithub />
                                        </a>
                                        
                                    </div>
                                </div>

                                <p className='text-gray-400 text-sm mb-6 line-clamp-3'>
                                    {item.description}
                                </p>

                                <div className='flex flex-wrap gap-2'>
                                    {item.tech.map((tech, i) => (
                                        <span key={i} className='text-xs font-mono px-3 py-1 rounded-full bg-accent-purple/10 text-accent-purple border border-accent-purple/20'>
                                            {tech}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Projects;
