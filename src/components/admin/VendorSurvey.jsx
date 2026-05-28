import React from 'react'

const VendorSurvey = () => {
    // ==========================================
    // TAB 7: VENDOR SURVEY DATA & ACTIONS
    // ==========================================
    const [vendorSurveys, setVendorSurveys] = useState([
        { id: 'VS-01', vendor: 'Orbital Data Corp', title: 'Q2 Sat-Com Spectrum Audit', responseRate: 100, score: '94/100' },
        { id: 'VS-02', vendor: 'Quantum Finance Labs', title: 'Decentralized Vault Isolation Survey', responseRate: 80, score: '99/100' },
        { id: 'VS-03', vendor: 'Zero-Trust Infrastructure', title: 'Hardware Defrag Security Integrity', responseRate: 20, score: 'Pending' },
    ]);

    const [deployVendor, setDeployVendor] = useState('V-1');
    const [deploySurveyTitle, setDeploySurveyTitle] = useState('');

    const handleDeploySurvey = (e) => {
        e.preventDefault();
        if (!deploySurveyTitle) return;
        const vendorName = vendors.find(v => v.id === deployVendor)?.name || 'External Vendor';
        const newSurvey = {
            id: `VS-0${vendorSurveys.length + 1}`,
            vendor: vendorName,
            title: deploySurveyTitle,
            responseRate: 0,
            score: 'Pending',
        };
        setVendorSurveys(prev => [...prev, newSurvey]);
        addNotification(`Security Survey deployed to ${vendorName}.`, 'success');
        setLogs(prev => [
            { id: Date.now(), time: new Date().toTimeString().split(' ')[0], msg: `SURVEY DEPLOYED: Deployed Security Briefing to ${vendorName}.`, type: 'info' },
            ...prev
        ]);
        setDeploySurveyTitle('');
    };
    return (
        <div className="row g-4">
            <div className="col-12 col-md-5">
                <div className="glass-card p-4 h-100">
                    <h5 className="text-white h6 mb-3 fw-bold d-flex align-items-center gap-2">
                        Deploy Security Questionnaires
                        <span className="material-symbols-outlined text-neon-cyan fs-5">forward_to_inbox</span>
                    </h5>
                    <p className="text-secondary small mb-4">Broadcast custom security metrics to active vendor data grids. Vendors are forced to respond within a 12-hour decrypt window.</p>

                    <form onSubmit={handleDeploySurvey}>
                        <div className="mb-3">
                            <label className="form-label text-secondary small font-mono">Select Target Vendor</label>
                            <select
                                value={deployVendor}
                                onChange={(e) => setDeployVendor(e.target.value)}
                                className="form-select bg-black border-secondary border-opacity-35 text-white rounded-3 small py-2"
                                style={{ fontSize: '0.85rem' }}
                            >
                                {vendors.map(v => (
                                    <option key={v.id} value={v.id}>{v.name}</option>
                                ))}
                            </select>
                        </div>

                        <div className="mb-4">
                            <label className="form-label text-secondary small font-mono">Survey Dossier Title</label>
                            <input
                                type="text"
                                value={deploySurveyTitle}
                                onChange={(e) => setDeploySurveyTitle(e.target.value)}
                                className="form-control bg-black border-secondary border-opacity-35 text-white rounded-3 small py-2"
                                placeholder="e.g. Isolation Vault Security Audit"
                                style={{ fontSize: '0.85rem' }}
                            />
                        </div>

                        <Button type="submit" variant="primary" className="w-100 py-2.5 border-0 rounded-3 small fw-bold shadow-lg">
                            Deploy Questionnaire Feed
                        </Button>
                    </form>
                </div>
            </div>

            <div className="col-12 col-md-7">
                <div className="glass-card p-4 h-100">
                    <div className="d-flex justify-content-between align-items-center mb-4">
                        <div>
                            <h4 className="text-white h5 mb-1 fw-bold">Active Survey Audits</h4>
                            <p className="text-secondary small mb-0">Deconstruct active questionnaire metrics returned by third-party suppliers.</p>
                        </div>
                    </div>

                    <div className="table-responsive mb-4">
                        <table className="table table-dark table-hover align-middle border-secondary border-opacity-15 mb-0">
                            <thead>
                                <tr className="text-secondary small text-uppercase font-mono" style={{ fontSize: '0.75rem' }}>
                                    <th className="border-secondary border-opacity-10 py-2">Survey ID</th>
                                    <th className="border-secondary border-opacity-10 py-2">Target Vendor</th>
                                    <th className="border-secondary border-opacity-10 py-2">Questionnaire Topic</th>
                                    <th className="border-secondary border-opacity-10 py-2">Response rate</th>
                                    <th className="border-secondary border-opacity-10 py-2 text-end">Telemetry Score</th>
                                </tr>
                            </thead>
                            <tbody>
                                {vendorSurveys.map((vs) => (
                                    <tr key={vs.id} className="border-secondary border-opacity-10">
                                        <td className="font-mono text-neon-cyan py-2 small" style={{ fontSize: '0.75rem' }}>{vs.id}</td>
                                        <td className="text-white small fw-bold" style={{ fontSize: '0.8rem' }}>{vs.vendor}</td>
                                        <td className="text-light small" style={{ fontSize: '0.8rem' }}>{vs.title}</td>
                                        <td>
                                            <div className="d-flex align-items-center gap-2">
                                                <span className="small text-secondary font-mono" style={{ fontSize: '0.7rem' }}>{vs.responseRate}%</span>
                                                <div className="progress bg-black" style={{ width: '60px', height: '4px' }}>
                                                    <div
                                                        className={`progress-bar ${vs.responseRate === 100 ? 'bg-success' : 'bg-warning'}`}
                                                        style={{ width: `${vs.responseRate}%` }}
                                                    ></div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="text-end font-mono text-neon-emerald small" style={{ fontSize: '0.8rem' }}>
                                            {vs.score}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {/* Dynamic Audit Completion Visual Progress Grid */}
                    <div className="p-3 bg-black bg-opacity-50 rounded-4 border border-secondary border-opacity-15">
                        <span className="text-neon-cyan font-mono small d-block mb-1">// SECURE SYSTEM FEED: COMPLIANCE RATINGS</span>
                        <span className="text-secondary small d-block mb-3" style={{ fontSize: '0.75rem' }}>Decentralized Vendor Compliance sits at a cumulative 92.4% integrity score.</span>
                        <div className="progress bg-dark" style={{ height: '8px' }}>
                            <div className="progress-bar progress-bar-striped progress-glow-cyan bg-cyan" style={{ width: '92.4%' }}></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default VendorSurvey