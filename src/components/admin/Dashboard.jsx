import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../ui/Button';
import Sidebar from './Sidebar';
import { getUser, removeToken, removeUser } from '../../utils/storage';
import Counter from './Counter';
import SurveyRecord from './SurveyRecord';
import ChangePassword from './ChangePassword';
import Project from './Project';
import Vendor from './Vendor';
import VendorSurvey from './VendorSurvey';
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
            <Counter />
          )}

          {/* TAB 2: SURVEY RECORD */}
          {activeTab === 'survey_record' && (
            <SurveyRecord />
          )}

          {/* TAB 3: CHANGE PASSWORD */}
          {activeTab === 'change_password' && (
            <ChangePassword />
          )}

          {/* TAB 4: PROJECT */}
          {activeTab === 'project' && (
            <Project />
          )}

          {/* TAB 5: USER */}
          {activeTab === 'user' && (
            <User />
          )}

          {/* TAB 6: VENDOR */}
          {activeTab === 'vendor' && (
            <Vendor />
          )}

          {/* TAB 7: VENDOR SURVEY */}
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
