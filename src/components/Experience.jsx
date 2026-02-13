import React from 'react';
import { motion } from 'framer-motion';
import { content } from '../data/content';
import { FaBriefcase, FaCalendarAlt } from 'react-icons/fa';

const Experience = () => {
    return (
        <div name='experience' className='w-full min-h-screen bg-primary text-gray-300 py-20'>
            <div className='max-w-[1000px] mx-auto p-4 flex flex-col justify-center w-full h-full'>
                <div className='pb-12'>
                    <motion.p
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5 }}
                        viewport={{ once: true }}
                        className='text-4xl font-bold inline border-b-4 border-accent-cyan'
                    >
                        {content.experience.title}
                    </motion.p>
                    <p className='py-4 font-mono'>// My professional journey</p>
                </div>

                <div className='flex flex-col space-y-8'>
                    {content.experience.items.map((item, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            viewport={{ once: true }}
                            className='glass p-6 rounded-xl border-l-4 border-accent-cyan hover:bg-white/5 transition-colors'
                        >
                            <div className='flex flex-col md:flex-row md:justify-between md:items-center mb-4'>
                                <div>
                                    <h3 className='text-2xl font-bold text-white flex items-center gap-2'>
                                        <FaBriefcase className='text-accent-cyan text-lg' />
                                        {item.role}
                                    </h3>
                                    <p className='text-accent-purple font-mono text-lg'>{item.company}</p>
                                </div>
                                <div className='flex items-center gap-2 text-gray-400 font-mono text-sm mt-2 md:mt-0'>
                                    <FaCalendarAlt />
                                    <span>{item.duration}</span>
                                </div>
                            </div>

                            <ul className='list-disc list-inside space-y-2 text-gray-300'>
                                {item.description.map((point, i) => (
                                    <li key={i} className='pl-2 border-l-2 border-gray-700 ml-1 hover:border-accent-cyan hover:text-white transition-colors duration-300'>
                                        {point}
                                    </li>
                                ))}
                            </ul>
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Experience;
