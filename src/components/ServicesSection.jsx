export default function ServicesSection() {
  return (
    <section className="py-5">
      <div className="container">
        <div className="row align-items-end mb-5">
          <div className="col-lg-6">
            <span className="text-primary text-uppercase small fw-semibold d-block mb-2">Services</span>
            <h2 className="display-6 fw-bold text-white">Market Research Specializations</h2>
          </div>
          <div className="col-lg-6">
            <p className="text-secondary mb-0">
              Precise methodologies tailored to capture high-fidelity insights across specialized industries.
            </p>
          </div>
        </div>

        <div className="row g-4">
          <div className="col-md-8">
            <div className="card bg-secondary-subtle border-secondary h-100 p-4">
              <div className="mb-4 text-primary fs-1">
                <span className="material-symbols-outlined">analytics</span>
              </div>
              <h3 className="h4 text-white mb-3">Quantitative Research</h3>
              <p className="text-secondary mb-4">
                Mass-scale data collection and statistical analysis to validate market assumptions with surgical precision.
              </p>
              <div className="d-flex flex-wrap gap-2">
                <span className="badge bg-secondary text-dark">Predictive Modeling</span>
                <span className="badge bg-secondary text-dark">A/B Testing</span>
              </div>
            </div>
          </div>

          <div className="col-md-4">
            <div className="card bg-secondary-subtle border-secondary h-100 p-4">
              <div className="mb-4 text-primary fs-1">
                <span className="material-symbols-outlined">groups</span>
              </div>
              <h3 className="h4 text-white mb-3">Qualitative Research</h3>
              <p className="text-secondary mb-0">
                In-depth human behavioral analysis and focus group facilitation.
              </p>
            </div>
          </div>

          <div className="col-md-4">
            <div className="card bg-secondary-subtle border-secondary h-100 p-4">
              <div className="mb-4 text-primary fs-1">
                <span className="material-symbols-outlined">medical_services</span>
              </div>
              <h3 className="h4 text-white mb-3">Healthcare</h3>
              <p className="text-secondary mb-0">
                Specialized intelligence for the pharmaceutical and medical device sectors.
              </p>
            </div>
          </div>

          <div className="col-md-4">
            <div className="card bg-secondary-subtle border-secondary h-100 p-4">
              <div className="mb-4 text-primary fs-1">
                <span className="material-symbols-outlined">language</span>
              </div>
              <h3 className="h4 text-white mb-3">Online Research</h3>
              <p className="text-secondary mb-0">
                Global digital sentiment tracking and cross-platform user behavior mapping.
              </p>
            </div>
          </div>

          <div className="col-md-4">
            <div className="card bg-secondary-subtle border-secondary h-100 p-4">
              <div className="mb-4 text-primary fs-1">
                <span className="material-symbols-outlined">business_center</span>
              </div>
              <h3 className="h4 text-white mb-3">Business Intelligence</h3>
              <p className="text-secondary mb-0">
                Competitive landscape mapping and strategic pivot validation.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
