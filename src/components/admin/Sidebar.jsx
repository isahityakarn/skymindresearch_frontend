import React from 'react';

const Sidebar = ({
  isSidebarCollapsed,
  setIsSidebarCollapsed,
  activeTab,
  setActiveTab,
  onLogout,
  userName
}) => {
  const getInitials = (name) => {
    if (!name) return 'AD';
    const parts = name.trim().split(/\s+/);
    if (parts.length >= 2) {
      return (parts[0][0] + (parts[1][0] || '')).toUpperCase();
    }
    return parts[0].slice(0, 2).toUpperCase();
  };
  const initials = getInitials(userName);

  return (
    <aside
      className="glass-panel sidebar-transition d-flex flex-column justify-content-between h-100 py-4 px-3"
      style={{
        width: isSidebarCollapsed ? '80px' : '280px',
        minWidth: isSidebarCollapsed ? '80px' : '280px',
        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
        borderRight: '1px solid rgba(13, 110, 253, 0.15)',
        zIndex: 100
      }}
    >
      <div>
        {/* Header & Logo */}
        <div className="d-flex align-items-center justify-content-between mb-4 border-bottom border-secondary pb-3">
          {!isSidebarCollapsed ? (
            <div className="d-flex align-items-center gap-2">
              <div className="position-relative">
                <span className="material-symbols-outlined text-primary fs-3 animate-pulse-cyber">psychology</span>
                <span className="position-absolute bottom-0 end-0 bg-success border border-dark rounded-circle" style={{ width: '10px', height: '10px' }}></span>
              </div>
              <div>
                <span className="text-white fw-bold d-block leading-none fs-6">SKY MIND</span>
                <span className="text-secondary small tracking-wider uppercase font-semibold" style={{ fontSize: '0.65rem' }}>{userName}</span>
              </div>
            </div>
          ) : (
            <span className="material-symbols-outlined text-primary fs-3 mx-auto animate-pulse-cyber">psychology</span>
          )}

          <button
            onClick={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
            className="btn btn-sm btn-outline-secondary p-1 border-0 d-none d-lg-flex align-items-center justify-content-center"
          >
            <span className="material-symbols-outlined text-secondary fs-5">
              {isSidebarCollapsed ? 'chevron_right' : 'chevron_left'}
            </span>
          </button>
        </div>

        {/* Navigation Links */}
        <nav className="d-flex flex-column border border-secondary border-opacity-25 rounded-3 overflow-hidden bg-black bg-opacity-40">
          {[
            { id: 'dashboard', label: 'Dashboard', icon: 'dashboard' },
            { id: 'surveys', label: 'Surveys', icon: 'assignment' },
            { id: 'projects', label: 'Projects', icon: 'folder' },
            { id: 'vendors', label: 'Vendors', icon: 'business' },
            { id: 'vendorSurveys', label: 'Vendor Surveys', icon: 'poll' },
            { id: 'user', label: 'Users', icon: 'people' }
          ].map((tab, index, arr) => {
            const isActive = activeTab === tab.id;
            const isLast = index === arr.length - 1;
            return (
              <a
                key={tab.id}
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  setActiveTab(tab.id);
                }}
                className={`sidebar-link ${isActive ? 'active' : ''} d-flex align-items-center ${isSidebarCollapsed ? 'justify-content-center px-0' : 'px-3'
                  } gap-3 py-3 border-start-0 border-end-0 border-top-0 ${isLast ? 'border-bottom-0' : 'border-bottom border-secondary border-opacity-20'
                  } rounded-0`}
                title={tab.label}
                style={{
                  margin: 0,
                  transform: 'none',
                }}
              >
                <span className="material-symbols-outlined fs-5">{tab.icon}</span>
                {!isSidebarCollapsed && <span className="small">{tab.label}</span>}
              </a>
            );
          })}
        </nav>
      </div>

      {/* User Block at bottom */}
      <div className="border-top border-secondary pt-3">
        <div className={`d-flex align-items-center ${isSidebarCollapsed ? 'justify-content-center' : 'justify-content-between'}`}>
          {!isSidebarCollapsed ? (
            <div className="d-flex align-items-center gap-2">
              <div className="rounded-circle bg-primary bg-opacity-25 border border-primary d-flex align-items-center justify-content-center text-white fw-bold" style={{ width: '38px', height: '38px', fontSize: '0.9rem' }}>
                {initials}
              </div>
              <div>
                <h6 className="text-white mb-0 small fw-semibold">{userName}</h6>
                {/* <span className="text-neon-cyan" style={{ fontSize: '0.7rem' }}>Sysop Level 4</span> */}
              </div>
            </div>
          ) : (
            <div className="rounded-circle bg-primary bg-opacity-25 border border-primary d-flex align-items-center justify-content-center text-white fw-bold" style={{ width: '38px', height: '38px', fontSize: '0.9rem' }}>
              {initials}
            </div>
          )}

          {!isSidebarCollapsed && (
            <button
              onClick={onLogout}
              className="btn btn-sm btn-outline-danger border-0 p-1 d-flex align-items-center justify-content-center"
              title="Logout System"
            >
              <span className="material-symbols-outlined fs-5">logout</span>
            </button>
          )}
        </div>
        {isSidebarCollapsed && (
          <button
            onClick={onLogout}
            className="btn btn-sm btn-outline-danger border-0 p-1 w-100 mt-2 d-flex align-items-center justify-content-center"
            title="Logout System"
          >
            <span className="material-symbols-outlined fs-5">logout</span>
          </button>
        )}
      </div>
    </aside>
  );
};

export default Sidebar;
