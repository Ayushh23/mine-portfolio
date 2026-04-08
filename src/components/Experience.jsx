import React from 'react';
import { motion } from 'framer-motion';
import { usePortfolioData } from '../hooks/usePortfolioData';
import { FaBriefcase, FaCalendarAlt } from 'react-icons/fa';

const Experience = () => {
    const { content } = usePortfolioData();
    return (
        <div name='experience' className='w-full py-32 bg-primary text-gray-300 relative'>
            <div className='max-w-[1000px] mx-auto px-8 flex flex-col justify-center w-full h-full'>
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    viewport={{ once: true }}
                    className="mb-16 flex flex-col md:flex-row md:items-end justify-between border-b border-white/10 pb-6"
                >
                    <h2 className='text-4xl md:text-5xl font-bold text-white'>
                        {content.experience.title}
                    </h2>
                    <p className='text-gray-400 font-mono mt-4 md:mt-0 text-sm md:text-base'>
                        // My professional journey
                    </p>
                </motion.div>

                <div className='relative flex flex-col space-y-12'>
                    {/* Glowing Timeline Line */}
                    <div className="absolute left-[27px] md:left-[39px] top-4 bottom-4 w-px bg-gradient-to-b from-accent-cyan via-accent-purple to-transparent opacity-50"></div>

                    {content.experience.items.map((item, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, x: -50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            viewport={{ once: true }}
                            className='relative pl-16 md:pl-24'
                        >
                            {/* Glowing Dot on Timeline */}
                            <div className="absolute left-4 md:left-7 top-6 w-5 h-5 rounded-full bg-primary border-4 border-accent-cyan shadow-[0_0_15px_#00f0ff99] z-10"></div>

                            <div className='glass-card p-8 group hover:-translate-y-1 hover:shadow-[0_0_30px_#9d4edd26] transition-all duration-300'>
                                <div className='flex flex-col md:flex-row md:justify-between md:items-start mb-6'>
                                    <div>
                                        <h3 className='text-2xl md:text-3xl font-bold text-white group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-accent-cyan group-hover:to-accent-purple transition-all duration-300'>
                                            {item.role}
                                        </h3>
                                        <p className='text-accent-cyan font-mono text-lg mt-1'>{item.company}</p>
                                    </div>
                                    <div className='flex items-center gap-2 text-gray-400 font-mono text-sm mt-3 md:mt-1 bg-white/5 py-1 px-3 rounded-full border border-white/10'>
                                        <FaCalendarAlt className="text-accent-purple" />
                                        <span>{item.duration}</span>
                                    </div>
                                </div>

                                <ul className='space-y-3 text-gray-400 font-light leading-relaxed text-base md:text-lg'>
                                    {item.description.map((point, i) => (
                                        <li key={i} className='flex items-start'>
                                            <span className='text-accent-cyan mr-3 mt-1.5 opacity-70'>▹</span>
                                            <span className="group-hover:text-gray-300 transition-colors duration-300">{point}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Experience;
