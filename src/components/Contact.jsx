import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { content } from '../data/content';
import { FaPaperPlane, FaEnvelope, FaCheckCircle, FaExclamationCircle } from 'react-icons/fa';

const Contact = () => {
    const [status, setStatus] = useState(null); // null | 'loading' | 'success' | 'error'
    const [errorMsg, setErrorMsg] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatus('loading');
        setErrorMsg('');

        const formData = new FormData(e.target);
        const body = {
            name: formData.get('name'),
            email: formData.get('email'),
            message: formData.get('message'),
        };

        try {
            const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'https://mine-portfolio-backend.onrender.com';
            const res = await fetch(`${API_BASE_URL}/api/public/contact`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(body),
            });

            const data = await res.json();

            if (res.ok && data.success) {
                setStatus('success');
                e.target.reset();
            } else {
                setStatus('error');
                setErrorMsg(data.error || 'Something went wrong. Please try again.');
            }
        } catch (err) {
            setStatus('error');
            setErrorMsg('Could not connect to server. Please try again later.');
        }
    };

    return (
        <div name='contact' className='w-full py-32 bg-primary flex justify-center items-center px-4 relative overflow-hidden'>

            {/* Background Orbs */}
            <div className="absolute top-1/2 left-0 w-[40rem] h-[40rem] bg-accent-blue/10 rounded-full mix-blend-screen filter blur-[120px] -translate-y-1/2 -z-10 pointer-events-none"></div>

            <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
                className='max-w-[1200px] w-full grid lg:grid-cols-2 gap-16 md:px-8'
            >
                {/* Text Side */}
                <div className='flex flex-col justify-center'>
                    <div className='mb-8'>
                        <h2 className='text-5xl md:text-7xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-accent-cyan via-accent-purple to-accent-blue tracking-tighter'>
                            {content.contact.title}
                        </h2>
                        <div className="mt-8 space-y-6 text-gray-400 text-lg md:text-xl font-light leading-relaxed max-w-md">
                            <p>{content.contact.description}</p>
                            <p>Whether you have a question or just want to say hi, I'll try my best to get back to you!</p>
                        </div>

                        <div className='flex flex-col space-y-6 mt-12'>
                            <div className='flex items-center space-x-6 text-gray-300 group'>
                                <div className="p-4 rounded-full bg-white/5 border border-white/10 group-hover:border-accent-cyan/50 group-hover:bg-accent-cyan/10 transition-all duration-300">
                                    <FaEnvelope className="text-xl text-accent-cyan" />
                                </div>
                                <div>
                                    <p className="text-sm text-gray-500 font-mono mb-1">Email Me</p>
                                    <a href={`mailto:${content.contact.email}`} className='text-lg font-medium hover:text-white transition-colors cursor-pointer'>{content.contact.email}</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Form Side */}
                <div className="relative">
                    {/* Decorative blurred backdrop specifically for form */}
                    <div className="absolute inset-0 bg-gradient-to-br from-accent-cyan/20 to-accent-purple/20 blur-3xl -z-10 rounded-[3rem]"></div>

                    <form
                        onSubmit={handleSubmit}
                        className='flex flex-col p-8 md:p-10 glass-card z-10'
                    >
                        <h3 className='text-3xl font-bold text-white mb-8 border-b border-white/10 pb-4'>Send a Message</h3>

                        <div className='flex flex-col space-y-6'>
                            <input
                                className='w-full bg-black/20 border border-white/10 rounded-xl p-4 text-white placeholder-gray-500 focus:outline-none focus:border-accent-cyan focus:ring-1 focus:ring-accent-cyan transition-all font-light'
                                type="text"
                                placeholder='Your Name'
                                name='name'
                                required
                            />

                            <input
                                className='w-full bg-black/20 border border-white/10 rounded-xl p-4 text-white placeholder-gray-500 focus:outline-none focus:border-accent-cyan focus:ring-1 focus:ring-accent-cyan transition-all font-light'
                                type="email"
                                placeholder='Your Email'
                                name='email'
                                required
                            />

                            <textarea
                                className='w-full bg-black/20 border border-white/10 rounded-xl p-4 text-white placeholder-gray-500 focus:outline-none focus:border-accent-cyan focus:ring-1 focus:ring-accent-cyan transition-all font-light h-40 resize-none'
                                name="message"
                                placeholder='How can I help you?'
                                required
                            ></textarea>
                        </div>

                        {/* Status messages */}
                        {status === 'success' && (
                            <motion.div
                                initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                                className='mt-6 flex items-center gap-3 text-green-400 bg-green-400/10 border border-green-400/20 rounded-xl px-4 py-3'
                            >
                                <FaCheckCircle className="flex-shrink-0" />
                                <span className="text-sm font-medium">Message sent! I'll get back to you soon.</span>
                            </motion.div>
                        )}
                        {status === 'error' && (
                            <motion.div
                                initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                                className='mt-6 flex items-center gap-3 text-red-400 bg-red-400/10 border border-red-400/20 rounded-xl px-4 py-3'
                            >
                                <FaExclamationCircle className="flex-shrink-0" />
                                <span className="text-sm font-medium">{errorMsg}</span>
                            </motion.div>
                        )}

                        <button
                            type="submit"
                            disabled={status === 'loading'}
                            className='group mt-8 relative px-8 py-4 bg-white text-primary rounded-xl font-bold text-lg flex items-center justify-center overflow-hidden transition-all hover:scale-[1.02] active:scale-95 w-full shadow-[0_0_20px_#ffffff1a] hover:shadow-[0_0_30px_#ffffff40] disabled:opacity-60 disabled:cursor-not-allowed disabled:scale-100'
                        >
                            <span className="relative z-10 flex items-center">
                                {status === 'loading' ? (
                                    <>
                                        <svg className="animate-spin h-5 w-5 mr-3" viewBox="0 0 24 24" fill="none">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"/>
                                        </svg>
                                        Sending...
                                    </>
                                ) : (
                                    <>
                                        Send Message
                                        <FaPaperPlane className='ml-3 group-hover:-translate-y-1 group-hover:translate-x-1 transition-transform' />
                                    </>
                                )}
                            </span>
                        </button>
                    </form>
                </div>
            </motion.div>
        </div>
    );
};

export default Contact;


