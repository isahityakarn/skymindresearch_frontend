import React from 'react'

const Vendor = () => {
    // ==========================================
    // TAB 6: VENDOR DATA & ACTIONS
    // ==========================================
    const [vendors, setVendors] = useState([
        { id: 'V-1', name: 'Orbital Data Corp', pipeline: '4.8 GB/s', rating: '98.4%', status: 'Linked' },
        { id: 'V-2', name: 'Quantum Finance Labs', pipeline: '12.2 GB/s', rating: '99.1%', status: 'Linked' },
        { id: 'V-3', name: 'Zero-Trust Infrastructure', pipeline: '0.0 GB/s', rating: '95.6%', status: 'Quarantined' },
        { id: 'V-4', name: 'Logistics Cascade Group', pipeline: '1.2 GB/s', rating: '97.8%', status: 'Offline' },
    ]);

    const handleToggleVendor = (id) => {
        setVendors(prev => prev.map(v => {
            if (v.id === id) {
                const newStatus = v.status === 'Linked' ? 'Quarantined' : 'Linked';
                const newPipeline = newStatus === 'Linked' ? `${(Math.random() * 10 + 2).toFixed(1)} GB/s` : '0.0 GB/s';
                addNotification(`Vendor ${v.name} status changed to ${newStatus}.`, newStatus === 'Linked' ? 'success' : 'warning');
                setLogs(prevLog => [
                    { id: Date.now(), time: new Date().toTimeString().split(' ')[0], msg: `VENDOR PIPELINE: ${v.name} is now [${newStatus.toUpperCase()}].`, type: newStatus === 'Linked' ? 'success' : 'warning' },
                    ...prevLog
                ]);
                return { ...v, status: newStatus, pipeline: newPipeline };
            }
            return v;
        }));
    };
    return (
        <div className="glass-card p-4">
            <div className="mb-4">
                <h4 className="text-white h5 mb-1 fw-bold">Decentralized Vendor Pipeline Directory</h4>
                <p className="text-secondary small mb-0">Deconstruct authorized system integration vendors. Quarantine pipelines instantly to prevent cross-border zero-day hacks.</p>
            </div>

            <div className="table-responsive">
                <table className="table table-dark table-hover align-middle border-secondary border-opacity-15 mb-0">
                    <thead>
                        <tr className="text-secondary small text-uppercase font-mono" style={{ fontSize: '0.75rem' }}>
                            <th className="border-secondary border-opacity-10 py-3">Vendor ID</th>
                            <th className="border-secondary border-opacity-10 py-3">Vendor Facility Name</th>
                            <th className="border-secondary border-opacity-10 py-3">Active Data Flow</th>
                            <th className="border-secondary border-opacity-10 py-3">Performance Audit</th>
                            <th className="border-secondary border-opacity-10 py-3">Pipeline Status</th>
                            <th className="border-secondary border-opacity-10 py-3 text-end">Action Deck</th>
                        </tr>
                    </thead>
                    <tbody>
                        {vendors.map((v) => (
                            <tr key={v.id} className="border-secondary border-opacity-10">
                                <td className="font-mono text-neon-cyan py-3 small" style={{ fontSize: '0.8rem' }}>{v.id}</td>
                                <td className="text-white small fw-bold" style={{ fontSize: '0.85rem' }}>{v.name}</td>
                                <td className="text-light font-mono small" style={{ fontSize: '0.8rem' }}>{v.pipeline}</td>
                                <td className="text-neon-emerald font-mono small" style={{ fontSize: '0.8rem' }}>{v.rating}</td>
                                <td>
                                    <span className={`badge ${v.status === 'Linked' ? 'badge-neon-emerald' : v.status === 'Quarantined' ? 'badge-neon-rose' : 'bg-secondary bg-opacity-25 text-white'
                                        } px-2.5 py-1 small rounded-3`}>
                                        {v.status}
                                    </span>
                                </td>
                                <td className="text-end">
                                    <button
                                        onClick={() => handleToggleVendor(v.id)}
                                        className={`btn btn-sm ${v.status === 'Linked' ? 'btn-outline-danger' : 'btn-outline-cyan'} px-2.5 py-0.5 font-mono`}
                                        style={{ fontSize: '0.75rem' }}
                                    >
                                        {v.status === 'Linked' ? 'Engage Quarantine' : 'Link Pipeline'}
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default Vendor