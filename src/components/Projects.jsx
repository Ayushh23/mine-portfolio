import React from 'react';
import { motion } from 'framer-motion';
import { FaGithub, FaExternalLinkAlt } from 'react-icons/fa';
import { usePortfolioData } from '../hooks/usePortfolioData';

const Projects = () => {
    const { content } = usePortfolioData();
    return (
        <div name='projects' className='w-full py-32 bg-primary text-gray-300 relative'>
            <div className='max-w-[1200px] mx-auto px-8 flex flex-col justify-center w-full h-full'>
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    viewport={{ once: true }}
                    className="mb-16 flex flex-col items-center"
                >
                    <h2 className='text-4xl md:text-5xl font-bold text-white mb-4'>
                        {content.projects.title}
                    </h2>
                    <div className="h-1 w-24 bg-gradient-to-r from-accent-cyan to-accent-purple rounded-full"></div>
                </motion.div>

                <div className='grid sm:grid-cols-2 lg:grid-cols-3 gap-10'>
                    {content.projects.items.map((item, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 40 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            viewport={{ once: true }}
                            whileHover={{ y: -10 }}
                            className='glass-card group relative overflow-hidden flex flex-col h-full hover:shadow-[0_0_30px_#00f0ff26] transition-all duration-500'
                        >
                            {/* Image Container with inner shadow */}
                            <div className='relative overflow-hidden h-56 w-full'>
                                <div className="absolute inset-0 bg-gradient-to-t from-primary/90 via-transparent to-transparent z-10 pointer-events-none"></div>
                                <img src={item.image} alt={item.title} className='w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700 ease-out' />
                            </div>

                            {/* Content */}
                            <div className='p-8 flex flex-col flex-grow relative z-20 -mt-12'>
                                <div className='flex justify-between items-end mb-4'>
                                    <h3 className='text-2xl font-bold text-white group-hover:text-accent-cyan transition-colors duration-300'>{item.title}</h3>
                                    <div className='flex space-x-4 mb-1'>
                                        <a href={item.github} target="_blank" rel="noopener noreferrer" className='text-gray-400 hover:text-white text-xl transition-transform hover:scale-110'>
                                            <FaGithub />
                                        </a>
                                    </div>
                                </div>

                                <p className='text-gray-400 font-light text-sm mb-6 flex-grow leading-relaxed'>
                                    {item.description}
                                </p>

                                <div className='flex flex-wrap gap-2 mt-auto pt-4 border-t border-white/5'>
                                    {item.tech.map((tech, i) => (
                                        <span key={i} className='text-xs font-mono px-3 py-1 rounded-full bg-white/5 text-gray-300 border border-white/10 group-hover:border-accent-cyan/30 transition-colors'>
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
