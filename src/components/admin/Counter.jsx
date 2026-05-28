import React, { useState, useEffect } from 'react';
// import { addNotification } from '../../utils/notifications';

const Counter = () => {
    // ==========================================
    // TAB 1: OVERVIEW DASHBOARD DATA & ACTIONS
    // ==========================================
    const [databaseOptimizing, setDatabaseOptimizing] = useState(false);
    const [dbProgress, setDbProgress] = useState(0);
    const [activeNodeDetail, setActiveNodeDetail] = useState(null);

    const [nodes, setNodes] = useState([
        { name: 'AETHER-01', region: 'US-East', load: 45, status: 'Optimal', temp: 38 },
        { name: 'ZEPHYR-02', region: 'EU-West', load: 82, status: 'High Load', temp: 58 },
        { name: 'TITAN-03', region: 'APAC-South', load: 21, status: 'Idle', temp: 32 },
        { name: 'APEX-04', region: 'DECENTRALIZED', load: 60, status: 'Active Sync', temp: 44 }
    ]);

    const neuralNodes = [
        { id: 'N1', cx: 80, cy: 120, label: 'Sat-Com Feed', info: 'Live stream of military transponders', color: '#06b6d4' },
        { id: 'N2', cx: 180, cy: 70, label: 'Geo-Spatial Parser', info: 'Mapping port container movements in Singapore', color: '#10b981' },
        { id: 'N3', cx: 280, cy: 150, label: 'Sentiment AI Node', info: 'Analyzing sovereign bond public transcripts', color: '#a855f7' },
        { id: 'N4', cx: 150, cy: 220, label: 'Crypto Decryptor', info: 'Cracking anonymous transaction logs in cluster 3', color: '#f43f5e' },
        { id: 'N5', cx: 350, cy: 90, label: 'Macro Index Engine', info: 'Aggregating cross-border currency reserves', color: '#06b6d4' },
    ];

    const handleDatabaseOptimize = () => {
        if (databaseOptimizing) return;
        setDatabaseOptimizing(true);
        setDbProgress(0);
        addNotification('Initiating admin database indexing and defragmentation...', 'info');

        const interval = setInterval(() => {
            setDbProgress((p) => {
                if (p >= 100) {
                    clearInterval(interval);
                    setDatabaseOptimizing(false);
                    addNotification('All databases compiled & optimized. 12.8GB disk space recovered.', 'success');
                    setLogs(prev => [
                        { id: Date.now(), time: new Date().toTimeString().split(' ')[0], msg: 'Admin DB Optimization complete. Restored 100% indexing speed.', type: 'success' },
                        ...prev
                    ]);
                    return 100;
                }
                return p + 20;
            });
        }, 200);
    };

    const handleAdjustNodeLoad = (idx, newLoad) => {
        setNodes(prev => prev.map((node, i) => {
            if (i === idx) {
                let status = 'Optimal';
                if (newLoad > 80) status = 'Critical Load';
                else if (newLoad > 60) status = 'High Load';
                else if (newLoad < 30) status = 'Idle';
                return {
                    ...node,
                    load: newLoad,
                    temp: Math.floor(30 + (newLoad * 0.4) + Math.random() * 5),
                    status
                };
            }
            return node;
        }));
    };
    return (
        <div className="row g-4">
            {/* Global Live Metrics Strip */}
            <section className="row g-3 px-4 px-md-5 pt-4">
                <div className="col-12 col-md-6 col-xl-3">
                    <div className="glass-card p-3 d-flex align-items-center justify-content-between">
                        <div>
                            <span className="text-secondary small tracking-wider text-uppercase fw-semibold d-block" style={{ fontSize: '0.65rem' }}>AI NODES ONLINE</span>
                            <span className="h3 text-white fw-bold mb-0 text-neon-cyan font-mono">2,482 <span className="fs-6 text-secondary fw-normal">/ 2.5K</span></span>
                        </div>
                        <div className="p-2.5 bg-cyan bg-opacity-10 rounded-3 border border-cyan border-opacity-25 d-flex align-items-center justify-content-center text-neon-cyan">
                            <span className="material-symbols-outlined fs-4">bolt</span>
                        </div>
                    </div>
                </div>

                <div className="col-12 col-md-6 col-xl-3">
                    <div className="glass-card p-3 d-flex align-items-center justify-content-between">
                        <div>
                            <span className="text-secondary small tracking-wider text-uppercase fw-semibold d-block" style={{ fontSize: '0.65rem' }}>SIGNAL INTEGRITY</span>
                            <span className="h3 text-neon-emerald fw-bold mb-0 font-mono">99.98%</span>
                        </div>
                        <div className="p-2.5 bg-emerald bg-opacity-10 rounded-3 border border-emerald border-opacity-25 d-flex align-items-center justify-content-center text-neon-emerald">
                            <span className="material-symbols-outlined fs-4">shield</span>
                        </div>
                    </div>
                </div>

                <div className="col-12 col-md-6 col-xl-3">
                    <div className="glass-card p-3">
                        <div className="d-flex justify-content-between align-items-center mb-1">
                            <span className="text-secondary small tracking-wider text-uppercase fw-semibold" style={{ fontSize: '0.65rem' }}>MEMORY POOL GRID</span>
                            <span className="text-neon-purple small font-mono">68.4%</span>
                        </div>
                        <div className="progress bg-dark bg-opacity-50 border border-secondary border-opacity-20" style={{ height: '6px' }}>
                            <div className="progress-bar progress-glow-purple" role="progressbar" style={{ width: '68.4%' }}></div>
                        </div>
                    </div>
                </div>

                <div className="col-12 col-md-6 col-xl-3">
                    <div className="glass-card p-3 d-flex align-items-center justify-content-between">
                        <div>
                            <span className="text-secondary small tracking-wider text-uppercase fw-semibold d-block" style={{ fontSize: '0.65rem' }}>ACTIVE ALERTS</span>
                            <span className="h3 text-white fw-bold mb-0 text-neon-rose font-mono">14 <span className="fs-6 text-secondary fw-normal">Global</span></span>
                        </div>
                        <div className="p-2.5 bg-danger bg-opacity-10 rounded-3 border border-danger border-opacity-25 d-flex align-items-center justify-content-center text-neon-rose animate-pulse-cyber">
                            <span className="material-symbols-outlined fs-4">warning</span>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Counter;