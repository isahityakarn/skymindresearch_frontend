import { useState, useEffect } from 'react';
import { getDashboardStats } from '../../services/dashboard';

export default function DashboardOverview() {
  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await getDashboardStats();
      console.log('Dashboard response:', response);
      
      // Ensure we have a valid response structure
      if (!response || typeof response !== 'object') {
        throw new Error('Invalid response format from server');
      }
      
      setDashboardData(response);
    } catch (err) {
      console.error('Error fetching dashboard data:', err);
      setError(err.message || 'Failed to load dashboard data');
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric', 
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '400px' }}>
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="alert alert-danger" role="alert">
        <h4 className="alert-heading">Error Loading Dashboard</h4>
        <p>{error}</p>
        <button className="btn btn-danger" onClick={fetchDashboardData}>
          Retry
        </button>
      </div>
    );
  }

  const stats = dashboardData?.stats || {};
  const surveyStatusBreakdown = dashboardData?.surveyStatusBreakdown || [];
  const vendorSurveyStatusBreakdown = dashboardData?.vendorSurveyStatusBreakdown || [];
  const recentSurveys = dashboardData?.recentSurveys || [];
  const recentVendorSurveys = dashboardData?.recentVendorSurveys || [];

  return (
    <div className="dashboard-overview">
      {/* Main Stats Cards */}
      <div className="row g-4 mb-4">
        <div className="col-md-3 col-sm-6">
          <div className="card bg-primary text-white h-100">
            <div className="card-body">
              <h6 className="card-subtitle mb-2 opacity-75">Total Users</h6>
              <h2 className="card-title mb-0">{stats.users?.toLocaleString() || 0}</h2>
            </div>
          </div>
        </div>
        <div className="col-md-3 col-sm-6">
          <div className="card bg-success text-white h-100">
            <div className="card-body">
              <h6 className="card-subtitle mb-2 opacity-75">Total Surveys</h6>
              <h2 className="card-title mb-0">{stats.surveys?.toLocaleString() || 0}</h2>
            </div>
          </div>
        </div>
        <div className="col-md-3 col-sm-6">
          <div className="card bg-info text-white h-100">
            <div className="card-body">
              <h6 className="card-subtitle mb-2 opacity-75">Active Projects</h6>
              <h2 className="card-title mb-0">{stats.activeProjects?.toLocaleString() || 0}</h2>
              <small className="opacity-75">of {stats.projects || 0} total</small>
            </div>
          </div>
        </div>
        <div className="col-md-3 col-sm-6">
          <div className="card bg-warning text-dark h-100">
            <div className="card-body">
              <h6 className="card-subtitle mb-2 opacity-75">Active Vendors</h6>
              <h2 className="card-title mb-0">{stats.activeVendors || 0}</h2>
              <small className="opacity-75">of {stats.vendors || 0} total</small>
            </div>
          </div>
        </div>
      </div>

      {/* Secondary Stats Row */}
      <div className="row g-4 mb-4">
        <div className="col-md-3 col-sm-6">
          <div className="card border-secondary h-100">
            <div className="card-body">
              <h6 className="text-muted mb-2">Countries</h6>
              <h3 className="mb-0">{stats.countries || 0}</h3>
              <small className="text-success">✓ {stats.activeCountries || 0} active</small>
            </div>
          </div>
        </div>
        <div className="col-md-3 col-sm-6">
          <div className="card border-secondary h-100">
            <div className="card-body">
              <h6 className="text-muted mb-2">Vendor Surveys</h6>
              <h3 className="mb-0">{stats.vendorSurveys || 0}</h3>
            </div>
          </div>
        </div>
        <div className="col-md-3 col-sm-6">
          <div className="card border-secondary h-100">
            <div className="card-body">
              <h6 className="text-muted mb-2">User Roles</h6>
              <h3 className="mb-0">{stats.roles || 0}</h3>
            </div>
          </div>
        </div>
        <div className="col-md-3 col-sm-6">
          <div className="card border-secondary h-100">
            <div className="card-body">
              <h6 className="text-muted mb-2">Total Projects</h6>
              <h3 className="mb-0">{stats.projects || 0}</h3>
            </div>
          </div>
        </div>
      </div>

      {/* Survey Completion Stats */}
      <div className="row g-4 mb-4">
        <div className="col-md-4">
          <div className="card border-success h-100">
            <div className="card-body">
              <h6 className="text-success mb-2">
                <i className="bi bi-check-circle-fill me-2"></i>
                Total Complete
              </h6>
              <h3 className="mb-0 text-success">{stats.totalComplete?.toLocaleString() || 0}</h3>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card border-warning h-100">
            <div className="card-body">
              <h6 className="text-warning mb-2">
                <i className="bi bi-exclamation-circle-fill me-2"></i>
                Total Quota Full
              </h6>
              <h3 className="mb-0 text-warning">{stats.totalQuotafull?.toLocaleString() || 0}</h3>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card border-danger h-100">
            <div className="card-body">
              <h6 className="text-danger mb-2">
                <i className="bi bi-x-circle-fill me-2"></i>
                Total Terminate
              </h6>
              <h3 className="mb-0 text-danger">{stats.totalTerminate?.toLocaleString() || 0}</h3>
            </div>
          </div>
        </div>
      </div>

      {/* Monthly & Daily Stats */}
      <div className="row g-4 mb-4">
        <div className="col-md-6">
          <div className="card h-100">
            <div className="card-header bg-primary text-white">
              <h5 className="card-title mb-0">
                <i className="bi bi-calendar-month me-2"></i>
                This Month
              </h5>
            </div>
            <div className="card-body">
              <div className="row text-center">
                <div className="col-3">
                  <div className="mb-2">
                    <small className="text-muted d-block">Total</small>
                    <h4 className="mb-0">{stats.monthTotal?.toLocaleString() || 0}</h4>
                  </div>
                </div>
                <div className="col-3">
                  <div className="mb-2">
                    <small className="text-success d-block">Complete</small>
                    <h4 className="mb-0 text-success">{stats.monthComplete?.toLocaleString() || 0}</h4>
                  </div>
                </div>
                <div className="col-3">
                  <div className="mb-2">
                    <small className="text-warning d-block">Quota Full</small>
                    <h4 className="mb-0 text-warning">{stats.monthQuotafull?.toLocaleString() || 0}</h4>
                  </div>
                </div>
                <div className="col-3">
                  <div className="mb-2">
                    <small className="text-danger d-block">Terminate</small>
                    <h4 className="mb-0 text-danger">{stats.monthTerminate?.toLocaleString() || 0}</h4>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-6">
          <div className="card h-100">
            <div className="card-header bg-info text-white">
              <h5 className="card-title mb-0">
                <i className="bi bi-calendar-day me-2"></i>
                Today
              </h5>
            </div>
            <div className="card-body">
              <div className="row text-center">
                <div className="col-3">
                  <div className="mb-2">
                    <small className="text-muted d-block">Total</small>
                    <h4 className="mb-0">{stats.todayTotal?.toLocaleString() || 0}</h4>
                  </div>
                </div>
                <div className="col-3">
                  <div className="mb-2">
                    <small className="text-success d-block">Complete</small>
                    <h4 className="mb-0 text-success">{stats.todayComplete?.toLocaleString() || 0}</h4>
                  </div>
                </div>
                <div className="col-3">
                  <div className="mb-2">
                    <small className="text-warning d-block">Quota Full</small>
                    <h4 className="mb-0 text-warning">{stats.todayQuotafull?.toLocaleString() || 0}</h4>
                  </div>
                </div>
                <div className="col-3">
                  <div className="mb-2">
                    <small className="text-danger d-block">Terminate</small>
                    <h4 className="mb-0 text-danger">{stats.todayTerminate?.toLocaleString() || 0}</h4>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Survey Status Breakdown */}
      <div className="row g-4 mb-4">
        <div className="col-md-6">
          <div className="card h-100">
            <div className="card-header bg-dark text-white">
              <h5 className="card-title mb-0">Survey Status Breakdown</h5>
            </div>
            <div className="card-body">
              {surveyStatusBreakdown.length > 0 ? (
                <div className="table-responsive">
                  <table className="table table-hover">
                    <thead>
                      <tr>
                        <th>Status</th>
                        <th className="text-end">Count</th>
                        <th className="text-end">Percentage</th>
                      </tr>
                    </thead>
                    <tbody>
                      {surveyStatusBreakdown.map((item, index) => {
                        const totalSurveys = stats.surveys || 0;
                        const percentage = totalSurveys > 0 ? ((item.count / totalSurveys) * 100).toFixed(1) : '0.0';
                        const statusColors = {
                          complete: 'success',
                          quotafull: 'warning',
                          terminate: 'danger'
                        };
                        const badgeColor = statusColors[item.status] || 'secondary';
                        
                        return (
                          <tr key={index}>
                            <td>
                              <span className={`badge bg-${badgeColor} text-capitalize`}>
                                {item.status}
                              </span>
                            </td>
                            <td className="text-end fw-bold">{item.count.toLocaleString()}</td>
                            <td className="text-end">{percentage}%</td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              ) : (
                <p className="text-muted mb-0">No survey status data available</p>
              )}
            </div>
          </div>
        </div>

        <div className="col-md-6">
          <div className="card h-100">
            <div className="card-header bg-dark text-white">
              <h5 className="card-title mb-0">Vendor Survey Status</h5>
            </div>
            <div className="card-body">
              {vendorSurveyStatusBreakdown.length > 0 ? (
                <div className="table-responsive">
                  <table className="table table-hover">
                    <thead>
                      <tr>
                        <th>Status</th>
                        <th className="text-end">Count</th>
                        <th className="text-end">Percentage</th>
                      </tr>
                    </thead>
                    <tbody>
                      {vendorSurveyStatusBreakdown.map((item, index) => {
                        const totalVendorSurveys = stats.vendorSurveys || 0;
                        const percentage = totalVendorSurveys > 0 ? ((item.count / totalVendorSurveys) * 100).toFixed(1) : '0.0';
                        const statusColors = {
                          complete: 'success',
                          quotafull: 'warning',
                          terminate: 'danger'
                        };
                        const badgeColor = statusColors[item.status] || 'secondary';
                        
                        return (
                          <tr key={index}>
                            <td>
                              <span className={`badge bg-${badgeColor} text-capitalize`}>
                                {item.status}
                              </span>
                            </td>
                            <td className="text-end fw-bold">{item.count}</td>
                            <td className="text-end">{percentage}%</td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              ) : (
                <p className="text-muted mb-0">No vendor survey status data available</p>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Recent Surveys */}
      <div className="row g-4 mb-4">
        <div className="col-12">
          <div className="card">
            <div className="card-header bg-dark text-white d-flex justify-content-between align-items-center">
              <h5 className="card-title mb-0">Recent Surveys</h5>
              <span className="badge bg-secondary">{recentSurveys.length} surveys</span>
            </div>
            <div className="card-body">
              {recentSurveys.length > 0 ? (
                <div className="table-responsive">
                  <table className="table table-hover table-sm">
                    <thead>
                      <tr>
                        <th>ID</th>
                        <th>PID</th>
                        <th>UID</th>
                        <th>Status</th>
                        <th>Start IP</th>
                        <th>End IP</th>
                        <th>Created At</th>
                      </tr>
                    </thead>
                    <tbody>
                      {recentSurveys.map((survey) => {
                        const statusColors = {
                          complete: 'success',
                          quotafull: 'warning',
                          terminate: 'danger'
                        };
                        const badgeColor = statusColors[survey.status] || 'secondary';
                        
                        return (
                          <tr key={survey.id}>
                            <td className="fw-bold">{survey.id}</td>
                            <td><code className="small">{survey.pid}</code></td>
                            <td><code className="small">{survey.uid}</code></td>
                            <td>
                              <span className={`badge bg-${badgeColor} text-capitalize`}>
                                {survey.status}
                              </span>
                            </td>
                            <td className="text-muted small">{survey.start_ip}</td>
                            <td className="text-muted small">{survey.end_ip}</td>
                            <td className="text-muted small">{formatDate(survey.created_at)}</td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              ) : (
                <p className="text-muted mb-0">No recent surveys available</p>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Recent Vendor Surveys */}
      <div className="row g-4">
        <div className="col-12">
          <div className="card">
            <div className="card-header bg-dark text-white d-flex justify-content-between align-items-center">
              <h5 className="card-title mb-0">Recent Vendor Surveys</h5>
              <span className="badge bg-secondary">{recentVendorSurveys.length} surveys</span>
            </div>
            <div className="card-body">
              {recentVendorSurveys.length > 0 ? (
                <div className="table-responsive">
                  <table className="table table-hover table-sm">
                    <thead>
                      <tr>
                        <th>ID</th>
                        <th>Vendor</th>
                        <th>Project ID</th>
                        <th>PID</th>
                        <th>UID</th>
                        <th>MID</th>
                        <th>Status</th>
                        <th>Created At</th>
                      </tr>
                    </thead>
                    <tbody>
                      {recentVendorSurveys.map((survey) => {
                        const statusColors = {
                          complete: 'success',
                          quotafull: 'warning',
                          terminate: 'danger'
                        };
                        const badgeColor = statusColors[survey.status] || 'secondary';
                        
                        return (
                          <tr key={survey.id}>
                            <td className="fw-bold">{survey.id}</td>
                            <td className="text-primary">{survey.vendor_name || 'N/A'}</td>
                            <td><code className="small">{survey.project_id || 'N/A'}</code></td>
                            <td><code className="small">{survey.pid || 'N/A'}</code></td>
                            <td><code className="small">{survey.uid || 'N/A'}</code></td>
                            <td><code className="small">{survey.mid || 'N/A'}</code></td>
                            <td>
                              <span className={`badge bg-${badgeColor} text-capitalize`}>
                                {survey.status}
                              </span>
                            </td>
                            <td className="text-muted small">{formatDate(survey.created_at)}</td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              ) : (
                <p className="text-muted mb-0">No recent vendor surveys available</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
