import { useState, useEffect } from 'react';
import { status } from '../../services/constants';
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
  const [limit] = useState(50);
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
      // console.log('Survey response:', status);
      
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



  if (loading) return <div className="text-center py-5"><div className="spinner-border"></div></div>;
  if (error) return <div className="alert alert-danger">{error}</div>;

  return (
    <div>


      <div className="card mb-4">
        <div className="card-body">
          <div className="row g-3">
            <div className="col-md-3">
              <select className="form-select" name="status" value={filters.status} onChange={handleFilterChange}>
                <option value="">All Status</option>
                {status.map((s) => (
                  <option key={s.name} value={s.name}>{s.name.charAt(0).toUpperCase() + s.name.slice(1)}</option>
                ))}
              </select>
            </div>
            <div className="col-md-3">
              <input type="text" className="form-control" name="pid" value={filters.pid} onChange={handleFilterChange} placeholder="PID" />
            </div>
            <div className="col-md-3">
              <input type="text" className="form-control" name="uid" value={filters.uid} onChange={handleFilterChange} placeholder="UID" />
            </div>
            <div className="col-md-3">
              <select className="form-select" name="sortBy" value={filters.sortBy} onChange={handleFilterChange}>
                <option value="created_at">Created Date</option>
                <option value="id">ID</option>
                {status.map((s) => (
                  <option key={s.name} value={s.name}>
                    Status: {s.name.charAt(0).toUpperCase() + s.name.slice(1)}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </div>

      <div className="card">
        <div className="table-responsive">
          <table className="table table-hover mb-0" style={{ border: '1px solid black' }}>
            <thead style={{ borderBottom: '2px solid black' }}>
              <tr>
                <th style={{ border: '1px solid black' }}>ID</th>
                <th style={{ border: '1px solid black' }}>PID</th>
                <th style={{ border: '1px solid black' }}>UID</th>
                <th style={{ border: '1px solid black' }}>Status</th>
                <th style={{ border: '1px solid black' }}>Start IP</th>
                <th style={{ border: '1px solid black' }}>End IP</th>
                <th style={{ border: '1px solid black' }}>Created</th>
              </tr>
            </thead>
            <tbody>
              {surveys.map(survey => {
                // Determine status color
                let statusColor = '';
                let statusBgColor = '';
                if (survey.status === 'complete') {
                  statusColor = 'green';
                  statusBgColor = '#d4edda';
                } else if (survey.status === 'quotafull') {
                  statusColor = '#856404';
                  statusBgColor = '#fff3cd';
                } else if (survey.status === 'terminate') {
                  statusColor = 'red';
                  statusBgColor = '#f8d7da';
                }
                
                return (
                  <tr key={survey.id}>
                    <td style={{ border: '1px solid black' }}>{survey.id}</td>
                    <td style={{ border: '1px solid black' }}>{survey.project_pid || survey.pid}</td>
                    <td style={{ border: '1px solid black' }}>{survey.user_name || survey.uid}</td>
                    <td style={{ 
                      border: '1px solid black', 
                      backgroundColor: statusBgColor,
                      color: statusColor,
                      fontWeight: 'bold'
                    }}>
                      {survey.status ? survey.status.charAt(0).toUpperCase() + survey.status.slice(1) : '-'}
                    </td>
                    <td style={{ border: '1px solid black' }}>{survey.start_ip || '-'}</td>
                    <td style={{ border: '1px solid black' }}>{survey.end_ip || '-'}</td>
                    <td style={{ border: '1px solid black' }}>{new Date(survey.created_at).toLocaleDateString()}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {pagination && (
        <div className="d-flex justify-content-between align-items-center mt-4">
          <div>Showing {surveys.length} of {pagination.totalItems}</div>
          <div className="d-flex gap-2 align-items-center">
            <button 
              className="btn btn-outline-primary" 
              onClick={() => setPage(page - 1)} 
              disabled={!pagination.hasPrevPage}
              style={{ minWidth: '100px' }}
            >
              Previous
            </button>
            
            <select 
              className="form-select" 
              value={page} 
              onChange={(e) => setPage(Number(e.target.value))}
              style={{ minWidth: '150px', maxWidth: '200px' }}
            >
              {Array.from({ length: pagination.totalPages }, (_, i) => i + 1).map((pageNum) => (
                <option key={pageNum} value={pageNum}>
                  Page {pageNum} of {pagination.totalPages}
                </option>
              ))}
            </select>
            
            <button 
              className="btn btn-outline-primary" 
              onClick={() => setPage(page + 1)} 
              disabled={!pagination.hasNextPage}
              style={{ minWidth: '100px' }}
            >
              Next
            </button>
          </div>
        </div>
      )}

     
    </div>
  );
}
