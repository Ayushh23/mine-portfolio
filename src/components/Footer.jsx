import React from 'react';
import { content } from '../data/content';
import { FaGithub, FaLinkedin, FaTwitter } from 'react-icons/fa';

const Footer = () => {
    return (
        <div className='bg-secondary p-4 text-center text-gray-400'>
            <div className='flex justify-center space-x-6 mb-4'>
                {content.contact.socials.map((social, index) => {
                    // Determine icon
                    let Icon = FaGithub;
                    if (social.platform === 'LinkedIn') Icon = FaLinkedin;
                    if (social.platform === 'Twitter') Icon = FaTwitter;

                    return (
                        <a key={index} href={social.url} target="_blank" rel="noopener noreferrer" className='hover:text-accent-cyan transition-colors text-2xl'>
                            <Icon />
                        </a>
                    )
                })}
            </div>
            <p className='font-mono text-sm'>{content.footer.text}</p>
        </div>
    );
};

export default Footer;
