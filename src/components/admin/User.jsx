import { useState, useEffect } from 'react';
import { getAllUsers, changePassword } from '../../services/users';

const User = () => {

    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    // Change Password Modal state
    const [showPasswordModal, setShowPasswordModal] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null);
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showNewPw, setShowNewPw] = useState(false);
    const [showConfirmPw, setShowConfirmPw] = useState(false);
    const [pwLoading, setPwLoading] = useState(false);
    const [pwError, setPwError] = useState('');
    const [pwSuccess, setPwSuccess] = useState('');

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        setLoading(true);
        setError(null);
        try {
            const response = await getAllUsers();
            setUsers(response.users || []);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const openPasswordModal = (user) => {
        setSelectedUser(user);
        setNewPassword('');
        setConfirmPassword('');
        setPwError('');
        setPwSuccess('');
        setShowNewPw(false);
        setShowConfirmPw(false);
        setShowPasswordModal(true);
    };

    const closePasswordModal = () => {
        setShowPasswordModal(false);
        setSelectedUser(null);
    };

    const handleChangePassword = async (e) => {
        e.preventDefault();
        setPwError('');
        setPwSuccess('');

        if (newPassword.length < 6) {
            setPwError('Password must be at least 6 characters.');
            return;
        }
        if (newPassword !== confirmPassword) {
            setPwError('Passwords do not match.');
            return;
        }

        setPwLoading(true);
        try {
            const response = await changePassword(selectedUser.id, newPassword);
            setPwSuccess(response.message || 'Password updated successfully!');
            setNewPassword('');
            setConfirmPassword('');
        } catch (err) {
            setPwError(err?.response?.data?.message || err.message || 'Failed to change password.');
        } finally {
            setPwLoading(false);
        }
    };

    if (loading) return <div className="text-center py-5"><div className="spinner-border text-light" /></div>;
    if (error) return <div className="alert alert-danger">{error}</div>;

    return (
        <div>
            <div className="glass-card p-4">
                <div className="mb-4">
                    <h4 className="text-white h5 mb-1 fw-bold">Operator Telemetry Registry</h4>
                    <p className="text-secondary small mb-0">Manage authorized system operators, roles, and access credentials.</p>
                </div>

                <div className="table-responsive">
                    <table className="table table-dark table-hover align-middle border-secondary border-opacity-15 mb-0">
                        <thead>
                            <tr className="text-secondary small text-uppercase font-mono" style={{ fontSize: '0.75rem' }}>
                                <th className="border-secondary border-opacity-10 py-3">ID</th>
                                <th className="border-secondary border-opacity-10 py-3">Name</th>
                                <th className="border-secondary border-opacity-10 py-3">Role</th>
                                <th className="border-secondary border-opacity-10 py-3">Email</th>
                                <th className="border-secondary border-opacity-10 py-3">Phone</th>
                                <th className="border-secondary border-opacity-10 py-3">Status</th>
                                <th className="border-secondary border-opacity-10 py-3 text-end">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.length === 0 ? (
                                <tr>
                                    <td colSpan="7" className="text-center text-secondary py-4">No users found.</td>
                                </tr>
                            ) : (
                                users.map((u) => (
                                    <tr key={u.id} className="border-secondary border-opacity-10">
                                        <td className="font-mono text-neon-cyan py-3 small" style={{ fontSize: '0.8rem' }}>{u.id}</td>
                                        <td>
                                            <div className="d-flex align-items-center gap-2">
                                                <div
                                                    className="rounded-circle bg-primary bg-opacity-25 border border-primary d-flex align-items-center justify-content-center text-white fw-bold"
                                                    style={{ width: '32px', height: '32px', fontSize: '0.75rem' }}
                                                >
                                                    {u.name ? u.name.split(' ').map(p => p[0]).join('') : '?'}
                                                </div>
                                                <span className="text-white small fw-bold" style={{ fontSize: '0.85rem' }}>{u.name}</span>
                                            </div>
                                        </td>
                                        <td>
                                            <span className={`badge ${u.role_name === 'Super Admin' ? 'badge-neon-rose' : u.role_name === 'Admin' ? 'badge-neon-cyan' : 'bg-dark border border-secondary text-secondary'} px-2`}>
                                                {u.role_name || `Role ${u.role}`}
                                            </span>
                                        </td>
                                        <td className="text-secondary small" style={{ fontSize: '0.8rem' }}>{u.email}</td>
                                        <td className="text-secondary font-mono small" style={{ fontSize: '0.75rem' }}>{u.phone || '—'}</td>
                                        <td>
                                            <div className="d-flex align-items-center gap-2">
                                                <span
                                                    className="rounded-circle"
                                                    style={{
                                                        width: '8px', height: '8px', display: 'inline-block',
                                                        backgroundColor: u.is_active ? '#22c55e' : '#6b7280'
                                                    }}
                                                />
                                                <span className="small text-secondary" style={{ fontSize: '0.8rem' }}>
                                                    {u.is_active ? 'Active' : 'Inactive'}
                                                </span>
                                            </div>
                                        </td>
                                        <td className="text-end">
                                            <button
                                                onClick={() => openPasswordModal(u)}
                                                className="btn btn-sm btn-outline-warning"
                                                style={{ fontSize: '0.75rem' }}
                                                title="Change Password"
                                            >
                                                🔑 Change Password
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* ── Change Password Modal ── */}
            {showPasswordModal && selectedUser && (
                <div
                    className="modal show d-block"
                    style={{ backgroundColor: 'rgba(0,0,0,0.7)', backdropFilter: 'blur(4px)' }}
                    onClick={(e) => { if (e.target === e.currentTarget) closePasswordModal(); }}
                >
                    <div className="modal-dialog modal-dialog-centered">
                        <div className="modal-content bg-dark border border-secondary border-opacity-50" style={{ borderRadius: '12px' }}>

                            {/* Header */}
                            <div className="modal-header border-secondary border-opacity-25 pb-3">
                                <div>
                                    <h5 className="modal-title text-white fw-bold mb-0">🔑 Change Password</h5>
                                    <p className="text-secondary small mb-0 mt-1">
                                        Setting new password for <span className="text-warning fw-semibold">{selectedUser.name}</span>
                                        <span className="text-secondary ms-1">({selectedUser.email})</span>
                                    </p>
                                </div>
                                <button
                                    className="btn-close btn-close-white"
                                    onClick={closePasswordModal}
                                    disabled={pwLoading}
                                />
                            </div>

                            {/* Body */}
                            <form onSubmit={handleChangePassword}>
                                <div className="modal-body pt-4">

                                    {pwError && (
                                        <div className="alert alert-danger py-2 small mb-3" style={{ borderRadius: '8px' }}>
                                            ⚠️ {pwError}
                                        </div>
                                    )}
                                    {pwSuccess && (
                                        <div className="alert alert-success py-2 small mb-3" style={{ borderRadius: '8px' }}>
                                            ✅ {pwSuccess}
                                        </div>
                                    )}

                                    {/* New Password */}
                                    <div className="mb-3">
                                        <label className="form-label text-secondary small text-uppercase" style={{ fontSize: '0.7rem', letterSpacing: '0.05em' }}>
                                            New Password
                                        </label>
                                        <div className="input-group">
                                            <input
                                                id="newPassword"
                                                type={showNewPw ? 'text' : 'password'}
                                                className="form-control bg-dark text-white border-secondary"
                                                placeholder="Min. 6 characters"
                                                value={newPassword}
                                                onChange={(e) => setNewPassword(e.target.value)}
                                                required
                                                disabled={pwLoading}
                                                style={{ borderRadius: '8px 0 0 8px' }}
                                            />
                                            <button
                                                type="button"
                                                className="btn btn-outline-secondary"
                                                onClick={() => setShowNewPw(p => !p)}
                                                style={{ borderRadius: '0 8px 8px 0' }}
                                                tabIndex={-1}
                                            >
                                                {showNewPw ? '🙈' : '👁️'}
                                            </button>
                                        </div>
                                    </div>

                                    {/* Confirm Password */}
                                    <div className="mb-2">
                                        <label className="form-label text-secondary small text-uppercase" style={{ fontSize: '0.7rem', letterSpacing: '0.05em' }}>
                                            Confirm Password
                                        </label>
                                        <div className="input-group">
                                            <input
                                                id="confirmPassword"
                                                type={showConfirmPw ? 'text' : 'password'}
                                                className="form-control bg-dark text-white border-secondary"
                                                placeholder="Re-enter password"
                                                value={confirmPassword}
                                                onChange={(e) => setConfirmPassword(e.target.value)}
                                                required
                                                disabled={pwLoading}
                                                style={{ borderRadius: '8px 0 0 8px' }}
                                            />
                                            <button
                                                type="button"
                                                className="btn btn-outline-secondary"
                                                onClick={() => setShowConfirmPw(p => !p)}
                                                style={{ borderRadius: '0 8px 8px 0' }}
                                                tabIndex={-1}
                                            >
                                                {showConfirmPw ? '🙈' : '👁️'}
                                            </button>
                                        </div>
                                        {/* Live match indicator */}
                                        {confirmPassword && (
                                            <div className={`small mt-1 ${newPassword === confirmPassword ? 'text-success' : 'text-danger'}`}>
                                                {newPassword === confirmPassword ? '✓ Passwords match' : '✗ Passwords do not match'}
                                            </div>
                                        )}
                                    </div>
                                </div>

                                {/* Footer */}
                                <div className="modal-footer border-secondary border-opacity-25">
                                    <button
                                        type="button"
                                        className="btn btn-outline-secondary btn-sm"
                                        onClick={closePasswordModal}
                                        disabled={pwLoading}
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        type="submit"
                                        className="btn btn-warning btn-sm text-dark fw-semibold"
                                        disabled={pwLoading || !newPassword || !confirmPassword}
                                    >
                                        {pwLoading ? (
                                            <><span className="spinner-border spinner-border-sm me-1" /> Updating...</>
                                        ) : (
                                            '🔑 Update Password'
                                        )}
                                    </button>
                                </div>
                            </form>

                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default User;