import { useState, useEffect } from 'react';
import { 
  getAllVendorSurveys, 
  createVendorSurvey, 
  updateVendorSurvey, 
  deleteVendorSurvey,
  updateVendorSurveyStatus 
} from '../../services/vendorSurveys';

export default function VendorSurveyList() {
  const [vendorSurveys, setVendorSurveys] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [editingSurvey, setEditingSurvey] = useState(null);
  const [formData, setFormData] = useState({
    vendor_id: '',
    project_id: '',
    uid: '',
    status: '',
    start_ip: '',
    end_ip: ''
  });

  useEffect(() => {
    fetchVendorSurveys();
  }, []);

  const fetchVendorSurveys = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await getAllVendorSurveys();
      setVendorSurveys(response.data.vendorSurveys || response.data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingSurvey) {
        await updateVendorSurvey(editingSurvey.id, formData);
      } else {
        await createVendorSurvey(formData);
      }
      setShowModal(false);
      setEditingSurvey(null);
      setFormData({ vendor_id: '', project_id: '', uid: '', status: '', start_ip: '', end_ip: '' });
      fetchVendorSurveys();
    } catch (err) {
      alert('Error: ' + err.message);
    }
  };

  const handleEdit = (survey) => {
    setEditingSurvey(survey);
    setFormData({
      vendor_id: survey.vendor_id || '',
      project_id: survey.project_id || '',
      uid: survey.uid || '',
      status: survey.status || '',
      start_ip: survey.start_ip || '',
      end_ip: survey.end_ip || ''
    });
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Delete this vendor survey?')) {
      try {
        await deleteVendorSurvey(id);
        fetchVendorSurveys();
      } catch (err) {
        alert('Error: ' + err.message);
      }
    }
  };

  const handleStatusChange = async (id, newStatus) => {
    try {
      await updateVendorSurveyStatus(id, newStatus);
      fetchVendorSurveys();
    } catch (err) {
      alert('Error: ' + err.message);
    }
  };

  if (loading) return <div className="text-center py-5"><div className="spinner-border"></div></div>;
  if (error) return <div className="alert alert-danger">{error}</div>;

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>Vendor Surveys</h2>
        <button className="btn btn-primary" onClick={() => { setEditingSurvey(null); setFormData({ vendor_id: '', project_id: '', uid: '', status: '', start_ip: '', end_ip: '' }); setShowModal(true); }}>
          Add Vendor Survey
        </button>
      </div>

      <div className="card">
        <div className="table-responsive">
          <table className="table table-hover mb-0">
            <thead>
              <tr>
                <th>ID</th>
                <th>Vendor</th>
                <th>Project</th>
                <th>User</th>
                <th>Status</th>
                <th>Start IP</th>
                <th>End IP</th>
                <th>Created</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {vendorSurveys.map(survey => (
                <tr key={survey.id}>
                  <td>{survey.id}</td>
                  <td>{survey.vendor_name || survey.vendor_id}</td>
                  <td>{survey.project_pid || survey.project_id}</td>
                  <td>{survey.user_name || survey.uid}</td>
                  <td>
                    <select className="form-select form-select-sm" value={survey.status || ''} onChange={(e) => handleStatusChange(survey.id, e.target.value)}>
                      <option value="">Select</option>
                      <option value="active">Active</option>
                      <option value="completed">Completed</option>
                      <option value="pending">Pending</option>
                    </select>
                  </td>
                  <td>{survey.start_ip || '-'}</td>
                  <td>{survey.end_ip || '-'}</td>
                  <td>{new Date(survey.created_at).toLocaleDateString()}</td>
                  <td>
                    <button className="btn btn-sm btn-outline-primary me-2" onClick={() => handleEdit(survey)}>Edit</button>
                    <button className="btn btn-sm btn-outline-danger" onClick={() => handleDelete(survey.id)}>Delete</button>
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
                <h5 className="modal-title">{editingSurvey ? 'Edit Vendor Survey' : 'Add Vendor Survey'}</h5>
                <button className="btn-close" onClick={() => setShowModal(false)}></button>
              </div>
              <form onSubmit={handleSubmit}>
                <div className="modal-body">
                  <div className="mb-3">
                    <label className="form-label">Vendor ID</label>
                    <input type="number" className="form-control" value={formData.vendor_id} onChange={(e) => setFormData({...formData, vendor_id: e.target.value})} required />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Project ID</label>
                    <input type="number" className="form-control" value={formData.project_id} onChange={(e) => setFormData({...formData, project_id: e.target.value})} required />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">User ID</label>
                    <input type="number" className="form-control" value={formData.uid} onChange={(e) => setFormData({...formData, uid: e.target.value})} required />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Status</label>
                    <select className="form-select" value={formData.status} onChange={(e) => setFormData({...formData, status: e.target.value})}>
                      <option value="">Select</option>
                      <option value="active">Active</option>
                      <option value="completed">Completed</option>
                      <option value="pending">Pending</option>
                    </select>
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Start IP</label>
                    <input type="text" className="form-control" value={formData.start_ip} onChange={(e) => setFormData({...formData, start_ip: e.target.value})} />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">End IP</label>
                    <input type="text" className="form-control" value={formData.end_ip} onChange={(e) => setFormData({...formData, end_ip: e.target.value})} />
                  </div>
                </div>
                <div className="modal-footer">
                  <button type="button" className="btn btn-secondary" onClick={() => setShowModal(false)}>Cancel</button>
                  <button type="submit" className="btn btn-primary">{editingSurvey ? 'Update' : 'Create'}</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
