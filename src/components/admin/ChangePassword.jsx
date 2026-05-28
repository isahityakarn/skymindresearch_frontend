import React from 'react'

const ChangePassword = () => {
    // ==========================================
    // TAB 3: CHANGE PASSWORD DATA & ACTIONS
    // ==========================================
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [isRollingKeys, setIsRollingKeys] = useState(false);
    const [keyRollProgress, setKeyRollProgress] = useState(0);

    const getPasswordStrength = () => {
        if (!newPassword) return { label: 'Empty', color: 'text-secondary', width: '0%', class: 'bg-secondary' };
        let score = 0;
        if (newPassword.length >= 8) score += 1;
        if (/[A-Z]/.test(newPassword)) score += 1;
        if (/[0-9]/.test(newPassword)) score += 1;
        if (/[^A-Za-z0-9]/.test(newPassword)) score += 1;

        switch (score) {
            case 1: return { label: 'Weak', color: 'text-neon-rose', width: '25%', class: 'progress-glow-rose bg-danger' };
            case 2: return { label: 'Fair', color: 'text-warning', width: '50%', class: 'bg-warning' };
            case 3: return { label: 'Strong', color: 'text-neon-cyan', width: '75%', class: 'progress-glow-cyan bg-cyan' };
            case 4: return { label: 'Maximum Security', color: 'text-neon-emerald', width: '100%', class: 'bg-success' };
            default: return { label: 'Weak', color: 'text-neon-rose', width: '10%', class: 'bg-danger' };
        }
    };

    const handlePasswordSubmit = (e) => {
        e.preventDefault();
        if (!currentPassword || !newPassword || !confirmPassword) {
            addNotification('All security parameters are mandatory.', 'warning');
            return;
        }
        if (newPassword !== confirmPassword) {
            addNotification('New password parameters do not match.', 'warning');
            return;
        }
        addNotification('Password cryptographically updated.', 'success');
        setLogs(prev => [
            { id: Date.now(), time: new Date().toTimeString().split(' ')[0], msg: 'Admin user password reset successfully. Keys cycled.', type: 'success' },
            ...prev
        ]);
        setCurrentPassword('');
        setNewPassword('');
        setConfirmPassword('');
    };

    const handleRollQuantumKeys = () => {
        if (isRollingKeys) return;
        setIsRollingKeys(true);
        setKeyRollProgress(0);
        addNotification('Rolling database quantum cryptographic salt vectors...', 'info');

        const interval = setInterval(() => {
            setKeyRollProgress(p => {
                if (p >= 100) {
                    clearInterval(interval);
                    setIsRollingKeys(false);
                    addNotification('Quantum encryption salts rolled successfully.', 'success');
                    setLogs(prev => [
                        { id: Date.now(), time: new Date().toTimeString().split(' ')[0], msg: 'SUCCESS: Quantum salt rollover completed across APAC-04, EU-02 and US-01 nodes.', type: 'success' },
                        ...prev
                    ]);
                    return 100;
                }
                return p + 25;
            });
        }, 400);
    };
    return (
        <div className="row g-4">
            <div className="col-12 col-md-6">
                <div className="glass-card p-4">
                    <h4 className="text-white h5 mb-3 fw-bold d-flex align-items-center gap-2">
                        Security Credentials Deck
                        <span className="material-symbols-outlined text-neon-rose fs-5">lock</span>
                    </h4>
                    <p className="text-secondary small mb-4">Cycle cryptographic password access variables. All keys are hashed via low-level zero-knowledge proof protocols.</p>

                    <form onSubmit={handlePasswordSubmit}>
                        <div className="mb-3">
                            <label className="form-label text-secondary small font-mono">Current Sysop Password</label>
                            <input
                                type="password"
                                value={currentPassword}
                                onChange={(e) => setCurrentPassword(e.target.value)}
                                className="form-control bg-black border-secondary border-opacity-35 text-white rounded-3 small py-2"
                                placeholder="••••••••••••"
                                style={{ fontSize: '0.85rem' }}
                            />
                        </div>

                        <div className="mb-3">
                            <label className="form-label text-secondary small font-mono">New Sysop Password</label>
                            <input
                                type="password"
                                value={newPassword}
                                onChange={(e) => setNewPassword(e.target.value)}
                                className="form-control bg-black border-secondary border-opacity-35 text-white rounded-3 small py-2"
                                placeholder="••••••••••••"
                                style={{ fontSize: '0.85rem' }}
                            />

                            {/* Password strength visual readout */}
                            {newPassword && (
                                <div className="mt-2.5">
                                    <div className="d-flex justify-content-between align-items-center mb-1">
                                        <span className="text-secondary small font-mono" style={{ fontSize: '0.7rem' }}>Complexity Index:</span>
                                        <span className={`small fw-bold font-mono ${getPasswordStrength().color}`} style={{ fontSize: '0.7rem' }}>
                                            {getPasswordStrength().label}
                                        </span>
                                    </div>
                                    <div className="progress bg-black" style={{ height: '4px' }}>
                                        <div
                                            className={`progress-bar ${getPasswordStrength().class}`}
                                            style={{ width: getPasswordStrength().width }}
                                        ></div>
                                    </div>
                                </div>
                            )}
                        </div>

                        <div className="mb-4">
                            <label className="form-label text-secondary small font-mono">Confirm New Password</label>
                            <input
                                type="password"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                className="form-control bg-black border-secondary border-opacity-35 text-white rounded-3 small py-2"
                                placeholder="••••••••••••"
                                style={{ fontSize: '0.85rem' }}
                            />
                        </div>

                        <Button type="submit" variant="primary" className="w-100 py-2.5 border-0 rounded-3 small fw-semibold shadow-lg">
                            Lock Secure Credentials
                        </Button>
                    </form>
                </div>
            </div>

            <div className="col-12 col-md-6">
                <div className="glass-card p-4">
                    <h4 className="text-white h5 mb-3 fw-bold d-flex align-items-center gap-2">
                        Quantum Cryptography Key Rollover
                        <span className="material-symbols-outlined text-neon-cyan fs-5">vpn_key</span>
                    </h4>
                    <p className="text-secondary small mb-4">Roll database encryption salt vectors. This will force re-indexing of all decentralized storage grids to secure against post-quantum decryption threats.</p>

                    <div className="p-3 bg-black bg-opacity-50 rounded-4 border border-secondary border-opacity-15 mb-4">
                        <span className="text-neon-cyan font-mono small d-block mb-1">// CRYPTOGRAPHIC ROOT: SECURITY PROTOCOL</span>
                        <span className="text-secondary d-block mb-2" style={{ fontSize: '0.75rem' }}>Active nodes APAC-04 and ZEPHYR-02 are synced on SHA-512 salting cycles.</span>
                        <div className="d-flex align-items-center justify-content-between text-secondary font-mono" style={{ fontSize: '0.7rem' }}>
                            <span>ROOT CERTIFICATE: SHADOW-CA</span>
                            <span className="text-neon-emerald">STATUS: ACTIVE</span>
                        </div>
                    </div>

                    {isRollingKeys ? (
                        <div className="py-2.5">
                            <div className="progress mb-2 bg-dark" style={{ height: '6px' }}>
                                <div className="progress-bar progress-bar-striped progress-bar-animated progress-glow-cyan" style={{ width: `${keyRollProgress}%` }}></div>
                            </div>
                            <span className="text-neon-cyan font-mono small d-block text-center" style={{ fontSize: '0.75rem' }}>RE-SALTING DISTRIBUTED VOLUMES: {keyRollProgress}%</span>
                        </div>
                    ) : (
                        <Button variant="secondary" onClick={handleRollQuantumKeys} className="w-100 py-2.5 rounded-3 btn btn-outline-light small fw-bold">
                            Force Roll Encryption Keys
                        </Button>
                    )}
                </div>
            </div>
        </div>
    )
}

export default ChangePassword