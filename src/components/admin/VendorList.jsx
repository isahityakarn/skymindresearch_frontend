import { useState, useEffect } from 'react';
import { 
  getAllVendors, 
  createVendor, 
  updateVendor, 
  deleteVendor,
  deactivateVendor 
} from '../../services/vendors';

export default function VendorList() {
  const [vendors, setVendors] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [editingVendor, setEditingVendor] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    is_active: true
  });

  useEffect(() => {
    fetchVendors();
  }, []);

  const fetchVendors = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await getAllVendors();
      setVendors(response.data.vendors || response.data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingVendor) {
        await updateVendor(editingVendor.id, formData);
      } else {
        await createVendor(formData);
      }
      setShowModal(false);
      setEditingVendor(null);
      setFormData({ name: '', email: '', phone: '', address: '', is_active: true });
      fetchVendors();
    } catch (err) {
      alert('Error: ' + err.message);
    }
  };

  const handleEdit = (vendor) => {
    setEditingVendor(vendor);
    setFormData({
      name: vendor.name || '',
      email: vendor.email || '',
      phone: vendor.phone || '',
      address: vendor.address || '',
      is_active: vendor.is_active !== undefined ? vendor.is_active : true
    });
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Delete this vendor?')) {
      try {
        await deleteVendor(id);
        fetchVendors();
      } catch (err) {
        alert('Error: ' + err.message);
      }
    }
  };

  const handleDeactivate = async (id) => {
    if (window.confirm('Deactivate this vendor?')) {
      try {
        await deactivateVendor(id);
        fetchVendors();
      } catch (err) {
        alert('Error: ' + err.message);
      }
    }
  };

  if (loading) return <div className="text-center py-5"><div className="spinner-border"></div></div>;
  if (error) return <div className="alert alert-danger">{error}</div>;

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>Vendors</h2>
        <button className="btn btn-primary" onClick={() => { setEditingVendor(null); setFormData({ name: '', email: '', phone: '', address: '', is_active: true }); setShowModal(true); }}>
          Add Vendor
        </button>
      </div>

      <div className="card">
        <div className="table-responsive">
          <table className="table table-hover mb-0">
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Address</th>
                <th>Status</th>
                <th>Created</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {vendors.map(vendor => (
                <tr key={vendor.id}>
                  <td>{vendor.id}</td>
                  <td>{vendor.name}</td>
                  <td>{vendor.email}</td>
                  <td>{vendor.phone || '-'}</td>
                  <td>{vendor.address || '-'}</td>
                  <td>
                    <span className={`badge ${vendor.is_active ? 'bg-success' : 'bg-secondary'}`}>
                      {vendor.is_active ? 'Active' : 'Inactive'}
                    </span>
                  </td>
                  <td>{new Date(vendor.created_at).toLocaleDateString()}</td>
                  <td>
                    <button className="btn btn-sm btn-outline-primary me-2" onClick={() => handleEdit(vendor)}>Edit</button>
                    {vendor.is_active && (
                      <button className="btn btn-sm btn-outline-warning me-2" onClick={() => handleDeactivate(vendor.id)}>Deactivate</button>
                    )}
                    <button className="btn btn-sm btn-outline-danger" onClick={() => handleDelete(vendor.id)}>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {showModal && (
        <div className="modal show d-block" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">{editingVendor ? 'Edit Vendor' : 'Add Vendor'}</h5>
                <button className="btn-close" onClick={() => setShowModal(false)}></button>
              </div>
              <form onSubmit={handleSubmit}>
                <div className="modal-body">
                  <div className="mb-3">
                    <label className="form-label">Name</label>
                    <input type="text" className="form-control" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} required />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Email</label>
                    <input type="email" className="form-control" value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} required />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Phone</label>
                    <input type="text" className="form-control" value={formData.phone} onChange={(e) => setFormData({...formData, phone: e.target.value})} />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Address</label>
                    <textarea className="form-control" value={formData.address} onChange={(e) => setFormData({...formData, address: e.target.value})} rows="3"></textarea>
                  </div>
                  <div className="mb-3 form-check">
                    <input type="checkbox" className="form-check-input" checked={formData.is_active} onChange={(e) => setFormData({...formData, is_active: e.target.checked})} />
                    <label className="form-check-label">Active</label>
                  </div>
                </div>
                <div className="modal-footer">
                  <button type="button" className="btn btn-secondary" onClick={() => setShowModal(false)}>Cancel</button>
                  <button type="submit" className="btn btn-primary">{editingVendor ? 'Update' : 'Create'}</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
