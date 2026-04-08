import React, { useState, useEffect } from 'react';

const AdminDashboard = () => {
    const [activeTab, setActiveTab] = useState('projects');
    const [data, setData] = useState({ projects: [], skills: [], experiences: [], testimonials: [] });
    const [settings, setSettings] = useState({});
    const [loading, setLoading] = useState(true);

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [formData, setFormData] = useState({});
    const [editingId, setEditingId] = useState(null);

    const token = localStorage.getItem('adminToken');

    useEffect(() => {
        if (!token) window.location.href = '/admin';
        fetchData();
    }, [token]);

    const fetchData = async () => {
        try {
            const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080';
            const res = await fetch(`${API_BASE_URL}/api/public/data`);
            if (res.ok) {
                const json = await res.json();
                setData({
                    projects: json.projects || [],
                    skills: json.skills || [],
                    experiences: json.experiences || [],
                    testimonials: json.testimonials || []
                });
                setSettings(json.settings || {});
            }
        } catch (err) {
            console.error("Failed to load data");
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (type, id) => {
        if (!window.confirm("Are you sure?")) return;
        try {
            const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080';
            const res = await fetch(`${API_BASE_URL}/api/admin/${type}/${id}`, {
                method: 'DELETE',
                headers: { 'Authorization': `Bearer ${token}` }
            });
            if (res.ok) {
                fetchData();
            } else {
                alert("Failed to delete.");
            }
        } catch(err) {
            alert("Error occurred.");
        }
    };

    const handleLogout = () => {
        localStorage.removeItem('adminToken');
        window.location.href = '/admin';
    };

    const formConfig = {
        projects: [
            { name: 'title', label: 'Title', type: 'text' },
            { name: 'description', label: 'Description', type: 'textarea' },
            { name: 'image', label: 'Image URL', type: 'text' },
            { name: 'github', label: 'GitHub URL', type: 'text' },
            { name: 'live', label: 'Live URL', type: 'text' },
            { name: 'tech', label: 'Technologies (comma separated)', type: 'text' }
        ],
        skills: [
            { name: 'name', label: 'Skill Name', type: 'text' },
            { name: 'icon', label: 'Icon Code (e.g. SiJava)', type: 'text' },
            { name: 'color', label: 'Color Hex (e.g. #ffffff)', type: 'text' }
        ],
        experiences: [
            { name: 'company', label: 'Company Name', type: 'text' },
            { name: 'role', label: 'Role / Job Title', type: 'text' },
            { name: 'duration', label: 'Duration (e.g. May 2023 - Present)', type: 'text' },
            { name: 'description', label: 'Description Points (newline separated)', type: 'textarea' }
        ],
        testimonials: [
            { name: 'name', label: 'Name', type: 'text' },
            { name: 'role', label: 'Role / Designation', type: 'text' },
            { name: 'quote', label: 'Quote', type: 'textarea' },
            { name: 'image', label: 'Profile Image URL', type: 'text' },
            { name: 'linkedin', label: 'LinkedIn URL', type: 'text' }
        ]
    };

    const handleOpenModal = (item = null) => {
        if (item) {
            setEditingId(item.id);
            const prefilled = { ...item };
            if (activeTab === 'projects' && Array.isArray(item.tech)) prefilled.tech = item.tech.join(', ');
            if (activeTab === 'experiences' && Array.isArray(item.description)) prefilled.description = item.description.join('\n');
            setFormData(prefilled);
        } else {
            setEditingId(null);
            setFormData({});
        }
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setFormData({});
        setEditingId(null);
    };

    const handleFormChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        
        let payload = { ...formData };
        if (activeTab === 'projects' && payload.tech && typeof payload.tech === 'string') {
            payload.tech = payload.tech.split(',').map(s => s.trim()).filter(s => s);
        }
        if (activeTab === 'experiences' && payload.description && typeof payload.description === 'string') {
            payload.description = payload.description.split('\n').map(s => s.trim()).filter(s => s);
        }

        const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080';
        const url = editingId 
            ? `${API_BASE_URL}/api/admin/${activeTab}/${editingId}`
            : `${API_BASE_URL}/api/admin/${activeTab}`;
            
        const method = editingId ? 'PUT' : 'POST';

        try {
            const res = await fetch(url, {
                method,
                headers: { 
                    'Authorization': `Bearer ${token}`, 
                    'Content-Type': 'application/json' 
                },
                body: JSON.stringify(payload)
            });

            if (res.ok) {
                handleCloseModal();
                fetchData();
            } else {
                alert("Failed to save data. Please check your token or payload.");
            }
        } catch (err) {
            alert("Network error.");
        }
    };

    const handleUpdateSetting = async (key, value) => {
        try {
            const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080';
            const res = await fetch(`${API_BASE_URL}/api/admin/settings`, {
                method: 'PUT',
                headers: { 
                    'Authorization': `Bearer ${token}`, 
                    'Content-Type': 'application/json' 
                },
                body: JSON.stringify({ key, value })
            });
            if (res.ok) {
                const updated = await res.json();
                setSettings({ ...settings, [updated.key]: updated.value });
                alert("Setting saved successfully!");
            }
        } catch (err) {
            alert("Failed to save setting.");
        }
    };

    return (
        <div className="min-h-screen bg-primary text-gray-300">
            <nav className="glass border-b border-white/10 p-4 flex justify-between items-center sticky top-0 z-50">
                <h1 className="text-2xl font-bold text-white uppercase tracking-widest">Admin <span className="text-accent-cyan">Panel</span></h1>
                <div className="flex gap-4">
                    <a href="/" target="_blank" rel="noreferrer" className="text-accent-purple hover:text-white mt-2">View Live Site ↗</a>
                    <button onClick={handleLogout} className="bg-white/5 border border-white/10 px-4 py-2 rounded">Logout</button>
                </div>
            </nav>

            <div className="max-w-[1200px] mx-auto p-8">
                <div className="flex gap-4 mb-8 overflow-x-auto pb-2">
                    {['projects', 'skills', 'experiences', 'testimonials', 'settings'].map(tab => (
                        <button key={tab} onClick={() => { setActiveTab(tab); setFormData({}); setEditingId(null); }} className={`px-6 py-3 rounded-lg font-bold capitalize transition-all whitespace-nowrap ${activeTab === tab ? 'bg-accent-cyan/20 text-accent-cyan border border-accent-cyan/50' : 'glass-card hover:bg-white/5'}`}>
                            {tab}
                        </button>
                    ))}
                </div>

                <div className="glass-card p-8">
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-2xl font-bold text-white capitalize">Manage {activeTab}</h2>
                        <button onClick={() => handleOpenModal()} className="bg-gradient-to-r from-accent-cyan to-accent-blue hover:scale-105 text-white px-4 py-2 rounded-lg shadow-lg font-bold transition-transform">
                            + Add New
                        </button>
                    </div>

                    {activeTab === 'settings' ? (
                        <div className="space-y-8">
                            <div className="bg-white/5 p-6 rounded-xl border border-white/10">
                                <h3 className="text-lg font-bold text-white mb-4">Resume Configuration</h3>
                                <div className="flex flex-col gap-2">
                                    <label className="text-sm text-gray-400">Resume URL (Google Drive, Dropbox, etc.)</label>
                                    <div className="flex gap-2">
                                        <input 
                                            id="resume_url_input"
                                            type="text" 
                                            placeholder="https://drive.google.com/..." 
                                            defaultValue={settings.resume_url || ''}
                                            className="grow bg-black/30 border border-white/10 rounded-lg p-3 text-white focus:border-accent-cyan outline-none"
                                        />
                                        <button 
                                            onClick={() => handleUpdateSetting('resume_url', document.getElementById('resume_url_input').value)}
                                            className="bg-accent-cyan text-primary font-bold px-6 py-2 rounded-lg hover:brightness-110"
                                        >
                                            Save
                                        </button>
                                    </div>
                                    <p className="text-[10px] text-gray-500 mt-1 uppercase tracking-widest">TIP: Make sure the link is set to "Anyone with link can view"</p>
                                </div>
                            </div>
                        </div>
                    ) : (
                        loading ? <p className="text-center py-10">Loading data from backend...</p> : (
                            <div className="overflow-x-auto">
                                <table className="w-full text-left border-collapse">
                                    <thead>
                                        <tr className="border-b border-white/10 text-gray-400">
                                            <th className="p-4 font-mono text-sm">ID</th>
                                            <th className="p-4 font-mono text-sm">Title / Name</th>
                                            <th className="p-4 text-right font-mono text-sm">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {data[activeTab].map(item => (
                                            <tr key={item.id} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                                                <td className="p-4 font-mono text-accent-cyan">{item.id}</td>
                                                <td className="p-4 font-bold text-white">{item.title || item.name || item.company}</td>
                                                <td className="p-4 text-right space-x-5">
                                                    <button onClick={() => handleOpenModal(item)} className="text-gray-400 hover:text-accent-cyan transition-colors">Edit</button>
                                                    <button onClick={() => handleDelete(activeTab, item.id)} className="text-gray-400 hover:text-red-400 transition-colors">Delete</button>
                                                </td>
                                            </tr>
                                        ))}
                                        {data[activeTab].length === 0 && (
                                            <tr><td colSpan="3" className="p-10 text-center text-gray-500 font-mono">No data found or Backend Offline.</td></tr>
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        )
                    )}
                </div>
            </div>

            {/* Modal Form */}
            {isModalOpen && (
                <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[100] flex items-center justify-center p-4">
                    <div className="glass-card max-w-lg w-full p-8 max-h-[90vh] overflow-y-auto">
                        <div className="flex justify-between items-center mb-6">
                            <h3 className="text-2xl font-bold text-white capitalize">{editingId ? 'Edit' : 'Add New'} {activeTab.slice(0, -1)}</h3>
                            <button onClick={handleCloseModal} className="text-gray-400 hover:text-white text-3xl leading-none">&times;</button>
                        </div>
                        
                        <form onSubmit={handleFormSubmit} className="space-y-4">
                            {formConfig[activeTab].map(field => (
                                <div key={field.name} className="flex flex-col">
                                    <label className="text-sm text-gray-400 mb-1">{field.label}</label>
                                    {field.type === 'textarea' ? (
                                        <textarea 
                                            name={field.name}
                                            value={formData[field.name] || ''}
                                            onChange={handleFormChange}
                                            className="bg-black/30 border border-white/10 rounded p-3 text-white focus:border-accent-cyan outline-none min-h-[100px]"
                                            required={field.name !== 'live' && field.name !== 'github'} // make URLs optional
                                        />
                                    ) : (
                                        <input 
                                            type={field.type}
                                            name={field.name}
                                            value={formData[field.name] || ''}
                                            onChange={handleFormChange}
                                            className="bg-black/30 border border-white/10 rounded p-3 text-white focus:border-accent-cyan outline-none"
                                            required={field.name !== 'live' && field.name !== 'github'}
                                        />
                                    )}
                                </div>
                            ))}
                            
                            <div className="pt-4 flex justify-end gap-3">
                                <button type="button" onClick={handleCloseModal} className="px-4 py-2 rounded text-gray-400 hover:text-white hover:bg-white/10 transition-colors">Cancel</button>
                                <button type="submit" className="bg-accent-cyan text-primary font-bold px-6 py-2 rounded hover:brightness-110 transition-all">Save {activeTab.slice(0, -1)}</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AdminDashboard;
