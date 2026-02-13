import React from 'react';
import { motion } from 'framer-motion';
import { content } from '../data/content';
import { FaPaperPlane } from 'react-icons/fa';

const Contact = () => {
    return (
        <div name='contact' className='w-full min-h-screen bg-primary flex justify-center items-center p-4 py-20'>
            <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
                className='max-w-[1000px] w-full grid md:grid-cols-2 gap-8 px-4 sm:px-0'
            >
                {/* Text Side */}
                <div className='flex flex-col justify-center p-6'>
                    <div className='pb-4'>
                        <p className='text-4xl font-bold inline border-b-4 border-accent-green text-gray-300'>
                            {content.contact.title}
                        </p>
                        <p className='text-gray-400 py-6 text-lg'>
                            {content.contact.description}
                        </p>
                        <div className='flex flex-col space-y-4'>
                            <div className='flex items-center space-x-4 text-gray-300'>
                                <span className='text-accent-green font-mono'>Email:</span>
                                <span className='hover:text-accent-green transition-colors cursor-pointer'>{content.contact.email}</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Form Side */}
                <form
                    onSubmit={async (e) => {
                        e.preventDefault();
                        const formData = new FormData(e.target);
                        formData.append("access_key", import.meta.env.VITE_WEB3FORMS_ACCESS_KEY);

                        const object = Object.fromEntries(formData);
                        const json = JSON.stringify(object);

                        const res = await fetch("https://api.web3forms.com/submit", {
                            method: "POST",
                            headers: {
                                "Content-Type": "application/json",
                                Accept: "application/json"
                            },
                            body: json
                        }).then((res) => res.json());

                        if (res.success) {
                            alert("Message sent successfully!");
                            e.target.reset();
                        } else {
                            alert("Something went wrong. Please try again.");
                        }
                    }}
                    className='flex flex-col p-8 bg-secondary/30 backdrop-blur-md rounded-2xl border border-white/5 shadow-2xl'
                >
                    <h3 className='text-2xl font-bold text-white mb-6'>Send me a message</h3>

                    <div className='flex flex-col space-y-6'>
                        <input
                            className='w-full bg-primary/50 border border-gray-700 rounded-lg p-3 text-gray-300 placeholder-gray-500 focus:outline-none focus:border-accent-green focus:ring-1 focus:ring-accent-green transition-all'
                            type="text"
                            placeholder='Name'
                            name='name'
                            required
                        />

                        <input
                            className='w-full bg-primary/50 border border-gray-700 rounded-lg p-3 text-gray-300 placeholder-gray-500 focus:outline-none focus:border-accent-green focus:ring-1 focus:ring-accent-green transition-all'
                            type="email"
                            placeholder='Email'
                            name='email'
                            required
                        />

                        <textarea
                            className='w-full bg-primary/50 border border-gray-700 rounded-lg p-3 text-gray-300 placeholder-gray-500 focus:outline-none focus:border-accent-green focus:ring-1 focus:ring-accent-green transition-all h-32 resize-none'
                            name="message"
                            placeholder='Message'
                            required
                        ></textarea>
                    </div>

                    <button className='group text-white bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-500 hover:to-emerald-500 px-6 py-3 my-8 mx-auto flex items-center rounded-lg shadow-lg transform hover:-translate-y-1 transition-all duration-300 w-full justify-center font-bold'>
                        Send Message
                        <FaPaperPlane className='ml-3 group-hover:translate-x-1 transition-transform' />
                    </button>
                </form>
            </motion.div>
        </div>
    );
};

export default Contact;
