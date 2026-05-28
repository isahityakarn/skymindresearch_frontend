import React from 'react'

const SurveyRecord = () => {
    // ==========================================
    // TAB 2: SURVEY RECORD DATA & ACTIONS
    // ==========================================
    const [surveySearch, setSurveySearch] = useState('');
    const [surveyFilter, setSurveyFilter] = useState('ALL');
    const [surveyRecords, setSurveyRecords] = useState([
        { id: 'SR-9204', title: 'Cryptographic Signal Assessment', respondent: 'Dr. Evelyn Foster', date: '2026-05-24', completion: 100, status: 'Approved' },
        { id: 'SR-8103', title: 'Decentralized Node Audit', respondent: 'Aether Team', date: '2026-05-25', completion: 85, status: 'Under Review' },
        { id: 'SR-4029', title: 'Quantum Firewall Volatility', respondent: 'SecOps APAC', date: '2026-05-26', completion: 40, status: 'Flagged' },
        { id: 'SR-7731', title: 'LEO Telemetry Constellation Poll', respondent: 'Sovereign Lab', date: '2026-05-26', completion: 100, status: 'Approved' },
        { id: 'SR-5011', title: 'Cross-Border Exchange Assessment', respondent: 'Quant Modeling Team', date: '2026-05-23', completion: 92, status: 'Under Review' },
    ]);

    const handleUpdateSurveyStatus = (id, newStatus) => {
        setSurveyRecords(prev => prev.map(s => s.id === id ? { ...s, status: newStatus } : s));
        addNotification(`Survey [${id}] status updated to: ${newStatus}`, newStatus === 'Approved' ? 'success' : newStatus === 'Flagged' ? 'warning' : 'info');
    };

    return (
        <div className="glass-card p-4">
            <div className="d-flex flex-column flex-md-row justify-content-between align-items-start align-items-md-center gap-3 mb-4">
                <div>
                    <h4 className="text-white h5 mb-1 fw-bold">Telemetry Survey Archives</h4>
                    <p className="text-secondary small mb-0">Query and moderate custom research surveys submitted by satellite nodes and researchers.</p>
                </div>

                <div className="d-flex flex-wrap align-items-center gap-2 w-100 w-md-auto">
                    <input
                        type="text"
                        placeholder="Filter by title..."
                        value={surveySearch}
                        onChange={(e) => setSurveySearch(e.target.value)}
                        className="form-control bg-black border-secondary border-opacity-30 text-white rounded-3 small py-1.5 px-3"
                        style={{ maxWidth: '200px', fontSize: '0.85rem' }}
                    />

                    <select
                        value={surveyFilter}
                        onChange={(e) => setSurveyFilter(e.target.value)}
                        className="form-select bg-black border-secondary border-opacity-30 text-white rounded-3 small py-1.5"
                        style={{ width: '130px', fontSize: '0.85rem' }}
                    >
                        <option value="ALL">All Status</option>
                        <option value="Approved">Approved</option>
                        <option value="Under Review">Under Review</option>
                        <option value="Flagged">Flagged</option>
                    </select>
                </div>
            </div>

            <div className="table-responsive">
                <table className="table table-dark table-hover align-middle border-secondary border-opacity-15 mb-0">
                    <thead>
                        <tr className="text-secondary small text-uppercase font-mono" style={{ fontSize: '0.75rem' }}>
                            <th className="border-secondary border-opacity-10 py-3">Survey ID</th>
                            <th className="border-secondary border-opacity-10 py-3">Survey Brief Title</th>
                            <th className="border-secondary border-opacity-10 py-3">Submitting Operator</th>
                            <th className="border-secondary border-opacity-10 py-3">Timestamp</th>
                            <th className="border-secondary border-opacity-10 py-3">Completeness</th>
                            <th className="border-secondary border-opacity-10 py-3">Status</th>
                            <th className="border-secondary border-opacity-10 py-3 text-end">Action Deck</th>
                        </tr>
                    </thead>
                    <tbody>
                        {surveyRecords
                            .filter((s) => {
                                const matchesSearch = s.title.toLowerCase().includes(surveySearch.toLowerCase());
                                const matchesFilter = surveyFilter === 'ALL' || s.status === surveyFilter;
                                return matchesSearch && matchesFilter;
                            })
                            .map((s) => (
                                <tr key={s.id} className="border-secondary border-opacity-10">
                                    <td className="font-mono text-neon-cyan py-3 small" style={{ fontSize: '0.8rem' }}>{s.id}</td>
                                    <td className="text-white small fw-semibold" style={{ fontSize: '0.85rem' }}>{s.title}</td>
                                    <td className="text-light small" style={{ fontSize: '0.85rem' }}>{s.respondent}</td>
                                    <td className="text-secondary font-mono small" style={{ fontSize: '0.75rem' }}>{s.date}</td>
                                    <td style={{ width: '130px' }}>
                                        <div className="d-flex align-items-center gap-2">
                                            <span className="small text-white font-mono" style={{ fontSize: '0.75rem' }}>{s.completion}%</span>
                                            <div className="progress bg-black flex-grow-1" style={{ height: '5px' }}>
                                                <div
                                                    className={`progress-bar ${s.completion === 100 ? 'bg-success' : s.completion > 60 ? 'bg-cyan progress-glow-cyan' : 'bg-danger'}`}
                                                    style={{ width: `${s.completion}%` }}
                                                ></div>
                                            </div>
                                        </div>
                                    </td>
                                    <td>
                                        <span className={`badge ${s.status === 'Approved' ? 'badge-neon-emerald' : s.status === 'Flagged' ? 'badge-neon-rose' : 'bg-secondary bg-opacity-25 text-white'
                                            } px-2.5 py-1 small rounded-3`}>
                                            {s.status}
                                        </span>
                                    </td>
                                    <td className="text-end">
                                        <div className="d-flex justify-content-end gap-1.5">
                                            <button
                                                onClick={() => handleUpdateSurveyStatus(s.id, 'Approved')}
                                                className="btn btn-sm btn-outline-success px-2 py-0.5"
                                                style={{ fontSize: '0.75rem' }}
                                                title="Approve"
                                            >
                                                Approve
                                            </button>
                                            <button
                                                onClick={() => handleUpdateSurveyStatus(s.id, 'Flagged')}
                                                className="btn btn-sm btn-outline-danger px-2 py-0.5"
                                                style={{ fontSize: '0.75rem' }}
                                                title="Flag"
                                            >
                                                Flag
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default SurveyRecord