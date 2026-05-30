import { useState, useEffect } from 'react';
import { 
  getAllProjects, 
  createProject, 
  updateProject, 
  deleteProject,
  deactivateProject 
} from '../../services/projects';

export default function ProjectList() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [editingProject, setEditingProject] = useState(null);
  const [formData, setFormData] = useState({
    pid: '',
    mid: '',
    vendor_id: '',
    country_id: '',
    name: '',
    description: '',
    is_active: true
  });

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await getAllProjects();
      setProjects(response.data.projects || response.data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingProject) {
        await updateProject(editingProject.id, formData);
      } else {
        await createProject(formData);
      }
      setShowModal(false);
      setEditingProject(null);
      setFormData({ pid: '', mid: '', vendor_id: '', country_id: '', name: '', description: '', is_active: true });
      fetchProjects();
    } catch (err) {
      alert('Error: ' + err.message);
    }
  };

  const handleEdit = (project) => {
    setEditingProject(project);
    setFormData({
      pid: project.pid || '',
      mid: project.mid || '',
      vendor_id: project.vendor_id || '',
      country_id: project.country_id || '',
      name: project.name || '',
      description: project.description || '',
      is_active: project.is_active !== undefined ? project.is_active : true
    });
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Delete this project?')) {
      try {
        await deleteProject(id);
        fetchProjects();
      } catch (err) {
        alert('Error: ' + err.message);
      }
    }
  };

  const handleDeactivate = async (id) => {
    if (window.confirm('Deactivate this project?')) {
      try {
        await deactivateProject(id);
        fetchProjects();
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
        <h2>Projects</h2>
        <button className="btn btn-primary" onClick={() => { setEditingProject(null); setFormData({ pid: '', mid: '', vendor_id: '', country_id: '', name: '', description: '', is_active: true }); setShowModal(true); }}>
          Add Project
        </button>
      </div>

      <div className="card">
        <div className="table-responsive">
          <table className="table table-hover mb-0">
            <thead>
              <tr>
                <th>ID</th>
                <th>PID</th>
                <th>MID</th>
                <th>Name</th>
                <th>Vendor</th>
                <th>Country</th>
                <th>Status</th>
                <th>Created</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {projects.map(project => (
                <tr key={project.id}>
                  <td>{project.id}</td>
                  <td>{project.pid}</td>
                  <td>{project.mid || '-'}</td>
                  <td>{project.name}</td>
                  <td>{project.vendor_name || project.vendor_id}</td>
                  <td>{project.country_name || project.country_id}</td>
                  <td>
                    <span className={`badge ${project.is_active ? 'bg-success' : 'bg-secondary'}`}>
                      {project.is_active ? 'Active' : 'Inactive'}
                    </span>
                  </td>
                  <td>{new Date(project.created_at).toLocaleDateString()}</td>
                  <td>
                    <button className="btn btn-sm btn-outline-primary me-2" onClick={() => handleEdit(project)}>Edit</button>
                    {project.is_active && (
                      <button className="btn btn-sm btn-outline-warning me-2" onClick={() => handleDeactivate(project.id)}>Deactivate</button>
                    )}
                    <button className="btn btn-sm btn-outline-danger" onClick={() => handleDelete(project.id)}>Delete</button>
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
                <h5 className="modal-title">{editingProject ? 'Edit Project' : 'Add Project'}</h5>
                <button className="btn-close" onClick={() => setShowModal(false)}></button>
              </div>
              <form onSubmit={handleSubmit}>
                <div className="modal-body">
                  <div className="mb-3">
                    <label className="form-label">PID</label>
                    <input type="text" className="form-control" value={formData.pid} onChange={(e) => setFormData({...formData, pid: e.target.value})} required />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">MID</label>
                    <input type="text" className="form-control" value={formData.mid} onChange={(e) => setFormData({...formData, mid: e.target.value})} />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Name</label>
                    <input type="text" className="form-control" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} required />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Description</label>
                    <textarea className="form-control" value={formData.description} onChange={(e) => setFormData({...formData, description: e.target.value})} rows="3"></textarea>
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Vendor ID</label>
                    <input type="number" className="form-control" value={formData.vendor_id} onChange={(e) => setFormData({...formData, vendor_id: e.target.value})} />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Country ID</label>
                    <input type="number" className="form-control" value={formData.country_id} onChange={(e) => setFormData({...formData, country_id: e.target.value})} />
                  </div>
                  <div className="mb-3 form-check">
                    <input type="checkbox" className="form-check-input" checked={formData.is_active} onChange={(e) => setFormData({...formData, is_active: e.target.checked})} />
                    <label className="form-check-label">Active</label>
                  </div>
                </div>
                <div className="modal-footer">
                  <button type="button" className="btn btn-secondary" onClick={() => setShowModal(false)}>Cancel</button>
                  <button type="submit" className="btn btn-primary">{editingProject ? 'Update' : 'Create'}</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
