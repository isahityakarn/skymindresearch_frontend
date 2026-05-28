import Button from './ui/Button';
import TextInput from './ui/TextInput';
import TextArea from './ui/TextArea';

export default function ContactSection() {
  return (
    <section className="py-5 bg-dark text-white">
      <div className="container">
        <div className="row g-5 align-items-center">
          <div className="col-md-6">
            <h2 className="h2 text-white mb-4">Let's Build Your Next Market Intelligence Project</h2>
            <p className="text-secondary mb-4">
              Partner with our specialists to define your research parameters and uncover the metrics that matter.
            </p>

            <ul className="list-unstyled">
              <li className="d-flex align-items-start gap-3 mb-4">
                <span className="material-symbols-outlined text-primary fs-4">check_circle</span>
                <div>
                  <h5 className="h5 text-white">Precision Alignment</h5>
                  <p className="text-secondary mb-0">
                    We mirror your corporate objectives to ensure every insight is actionable.
                  </p>
                </div>
              </li>
              <li className="d-flex align-items-start gap-3">
                <span className="material-symbols-outlined text-primary fs-4">check_circle</span>
                <div>
                  <h5 className="h5 text-white">Global Scalability</h5>
                  <p className="text-secondary mb-0">
                    Our network spans 45+ markets with localized expertise.
                  </p>
                </div>
              </li>
            </ul>
          </div>

          <div className="col-md-6">
            <div className="card bg-black bg-opacity-75 border-secondary shadow-sm p-4">
              <form className="row g-3">
                <div className="col-md-6">
                  <label className="form-label text-secondary">Full Name</label>
                  <TextInput type="text" className="bg-transparent border-secondary text-white" />
                </div>
                <div className="col-md-6">
                  <label className="form-label text-secondary">Professional Email</label>
                  <TextInput type="email" className="bg-transparent border-secondary text-white" />
                </div>
                <div className="col-12">
                  <label className="form-label text-secondary">Organization</label>
                  <TextInput type="text" className="bg-transparent border-secondary text-white" />
                </div>
                <div className="col-12">
                  <label className="form-label text-secondary">Research Objective</label>
                  <TextArea rows="4" className="bg-transparent border-secondary text-white" />
                </div>
                <div className="col-12">
                  <Button type="submit" variant="primary" size="lg" className="w-100">
                    Submit Project Brief
                  </Button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
