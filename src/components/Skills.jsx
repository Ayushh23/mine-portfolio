import React from 'react';
import { motion } from 'framer-motion';
import { FaReact, FaGithub, FaHtml5, FaCss3Alt, FaJsSquare, FaNodeJs, FaJava, FaDatabase } from 'react-icons/fa';
import {
    SiTailwindcss, SiMongodb, SiFirebase,
    SiMysql, SiPython, SiSpringboot,
    SiAndroid, SiGoogle, SiRedis, SiFastapi, SiKotlin, SiNginx
} from 'react-icons/si';
import { DiMysql } from 'react-icons/di';
import { content } from '../data/content';

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
    SiGithub: FaGithub
};

const Skills = () => {
    return (
        <div name='skills' className='w-full min-h-screen bg-primary text-gray-300 py-20'>
            <div className='max-w-[1000px] mx-auto p-4 flex flex-col justify-center w-full h-full'>
                <div>
                    <motion.p
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5 }}
                        viewport={{ once: true }}
                        className='text-4xl font-bold inline border-b-4 border-accent-purple'
                    >
                        {content.skills.title}
                    </motion.p>
                    <p className='py-4 font-mono'>// These are the technologies I've worked with</p>
                </div>

                <div className='w-full grid grid-cols-2 sm:grid-cols-4 gap-4 text-center py-8'>
                    {content.skills.items.map((item, index) => {
                        const IconComponent = iconMap[item.icon] || FaGithub; // Default to Github if not found
                        return (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.3, delay: index * 0.05 }}
                                viewport={{ once: true }}
                                whileHover={{ scale: 1.05, backgroundColor: 'rgba(255, 255, 255, 0.05)' }}
                                className='shadow-md shadow-[#040c16] hover:scale-105 duration-300 rounded-md p-4 flex flex-col items-center justify-center group'
                            >
                                <IconComponent className='text-5xl mx-auto mb-4' style={{ color: item.color }} />
                                <p className='my-4 font-bold group-hover:text-accent-cyan transition-colors'>{item.name}</p>
                            </motion.div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

export default Skills;
