import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from './Sidebar';
import { getUser, removeToken, removeUser } from '../../utils/storage';
import DashboardOverview from './DashboardOverview';
import SurveyList from './SurveyList';
import ProjectList from './ProjectList';
import VendorList from './VendorList';
import VendorSurveyList from './VendorSurveyList';
import ChangePassword from './ChangePassword';
import User from './User';

export default function Dashboard() {
  const navigate = useNavigate();
  const user = getUser();
  const currentUser = user?.name || 'Admin';

  // Navigation State (defaults to overview dashboard)
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  // Logout handler
  const handleLogout = () => {
    removeToken();
    removeUser();
    setTimeout(() => {
      navigate('/');
    }, 800);
  };

  // Render content based on active tab
  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <DashboardOverview />;
      case 'surveys':
        return <SurveyList />;
      case 'projects':
        return <ProjectList />;
      case 'vendors':
        return <VendorList />;
      case 'vendorSurveys':
        return <VendorSurveyList />;
    
      case 'changePassword':
        return <ChangePassword />;
     
      case 'user':
        return <User />;
      default:
        return <DashboardOverview />;
    }
  };

  return (
    <div className="dashboard-container d-flex grid-matrix scanline-container">

      {/* FUTURISTIC SIDE PANEL */}
      <Sidebar
        isSidebarCollapsed={isSidebarCollapsed}
        setIsSidebarCollapsed={setIsSidebarCollapsed}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onLogout={handleLogout}
        userName={currentUser}
      />

      {/* Main Workspace Frame */}
      <main className="flex-grow-1 h-100 d-flex flex-column dashboard-scroll" style={{ backgroundColor: '#020617' }}>

        {/* Dynamic Header Strip with Access Level Indicators */}
        <header className="border-bottom border-secondary border-opacity-20 py-3 px-4 px-md-5 d-flex flex-column flex-sm-row justify-content-between align-items-start align-items-sm-center gap-3 bg-black bg-opacity-40" style={{ zIndex: 10 }}>
          <div>
            <h1 className="h4 text-white mb-1 fw-bold tracking-tight d-flex align-items-center gap-2">
              Sky Mind Analytical Dashboard
              <span className="badge badge-neon-cyan fs-8 text-uppercase tracking-wider px-2 py-0.5" style={{ fontSize: '0.6rem' }}>Level 5 Access</span>
            </h1>
            <p className="text-secondary small mb-0 font-mono" style={{ fontSize: '0.75rem' }}>Decentralized Terminal. Session Cryptographically Secured.</p>
          </div>
        </header>



        {/* View-Specific Content Panel */}
        <div className="flex-grow-1 p-4 p-md-5">

          {/* TAB 1: DASHBOARD OVERVIEW */}
          {activeTab === 'dashboard' && (
            <DashboardOverview />
          )}

          {/* TAB 2: SURVEYS */}
          {activeTab === 'surveys' && (
            <SurveyList />
          )}

          {/* TAB 3: PROJECTS */}
          {activeTab === 'projects' && (
            <ProjectList />
          )}

          {/* TAB 4: VENDORS */}
          {activeTab === 'vendors' && (
            <VendorList />
          )}

          {/* TAB 5: VENDOR SURVEYS */}
          {activeTab === 'vendorSurveys' && (
            <VendorSurveyList />
          )}

          {/* TAB 6: COUNTER (OLD) */}
          {activeTab === 'counter' && (
            <Counter />
          )}

          {/* TAB 7: SURVEY RECORD (OLD) */}
          {activeTab === 'survey_record' && (
            <SurveyRecord />
          )}

          {/* TAB 8: CHANGE PASSWORD */}
          {activeTab === 'change_password' && (
            <ChangePassword />
          )}

          {/* TAB 9: PROJECT (OLD) */}
          {activeTab === 'project' && (
            <Project />
          )}

          {/* TAB 10: USER */}
          {activeTab === 'user' && (
            <User />
          )}

          {/* TAB 11: VENDOR (OLD) */}
          {activeTab === 'vendor' && (
            <Vendor />
          )}

          {/* TAB 12: VENDOR SURVEY (OLD) */}
          {activeTab === 'vendor_survey' && (
            <VendorSurvey />
          )}

        </div>

        {/* Console Foot-Ticker */}
        <footer className="mt-auto border-top border-secondary border-opacity-10 py-2 px-4 px-md-5 d-flex justify-content-between align-items-center bg-black bg-opacity-50" style={{ zIndex: 10 }}>
          <span className="text-secondary font-mono" style={{ fontSize: '0.7rem' }}></span>
          <span className="text-neon-cyan font-mono" style={{ fontSize: '0.7rem' }}>2026 © Sky Mind Research pvt. ltd. All rights reserved.</span>
        </footer>

      </main>
    </div>
  );
}
