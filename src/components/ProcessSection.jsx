export default function ProcessSection() {
  const steps = [
    {
      number: '01',
      title: 'Market Discovery',
      description: 'Defining the boundaries of inquiry and identifying critical intelligence gaps.',
    },
    {
      number: '02',
      title: 'Insights Acquisition',
      description: 'Multi-channel data harvesting using proprietary precision tools.',
    },
    {
      number: '03',
      title: 'Data Framework',
      description: 'Synthesizing raw data into actionable architectural models.',
    },
    {
      number: '04',
      title: 'Reporting',
      description: 'Delivering strategic clarity through high-density executive briefings.',
    },
  ];

  return (
    <section className="py-5 bg-dark text-white">
      <div className="container">
        <div className="text-center mb-5">
          <h2 className="display-6 fw-bold mb-3">From Market Insights To Strategic Execution</h2>
          <p className="text-secondary mx-auto mb-0" style={{ maxWidth: '720px' }}>
            Our four-stage framework ensures that data never stays static, but evolves into a roadmap for growth.
          </p>
        </div>

        <div className="row g-4 position-relative">
          <div
            className="d-none d-md-block position-absolute top-50 start-0 translate-middle-y"
            style={{ width: '100%', height: '1px', backgroundColor: '#6c757d' }}
          />

          {steps.map((step) => (
            <div key={step.number} className="col-md-3 text-center text-md-start">
              <div
                className="rounded-circle bg-primary text-white d-flex align-items-center justify-content-center mx-auto mx-md-0 mb-3"
                style={{ width: '3rem', height: '3rem' }}
              >
                {step.number}
              </div>
              <h4 className="h5 text-white mb-2">{step.title}</h4>
              <p className="text-secondary mb-0">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
