export default function TrustedBySection() {
  const companies = ["FORTUNE", "SPHERA", "NEXUS", "ORACLE", "VELOCITY", "APEX"];

  return (
    <section className="py-5 border-top border-bottom border-secondary bg-dark text-secondary">
      <div className="container">
        <p className="text-center text-uppercase text-secondary small fw-semibold mb-4">
          Powering Global Decisions At
        </p>

        <div className="d-flex flex-nowrap justify-content-between align-items-center gap-4 overflow-auto no-scrollbar py-3">
          {companies.map((company) => (
            <div key={company} style={{ minWidth: '120px' }} className="fw-bold text-white">
              {company}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
