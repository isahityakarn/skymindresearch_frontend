import { useState } from 'react';

export default function Footer() {
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [error, setError] = useState('');

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (!email) {
      setError('Email address is required.');
      return;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError('Please enter a valid email address.');
      return;
    }

    setError('');
    setIsSubscribed(true);
    setEmail('');
  };

  return (
    <footer className="footer-premium text-secondary">
      <div className="container">
        {/* Main Footer Section */}
        <div className="row gy-5 pb-5">
          {/* Brand & Newsletter Column */}
          <div className="col-lg-5 col-md-12 pe-lg-5">
            <div className="mb-4">
              <h4 className="d-flex align-items-center gap-2 mb-3">
                <span className="footer-logo-gradient text-uppercase tracking-wider">Sky Mind</span>
                <strong className="text-white fw-light tracking-wide fs-4">Research</strong>
              </h4>
              <p className="text-secondary fs-6 leading-relaxed mb-4">
                Precision intelligence and elite market insights for the world's most ambitious institutional leaders.
              </p>
            </div>

            {/* Newsletter widget */}
            <div className="bg-black bg-opacity-30 border border-secondary border-opacity-25 rounded-4 p-4 mb-4 shadow-sm">
              <h6 className="text-white text-uppercase tracking-wider fs-7 mb-2">
                Intelligence Briefings
              </h6>
              <p className="text-secondary small mb-3">
                Receive weekly high-priority global research updates direct to your secure terminal.
              </p>

              {isSubscribed ? (
                <div className="d-flex align-items-center gap-2 text-success py-2 animate-fade-in">
                  <span className="material-symbols-outlined fs-4">check_circle</span>
                  <span className="small fw-semibold">Access approved. Welcome to the briefing list.</span>
                </div>
              ) : (
                <form onSubmit={handleSubscribe} className="row g-2">
                  <div className="col">
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => {
                        setEmail(e.target.value);
                        if (error) setError('');
                      }}
                      className="form-control newsletter-input w-100"
                      placeholder="business@institution.com"
                      aria-label="Professional Email"
                    />
                    {error && (
                      <div className="text-danger small mt-1 ps-1 animate-fade-in" style={{ fontSize: '0.75rem' }}>
                        {error}
                      </div>
                    )}
                  </div>
                  <div className="col-auto">
                    <button
                      type="submit"
                      className="btn btn-primary px-3 d-flex align-items-center justify-content-center h-100"
                      style={{ borderRadius: '8px', transition: 'all 0.3s ease' }}
                    >
                      <span className="material-symbols-outlined">arrow_forward</span>
                    </button>
                  </div>
                </form>
              )}
            </div>

            {/* Social Links */}
            <div className="d-flex gap-3">
              <a href="#" className="footer-social-btn" aria-label="LinkedIn Portal">
                <span className="material-symbols-outlined fs-5">share</span>
              </a>
              <a href="#" className="footer-social-btn" aria-label="Global Network">
                <span className="material-symbols-outlined fs-5">language</span>
              </a>
              <a href="#" className="footer-social-btn" aria-label="Secure Communication">
                <span className="material-symbols-outlined fs-5">mail</span>
              </a>
              <a href="#" className="footer-social-btn" aria-label="Institutional Directory">
                <span className="material-symbols-outlined fs-5">groups</span>
              </a>
            </div>
          </div>

          {/* Navigation Links Columns */}
          <div className="col-lg-7 col-md-12">
            <div className="row gy-4">
              <div className="col-md-4 col-6">
                <h6 className="footer-column-title">Solutions</h6>
                <ul className="list-unstyled mb-0 d-flex flex-column gap-2">
                  <li><a className="footer-link small" href="#">Quantitative Analysis</a></li>
                  <li><a className="footer-link small" href="#">Qualitative Intelligence</a></li>
                  <li><a className="footer-link small" href="#">Healthcare Insights</a></li>
                  <li><a className="footer-link small" href="#">BI & Analytics Consulting</a></li>
                  <li><a className="footer-link small" href="#">Predictive Modeling</a></li>
                </ul>
              </div>

              <div className="col-md-4 col-6">
                <h6 className="footer-column-title">Company</h6>
                <ul className="list-unstyled mb-0 d-flex flex-column gap-2">
                  <li><a className="footer-link small" href="#">Our Methodology</a></li>
                  <li><a className="footer-link small" href="#">Global Offices</a></li>
                  <li><a className="footer-link small" href="#">Expert Advisors</a></li>
                  <li><a className="footer-link small" href="#">Careers Directory</a></li>
                  <li><a className="footer-link small" href="#">Contact Center</a></li>
                </ul>
              </div>

              <div className="col-md-4 col-12">
                <h6 className="footer-column-title">Legal & Security</h6>
                <ul className="list-unstyled mb-0 d-flex flex-column gap-2">
                  <li><a className="footer-link small" href="#">Privacy Protection</a></li>
                  <li><a className="footer-link small" href="#">Terms of Engagement</a></li>
                  <li><a className="footer-link small" href="#">Cookie Infrastructure</a></li>
                  <li><a className="footer-link small" href="#">Information Security</a></li>
                  <li><a className="footer-link small" href="#">Compliance Standards</a></li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Separator */}
        <div className="border-top border-secondary border-opacity-25 my-4"></div>

        {/* Trust Badges Bar */}
        <div className="d-flex flex-wrap gap-3 justify-content-center justify-content-lg-start align-items-center mb-4 py-2">
          <div className="trust-badge">
            <span className="material-symbols-outlined fs-6 text-primary">verified_user</span>
            <span>ISO 27001 Certified</span>
          </div>
          <div className="trust-badge">
            <span className="material-symbols-outlined fs-6 text-primary">security</span>
            <span>SOC 2 Type II Compliant</span>
          </div>
          <div className="trust-badge">
            <span className="material-symbols-outlined fs-6 text-primary">encrypted</span>
            <span>256-bit SSL Encrypted</span>
          </div>
          <div className="trust-badge">
            <span className="material-symbols-outlined fs-6 text-primary">gavel</span>
            <span>GDPR / CCPA Compliant</span>
          </div>
        </div>

        {/* Separator */}
        <div className="border-top border-secondary border-opacity-10 my-3"></div>

        {/* Sub-footer Section */}
        <div className="d-flex flex-column flex-lg-row justify-content-between align-items-center gap-3 pt-3">
          <p className="mb-0 small text-secondary text-center text-lg-start">
            © {new Date().getFullYear()} Sky Mind Research. Precision Intelligence for Global Institutional Leaders. All rights reserved.
          </p>
          <div className="d-flex align-items-center gap-4 text-secondary fs-7">
            <a href="#" className="footer-bottom-link d-flex align-items-center gap-1 small">
              <span className="material-symbols-outlined fs-6">language</span>
              <span>EN-US</span>
            </a>
            <span className="text-secondary border-start border-secondary border-opacity-25" style={{ height: '14px' }}></span>
            <a href="#" className="footer-bottom-link d-flex align-items-center gap-1 small">
              <span className="material-symbols-outlined fs-6">lock</span>
              <span>SECURE ACCESS PORTAL</span>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

