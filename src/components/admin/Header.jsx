import React, { useState, useEffect } from 'react';

const Header = ({ onRefreshFeeds }) => {
  const [timeString, setTimeString] = useState('');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTimeString(now.toTimeString().split(' ')[0]);
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <header className="border-bottom border-secondary py-3 px-4 px-md-5 d-flex flex-column flex-sm-row justify-content-between align-items-start align-items-sm-center gap-3 bg-black bg-opacity-50" style={{ zIndex: 10 }}>
      <div>
        <h1 className="h4 text-white mb-1 fw-bold tracking-tight d-flex align-items-center gap-2">
          Sky Mind Search Dashboard
          <span className="badge badge-neon-cyan fs-7 text-uppercase font-semibold tracking-wider px-2 py-0.5" style={{ fontSize: '0.6rem' }}>operational</span>
        </h1>
        {/* <p className="text-secondary small mb-0">Decentralized Intelligence Network. Terminal Session secure.</p> */}
      </div>
      
      <div className="d-flex align-items-center gap-3">
        {/* Live Ticker Clock */}
        <div className="text-end d-none d-md-block">
          <span className="text-secondary small block font-mono">CYCLE TIME // {timeString || '00:00:00'}</span>
          <div className="d-flex align-items-center gap-1.5 justify-content-end text-neon-emerald small font-semibold">
            <span className="position-relative d-inline-flex" style={{ width: '6px', height: '6px' }}>
              <span className="animate-pulse-cyber absolute inline-flex h-full w-full rounded-full bg-emerald bg-opacity-75"></span>
              <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald"></span>
            </span>
            LIVE SIGNAL SYNCED
          </div>
        </div>
        <button
          onClick={onRefreshFeeds}
          className="btn btn-outline-secondary btn-sm rounded-3 p-2 d-flex align-items-center justify-content-center"
          title="Refresh Feeds"
        >
          <span className="material-symbols-outlined fs-5">sync</span>
        </button>
      </div>
    </header>
  );
};

export default Header;
