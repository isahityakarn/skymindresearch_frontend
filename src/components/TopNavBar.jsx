import { useNavigate } from 'react-router-dom';
import Button from './ui/Button';

export default function TopNavBar() {
  const navigate = useNavigate();
  return (
    <header className="navbar navbar-expand-lg navbar-dark bg-black bg-opacity-85 fixed-top shadow-lg">
      <div className="container-fluid px-4 px-md-5">
        <a className="navbar-brand d-flex align-items-center gap-2 me-4" href="#">
          <span className="text-primary text-uppercase fw-semibold">Sky Mind</span>
          <strong className="fs-5 text-white mb-0">Research</strong>
        </a>

        <button
          className="navbar-toggler border-0"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" />
        </button>

        <div className="collapse navbar-collapse justify-content-end" id="navbarNav">
          <ul className="navbar-nav mb-2 mb-lg-0 align-items-lg-center">
            <li className="nav-item mx-lg-2">
              <a className="nav-link active text-white px-2" aria-current="page" href="#">
                Solutions
              </a>
            </li>
            <li className="nav-item mx-lg-2">
              <a className="nav-link text-secondary px-2" href="#">
                Methodology
              </a>
            </li>
            <li className="nav-item mx-lg-2">
              <a className="nav-link text-secondary px-2" href="#">
                Insights
              </a>
            </li>
            <li className="nav-item mx-lg-2">
              <a className="nav-link text-secondary px-2" href="#">
                Case Studies
              </a>
            </li>
            <li className="nav-item mx-lg-2">
              <a className="nav-link text-secondary px-2" href="#">
                About
              </a>
            </li>
          </ul>

          <div className="d-flex align-items-center gap-3 ms-lg-4">
            <button className="btn btn-outline-light rounded-circle p-2 d-flex align-items-center justify-content-center" type="button">
              <span className="material-symbols-outlined fs-5">search</span>
            </button>

            <Button type="button" variant="primary" size="lg" onClick={() => navigate('/login')}>
              Login
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}
