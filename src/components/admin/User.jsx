import React from 'react'

const User = () => {

    // ==========================================
    // TAB 5: USER DATA & ACTIONS
    // ==========================================
    const [users, setUsers] = useState([
        { id: 'U-102', name: 'Sysop Shadow', role: 'Superuser', ip: '192.168.4.12', status: 'Active', securityLevel: 'Level 5' },
        { id: 'U-405', name: 'Dr. Evelyn Foster', role: 'Researcher', ip: '192.168.4.89', status: 'Active', securityLevel: 'Level 4' },
        { id: 'U-819', name: 'Agent Vance', role: 'SecOps Analyst', ip: '192.168.4.142', status: 'On Mission', securityLevel: 'Level 4' },
        { id: 'U-032', name: 'Analyst Rose', role: 'Signal Operator', ip: '10.0.8.21', status: 'Offline', securityLevel: 'Level 3' },
    ]);

    const handleToggleUserStatus = (id) => {
        setUsers(prev => prev.map(u => {
            if (u.id === id) {
                const newStatus = u.status === 'Active' ? 'Deactivated' : 'Active';
                addNotification(`User ${u.name} status updated to: ${newStatus}`, newStatus === 'Active' ? 'success' : 'warning');
                return { ...u, status: newStatus };
            }
            return u;
        }));
    };

    return (
        <div className="glass-card p-4">
            <div className="mb-4">
                <h4 className="text-white h5 mb-1 fw-bold">Operator Telemetry Registry</h4>
                <p className="text-secondary small mb-0">Deconstruct authorized system operator roles and monitor network location metrics.</p>
            </div>

            <div className="table-responsive">
                <table className="table table-dark table-hover align-middle border-secondary border-opacity-15 mb-0">
                    <thead>
                        <tr className="text-secondary small text-uppercase font-mono" style={{ fontSize: '0.75rem' }}>
                            <th className="border-secondary border-opacity-10 py-3">Operator ID</th>
                            <th className="border-secondary border-opacity-10 py-3">Name</th>
                            <th className="border-secondary border-opacity-10 py-3">Assigned Role</th>
                            <th className="border-secondary border-opacity-10 py-3">Active Terminal IP</th>
                            <th className="border-secondary border-opacity-10 py-3">Access Clearance</th>
                            <th className="border-secondary border-opacity-10 py-3">System status</th>
                            <th className="border-secondary border-opacity-10 py-3 text-end">Action Gate</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((u) => (
                            <tr key={u.id} className="border-secondary border-opacity-10">
                                <td className="font-mono text-neon-cyan py-3 small" style={{ fontSize: '0.8rem' }}>{u.id}</td>
                                <td>
                                    <div className="d-flex align-items-center gap-2">
                                        <div
                                            className="rounded-circle bg-primary bg-opacity-25 border border-primary d-flex align-items-center justify-content-center text-white fw-bold"
                                            style={{ width: '32px', height: '32px', fontSize: '0.75rem' }}
                                        >
                                            {u.name.split(' ').map(p => p[0]).join('')}
                                        </div>
                                        <span className="text-white small fw-bold" style={{ fontSize: '0.85rem' }}>{u.name}</span>
                                    </div>
                                </td>
                                <td>
                                    <span className={`badge ${u.role === 'Superuser' ? 'badge-neon-rose' : u.role === 'Researcher' ? 'badge-neon-cyan' : 'bg-dark border border-secondary text-secondary'
                                        } px-2 py-0.5`}>
                                        {u.role}
                                    </span>
                                </td>
                                <td className="text-secondary font-mono small" style={{ fontSize: '0.75rem' }}>{u.ip}</td>
                                <td className="text-light small font-mono" style={{ fontSize: '0.8rem' }}>{u.securityLevel}</td>
                                <td>
                                    <div className="d-flex align-items-center gap-1.5">
                                        <span className={`position-relative d-inline-flex`} style={{ width: '8px', height: '8px' }}>
                                            <span className={`animate-pulse-cyber absolute inline-flex h-full w-full rounded-full opacity-75 ${u.status === 'Active' ? 'bg-success' : u.status === 'On Mission' ? 'bg-cyan' : 'bg-secondary'
                                                }`}></span>
                                            <span className={`relative inline-flex rounded-full h-2 w-2 ${u.status === 'Active' ? 'bg-success' : u.status === 'On Mission' ? 'bg-cyan' : 'bg-secondary'
                                                }`}></span>
                                        </span>
                                        <span className="small text-secondary" style={{ fontSize: '0.8rem' }}>{u.status}</span>
                                    </div>
                                </td>
                                <td className="text-end">
                                    <button
                                        onClick={() => handleToggleUserStatus(u.id)}
                                        className={`btn btn-sm ${u.status === 'Active' ? 'btn-outline-danger' : 'btn-outline-success'} px-2.5 py-0.5`}
                                        style={{ fontSize: '0.75rem' }}
                                    >
                                        {u.status === 'Active' ? 'Deactivate' : 'Activate'}
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

export default User