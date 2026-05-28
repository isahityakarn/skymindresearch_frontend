import React from 'react'

const Project = () => {
    // ==========================================
    // TAB 4: PROJECT DATA & ACTIONS
    // ==========================================
    const [projects, setProjects] = useState([
        { id: 'P-1', name: 'Project TITAN', description: 'Decentralized Core Database Encryption', progress: 74, status: 'Critical', leader: 'Dr. Evelyn Foster' },
        { id: 'P-2', name: 'AETHER Sync', description: 'Satellite Spectrum Disruption Jamming Restoration', progress: 38, status: 'High', leader: 'Agent Vance' },
        { id: 'P-3', name: 'Project CHRONOS', description: 'Polymorphic Threat Geolocation Scanning', progress: 92, status: 'Optimal', leader: 'Sysop Shadow' },
        { id: 'P-4', name: 'Quantum Ledger', description: 'Cross-Border Reserve Volatility Arbitrage', progress: 15, status: 'Idle', leader: 'Analyst Rose' },
    ]);

    const [newProjectName, setNewProjectName] = useState('');
    const [newProjectDesc, setNewProjectDesc] = useState('');

    const handleAddProject = (e) => {
        e.preventDefault();
        if (!newProjectName) return;
        const newProj = {
            id: `P-${projects.length + 1}`,
            name: newProjectName,
            description: newProjectDesc || 'No description provided.',
            progress: Math.floor(Math.random() * 50) + 10,
            status: 'Optimal',
            leader: currentUser,
        };
        setProjects(prev => [...prev, newProj]);
        addNotification(`Project "${newProjectName}" initiated.`, 'success');
        setLogs(prev => [
            { id: Date.now(), time: new Date().toTimeString().split(' ')[0], msg: `INITIATED: ${newProjectName} - Cluster allocations assigned.`, type: 'info' },
            ...prev
        ]);
        setNewProjectName('');
        setNewProjectDesc('');
    };

    const handleOverclockProject = (id) => {
        setProjects(prev => prev.map(p => {
            if (p.id === id) {
                const nextProgress = Math.min(p.progress + 15, 100);
                addNotification(`Overclocked ${p.name}. Progress is now ${nextProgress}%.`, 'success');
                return { ...p, progress: nextProgress, status: nextProgress >= 100 ? 'Completed' : 'Critical' };
            }
            return p;
        }));
    };
    return (
        <div>
            <div className="d-flex flex-column flex-sm-row justify-content-between align-items-start align-items-sm-center gap-3 mb-4">
                <div>
                    <h4 className="text-white h5 mb-1 fw-bold">Active Tactical Project Grid</h4>
                    <p className="text-secondary small mb-0">Deconstruct strategic neural mapping assignments and monitor task completions.</p>
                </div>
            </div>

            <div className="row g-4">
                {/* Add project panel */}
                <div className="col-12 col-md-4">
                    <div className="glass-card p-4 h-100">
                        <h5 className="text-white h6 mb-3 fw-bold d-flex align-items-center gap-2">
                            Initiate Cyber Project
                            <span className="material-symbols-outlined text-neon-cyan fs-5">add_circle</span>
                        </h5>
                        <form onSubmit={handleAddProject}>
                            <div className="mb-3">
                                <label className="form-label text-secondary small font-mono">Project Identifier Name</label>
                                <input
                                    type="text"
                                    value={newProjectName}
                                    onChange={(e) => setNewProjectName(e.target.value)}
                                    className="form-control bg-black border-secondary border-opacity-35 text-white rounded-3 small py-2"
                                    placeholder="e.g. Project VULCAN"
                                    style={{ fontSize: '0.85rem' }}
                                />
                            </div>
                            <div className="mb-4">
                                <label className="form-label text-secondary small font-mono">Dossier Objectives</label>
                                <textarea
                                    value={newProjectDesc}
                                    onChange={(e) => setNewProjectDesc(e.target.value)}
                                    className="form-control bg-black border-secondary border-opacity-35 text-white rounded-3 small py-2"
                                    rows="4"
                                    placeholder="Outline specific node mapping details..."
                                    style={{ fontSize: '0.85rem' }}
                                ></textarea>
                            </div>
                            <Button type="submit" variant="primary" className="w-100 py-2.5 border-0 rounded-3 small fw-bold shadow-lg">
                                Publish Project Directives
                            </Button>
                        </form>
                    </div>
                </div>

                {/* Projects grid */}
                <div className="col-12 col-md-8">
                    <div className="row g-3">
                        {projects.map((proj) => (
                            <div key={proj.id} className="col-12 col-md-6">
                                <div className="glass-card p-3.5 h-100 d-flex flex-column justify-content-between">
                                    <div>
                                        <div className="d-flex justify-content-between align-items-start mb-2">
                                            <div>
                                                <h5 className="text-white h6 mb-0.5 fw-bold font-sans">{proj.name}</h5>
                                                <span className="text-secondary small font-mono" style={{ fontSize: '0.7rem' }}>ID: {proj.id}</span>
                                            </div>
                                            <span className={`badge ${proj.status === 'Critical' ? 'badge-neon-rose' : proj.status === 'High' ? 'bg-warning text-dark' : 'badge-neon-emerald'
                                                } px-2 py-0.5 small`}>
                                                {proj.status}
                                            </span>
                                        </div>
                                        <p className="text-secondary small leading-relaxed mb-3" style={{ fontSize: '0.8rem', minHeight: '38px' }}>
                                            {proj.description}
                                        </p>
                                    </div>

                                    <div>
                                        <div className="mb-3">
                                            <div className="d-flex justify-content-between align-items-center mb-1">
                                                <span className="text-secondary small font-semibold" style={{ fontSize: '0.7rem' }}>GRID INTEGRATION WORK</span>
                                                <span className="text-neon-cyan font-mono small" style={{ fontSize: '0.7rem' }}>{proj.progress}%</span>
                                            </div>
                                            <div className="progress bg-black bg-opacity-50" style={{ height: '5px' }}>
                                                <div
                                                    className="progress-bar bg-cyan progress-glow-cyan"
                                                    style={{ width: `${proj.progress}%` }}
                                                ></div>
                                            </div>
                                        </div>

                                        <div className="d-flex justify-content-between align-items-center border-top border-secondary border-opacity-10 pt-2.5">
                                            <span className="text-secondary font-mono" style={{ fontSize: '0.65rem' }}>LEAD: {proj.leader}</span>
                                            <button
                                                onClick={() => handleOverclockProject(proj.id)}
                                                className="btn btn-sm btn-outline-cyan px-2 py-0.5 font-mono text-neon-cyan d-flex align-items-center gap-1"
                                                style={{ fontSize: '0.7rem' }}
                                                disabled={proj.progress >= 100}
                                            >
                                                <span className="material-symbols-outlined" style={{ fontSize: '0.8rem' }}>bolt</span>
                                                Overclock Node
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Project