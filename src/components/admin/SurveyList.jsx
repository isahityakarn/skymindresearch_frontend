import { useState, useEffect } from 'react';
import { 
  getAllSurveys, 
  createSurvey, 
  updateSurvey, 
  deleteSurvey,
  updateSurveyStatus 
} from '../../services/surveys';

export default function SurveyList() {
  const [surveys, setSurveys] = useState([]);
  const [pagination, setPagination] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  
  const [page, setPage] = useState(1);
  const [limit] = useState(10);
  const [filters, setFilters] = useState({
    status: '',
    pid: '',
    uid: '',
    sortBy: 'created_at',
    sortOrder: 'DESC'
  });

  const [showModal, setShowModal] = useState(false);
  const [editingSurvey, setEditingSurvey] = useState(null);
  const [formData, setFormData] = useState({
    pid: '',
    uid: '',
    status: '',
    start_ip: '',
    end_ip: ''
  });

  useEffect(() => {
    fetchSurveys();
  }, [page, filters]);

  const fetchSurveys = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await getAllSurveys({ page, limit, ...filters });
      console.log('Survey response:', response);
      
      // Backend returns: { success, message, surveys, pagination }
      // Service returns res.data, so response = { success, message, surveys, pagination }
      setSurveys(response.surveys || []);
      setPagination(response.pagination || null);
    } catch (err) {
      console.error('Error fetching surveys:', err);
      setError(err.message || 'Failed to load surveys');
      setSurveys([]);
      setPagination(null);
    } finally {
      setLoading(false);
    }
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({ ...prev, [name]: value }));
    setPage(1);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingSurvey) {
        await updateSurvey(editingSurvey.id, formData);
      } else {
        await createSurvey(formData);
      }
      setShowModal(false);
      setEditingSurvey(null);
      setFormData({ pid: '', uid: '', status: '', start_ip: '', end_ip: '' });
      fetchSurveys();
    } catch (err) {
      alert('Error: ' + err.message);
    }
  };

  const handleEdit = (survey) => {
    setEditingSurvey(survey);
    setFormData({
      pid: survey.pid || '',
      uid: survey.uid || '',
      status: survey.status || '',
      start_ip: survey.start_ip || '',
      end_ip: survey.end_ip || ''
    });
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Delete this survey?')) {
      try {
        await deleteSurvey(id);
        fetchSurveys();
      } catch (err) {
        alert('Error: ' + err.message);
      }
    }
  };

  const handleStatusChange = async (id, newStatus) => {
    try {
      await updateSurveyStatus(id, newStatus);
      fetchSurveys();
    } catch (err) {
      alert('Error: ' + err.message);
    }
  };

  if (loading) return <div className="text-center py-5"><div className="spinner-border"></div></div>;
  if (error) return <div className="alert alert-danger">{error}</div>;

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>Surveys</h2>
        <button className="btn btn-primary" onClick={() => { setEditingSurvey(null); setFormData({ pid: '', uid: '', status: '', start_ip: '', end_ip: '' }); setShowModal(true); }}>
          Add Survey
        </button>
      </div>

      <div className="card mb-4">
        <div className="card-body">
          <div className="row g-3">
            <div className="col-md-3">
              <select className="form-select" name="status" value={filters.status} onChange={handleFilterChange}>
                <option value="">All Status</option>
                <option value="active">Active</option>
                <option value="completed">Completed</option>
                <option value="pending">Pending</option>
              </select>
            </div>
            <div className="col-md-3">
              <input type="text" className="form-control" name="pid" value={filters.pid} onChange={handleFilterChange} placeholder="Project ID" />
            </div>
            <div className="col-md-3">
              <input type="text" className="form-control" name="uid" value={filters.uid} onChange={handleFilterChange} placeholder="User ID" />
            </div>
            <div className="col-md-3">
              <select className="form-select" name="sortBy" value={filters.sortBy} onChange={handleFilterChange}>
                <option value="created_at">Created Date</option>
                <option value="id">ID</option>
                <option value="status">Status</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      <div className="card">
        <div className="table-responsive">
          <table className="table table-hover mb-0">
            <thead>
              <tr>
                <th>ID</th>
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
              {surveys.map(survey => (
                <tr key={survey.id}>
                  <td>{survey.id}</td>
                  <td>{survey.project_pid || survey.pid}</td>
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

      {pagination && (
        <div className="d-flex justify-content-between align-items-center mt-4">
          <div>Showing {surveys.length} of {pagination.totalItems}</div>
          <nav>
            <ul className="pagination mb-0">
              <li className={`page-item ${!pagination.hasPrevPage ? 'disabled' : ''}`}>
                <button className="page-link" onClick={() => setPage(page - 1)} disabled={!pagination.hasPrevPage}>Previous</button>
              </li>
              <li className="page-item active">
                <span className="page-link">{pagination.currentPage} / {pagination.totalPages}</span>
              </li>
              <li className={`page-item ${!pagination.hasNextPage ? 'disabled' : ''}`}>
                <button className="page-link" onClick={() => setPage(page + 1)} disabled={!pagination.hasNextPage}>Next</button>
              </li>
            </ul>
          </nav>
        </div>
      )}

      {showModal && (
        <div className="modal show d-block" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">{editingSurvey ? 'Edit Survey' : 'Add Survey'}</h5>
                <button className="btn-close" onClick={() => setShowModal(false)}></button>
              </div>
              <form onSubmit={handleSubmit}>
                <div className="modal-body">
                  <div className="mb-3">
                    <label className="form-label">Project ID</label>
                    <input type="number" className="form-control" value={formData.pid} onChange={(e) => setFormData({...formData, pid: e.target.value})} required />
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
