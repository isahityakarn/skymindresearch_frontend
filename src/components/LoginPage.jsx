import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from './ui/Button';
import TextInput from './ui/TextInput';
import { login } from '../services/users';
import { setToken, setUser } from '../utils/storage';

const LoginPage = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [isError, setIsError] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    try {

      const loginData = await login(email, password);
      console.log("loginData", loginData)
      setToken(loginData.data.token);
      setUser(loginData.data.user);

      setMessage("Login successful");
      setIsError(false);

      // Navigate to admin dashboard
      navigate('/admin/dashboard');
    } catch (error) {
      setMessage(error.response?.data?.message || "Login failed");
      setIsError(true);
    }
  };

  return (
    <section className="min-vh-100 bg-dark text-white d-flex align-items-center py-5">
      <div className="container">
        <div className="row justify-content-center gy-4">
          <div className="col-lg-10">
            <div className="row g-4">
              <div className="col-lg-6 d-flex flex-column justify-content-between">
                <div>
                  <p className="text-uppercase small text-primary">Secure Access</p>
                  <h1 className="mt-4 display-6 fw-bold text-white">Login to Sky Mind Research</h1>
                  <p className="text-secondary mt-3">
                    Access your research dashboard, client reports, and precision analytics tools.
                  </p>
                </div>

                <div className="text-secondary small">
                  <div className="mb-3">
                    <p className="fw-semibold text-white mb-1">Instant access</p>
                    <p className="mb-0">Login with your corporate credentials and continue where you left off.</p>
                  </div>
                  <div>
                    <p className="fw-semibold text-white mb-1">Secure data</p>
                    <p className="mb-0">Protected by enterprise-grade encryption and session monitoring.</p>
                  </div>
                </div>

                <Button variant="secondary" size="lg" className="mt-3" onClick={() => navigate('/')}>
                  Back to home
                </Button>
              </div>

              <div className="col-lg-6">
                <div className="card bg-black bg-opacity-75 border-secondary shadow-lg">
                  <div className="card-body p-4 p-md-5">
                    <div className="d-flex justify-content-between align-items-center mb-4">
                      <div>
                        <p className="text-uppercase small text-secondary mb-2">Login</p>
                        <h2 className="h4 text-white mb-0">Enter your credentials</h2>
                      </div>
                      <div className="badge bg-secondary text-dark text-uppercase">Member</div>
                    </div>
                    <form className="row g-3" onSubmit={handleSubmit}>
                      <div className="col-12">
                        <label className="form-label text-secondary">Email address</label>
                        <TextInput type="email" placeholder="you@company.com" className="bg-transparent border-secondary text-white" value={email} onChange={(e) => setEmail(e.target.value)} />
                      </div>
                      <div className="col-12">
                        <label className="form-label text-secondary">Password</label>
                        <TextInput type="password" placeholder="Enter your password" className="bg-transparent border-secondary text-white" value={password} onChange={(e) => setPassword(e.target.value)} />
                      </div>
                      <div className="col-12 d-flex flex-column flex-sm-row justify-content-between align-items-start align-items-sm-center gap-2 text-secondary small">
                        <label className="form-check d-flex align-items-center gap-2 mb-0">
                          <input type="checkbox" className="form-check-input bg-transparent border-secondary" />
                          <span>Remember me</span>
                        </label>
                        <a href="#" className="text-decoration-none text-primary">
                          Forgot password?
                        </a>
                      </div>
                      <div className="col-12">
                        <Button type="submit" variant="primary" size="lg" className="w-100">
                          Continue to login
                        </Button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LoginPage;
