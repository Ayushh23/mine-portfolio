import React from 'react';
import { motion } from 'framer-motion';
import { content } from '../data/content';

const About = () => {
    return (
        <div name='about' className='w-full py-20 bg-primary text-gray-300'>
            <div className='flex flex-col justify-center items-center w-full h-full'>
                <div className='max-w-[1000px] w-full grid sm:grid-cols-2 gap-8'>
                    <div className='sm:text-right pb-8 pl-4'>
                        <motion.p
                            initial={{ opacity: 0, x: -50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.5 }}
                            viewport={{ once: true }}
                            className='text-4xl font-bold inline border-b-4 border-accent-cyan'
                        >
                            {content.about.title}
                        </motion.p>
                    </div>
                    <div></div>
                </div>
                <div className='max-w-[1000px] w-full grid sm:grid-cols-2 gap-8 px-4'>
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        viewport={{ once: true }}
                        className='sm:text-right text-4xl font-bold'
                    >
                        <p>Hi. I'm Ayush, nice to meet you. Please take a look around.</p>
                    </motion.div>
                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        viewport={{ once: true }}
                    >
                        <p>{content.about.description}</p>
                    </motion.div>
                </div>
            </div>
        </div>
    );
};

export default About;
