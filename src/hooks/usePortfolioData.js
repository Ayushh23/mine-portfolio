import { useState, useEffect } from 'react';
import { content as fallbackContent } from '../data/content';

export const usePortfolioData = () => {
    const [data, setData] = useState(fallbackContent);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'https://mine-portfolio-backend.onrender.com';
        fetch(`${API_BASE_URL}/api/public/data`)
            .then(res => {
                if (!res.ok) throw new Error('Network response was not ok');
                return res.json();
            })
            .then(apiData => {
                // Use API data if available, otherwise stay with fallback
                const mergedData = {
                    ...fallbackContent,
                    projects: { 
                        ...fallbackContent.projects, 
                        items: apiData.projects !== undefined ? [...apiData.projects].reverse() : fallbackContent.projects.items 
                    },
                    skills: { 
                        ...fallbackContent.skills, 
                        items: apiData.skills !== undefined ? apiData.skills : fallbackContent.skills.items 
                    },
                    experience: { 
                        ...fallbackContent.experience, 
                        items: apiData.experiences !== undefined ? [...apiData.experiences].reverse() : fallbackContent.experience.items 
                    },
                    testimonials: { 
                        ...fallbackContent.testimonials, 
                        items: apiData.testimonials !== undefined ? [...apiData.testimonials].reverse() : fallbackContent.testimonials.items 
                    },
                    settings: apiData.settings || {}
                };
                setData(mergedData);
                setLoading(false);
            })
            .catch(err => {
                console.warn("Failed to fetch backend data (backend might be offline), using static fallback content.", err);
                setData(fallbackContent);
                setLoading(false);
            });
    }, []);

    return { content: data, loading };
};
