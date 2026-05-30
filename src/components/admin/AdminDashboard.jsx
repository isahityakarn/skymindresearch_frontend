import { useState } from 'react';
import DashboardOverview from './DashboardOverview';
import SurveyList from './SurveyList';
import ProjectList from './ProjectList';
import VendorList from './VendorList';
import VendorSurveyList from './VendorSurveyList';

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState('overview');

  const tabs = [
    { id: 'overview', label: 'Dashboard', icon: 'dashboard' },
    { id: 'surveys', label: 'Surveys', icon: 'assignment' },
    { id: 'projects', label: 'Projects', icon: 'folder' },
    { id: 'vendors', label: 'Vendors', icon: 'business' },
    { id: 'vendorSurveys', label: 'Vendor Surveys', icon: 'poll' }
  ];

  const renderContent = () => {
    switch (activeTab) {
      case 'overview':
        return <DashboardOverview />;
      case 'surveys':
        return <SurveyList />;
      case 'projects':
        return <ProjectList />;
      case 'vendors':
        return <VendorList />;
      case 'vendorSurveys':
        return <VendorSurveyList />;
      default:
        return <DashboardOverview />;
    }
  };

  return (
    <div className="admin-dashboard">
      {/* Navigation Tabs */}
      <div className="card mb-4">
        <div className="card-body">
          <ul className="nav nav-pills">
            {tabs.map(tab => (
              <li className="nav-item" key={tab.id}>
                <button
                  className={`nav-link ${activeTab === tab.id ? 'active' : ''}`}
                  onClick={() => setActiveTab(tab.id)}
                >
                  <span className="material-symbols-outlined me-2" style={{ fontSize: '18px', verticalAlign: 'middle' }}>
                    {tab.icon}
                  </span>
                  {tab.label}
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Content Area */}
      <div className="content-area">
        {renderContent()}
      </div>
    </div>
  );
}
