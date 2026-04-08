import React from 'react';
import { motion } from 'framer-motion';
import { FaReact, FaGithub, FaHtml5, FaCss3Alt, FaJsSquare, FaNodeJs, FaJava, FaDatabase } from 'react-icons/fa';
import {
    SiTailwindcss, SiMongodb, SiFirebase,
    SiMysql, SiPython, SiSpringboot,
    SiAndroid, SiGoogle, SiRedis, SiFastapi, SiKotlin, SiNginx,
    SiOpenai, SiDocker, SiPostman
} from 'react-icons/si';
import { DiMysql } from 'react-icons/di';
import { usePortfolioData } from '../hooks/usePortfolioData';

// Map icon strings to components
const iconMap = {
    FaReact: FaReact,
    SiTailwindcss: SiTailwindcss,
    SiJavascript: FaJsSquare,
    SiHtml5: FaHtml5,
    SiCss3: FaCss3Alt,
    SiGit: FaGithub,
    SiSpringboot: SiSpringboot,
    SiPython: SiPython,
    SiFastapi: SiFastapi,
    SiMongodb: SiMongodb,
    SiFirebase: SiFirebase,
    SiKotlin: SiKotlin,
    SiAndroid: SiAndroid,
    SiGoogle: SiGoogle,
    SiRedis: SiRedis,
    DiMysql: DiMysql,
    SiJava: FaJava,
    SiNginx: SiNginx,
    SiSql: FaDatabase,
    SiGithub: FaGithub,
    SiOpenai: SiOpenai,
    SiDocker: SiDocker,
    SiPostman: SiPostman
};

const Skills = () => {
    const { content } = usePortfolioData();
    return (
        <div name='skills' className='w-full py-32 bg-primary text-gray-300 relative'>
            <div className='max-w-[1200px] mx-auto px-8 flex flex-col justify-center w-full h-full'>
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    viewport={{ once: true }}
                    className="mb-16 flex flex-col md:flex-row md:items-end justify-between border-b border-white/10 pb-6"
                >
                    <h2 className='text-4xl md:text-5xl font-bold text-white'>
                        {content.skills.title}
                    </h2>
                    <p className='text-gray-400 font-mono mt-4 md:mt-0 text-sm md:text-base'>
                        // Technologies I've mastered
                    </p>
                </motion.div>

                <div className='w-full grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-6'>
                    {content.skills.items.map((item, index) => {
                        const IconComponent = iconMap[item.icon] || FaGithub;
                        return (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                                whileInView={{ opacity: 1, scale: 1, y: 0 }}
                                transition={{ duration: 0.4, delay: index * 0.05 }}
                                viewport={{ once: true }}
                                whileHover={{ y: -5 }}
                                className='glass-card flex flex-col items-center justify-center p-4 md:p-6 group hover:border-accent-cyan/50 transition-all duration-300 cursor-default'
                            >
                                <div className="p-3 md:p-4 rounded-full bg-white/5 mb-3 md:mb-4 group-hover:bg-accent-cyan/10 transition-colors duration-300">
                                    <IconComponent className='text-3xl md:text-4xl drop-shadow-lg group-hover:scale-110 transition-transform duration-300' style={{ color: item.color }} />
                                </div>
                                <p className='font-medium text-gray-300 group-hover:text-white transition-colors tracking-wide text-sm md:text-base text-center'>{item.name}</p>
                            </motion.div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

export default Skills;
