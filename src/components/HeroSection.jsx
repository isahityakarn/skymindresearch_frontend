import Button from './ui/Button';

export default function HeroSection() {
  return (
    <section className="py-5 position-relative overflow-hidden text-white bg-dark">
      <div className="container">
        <div className="row align-items-center gy-4">
          <div className="col-lg-6">
            <div className="d-inline-flex align-items-center gap-2 px-3 py-2 border border-secondary mb-4 bg-secondary bg-opacity-10 rounded-3">
              <span className="text-secondary text-uppercase small fw-semibold">Welcome to</span>
            </div>

            <h1 className="display-5 fw-bold mb-4">SKY MIND RESEARCH</h1>
            <p className="lead text-secondary mb-4">
              A leading research agency specializing in precision intelligence for global leaders. We transform complex data into architectural clarity.
            </p>

            <div className="d-flex flex-wrap gap-3">
              <Button variant="primary" size="lg">
                Start Exploration
              </Button>
              <Button variant="secondary" size="lg" className="btn btn-outline-light">
                Our Methodology
              </Button>
            </div>
          </div>

          <div className="col-lg-6">
            <div className="overflow-hidden rounded-4 shadow-lg">
              <img
                className="img-fluid"
                alt="A sophisticated data visualization dashboard showing interconnected neural networks and global heatmaps in a dark, high-contrast environment. The visual style is surgical and precise, using deep charcoal backgrounds and vibrant blue data points to suggest advanced market intelligence and analytical rigor. Cinematic lighting highlights the architectural structure of the data streams."
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuCIJwec49dyE-a_hAYRBwXhBxtTMJh2JlwWeQdyxq4HFSxEsg-ESV06SgiZs-XKOt7G61Jm5qsQh84r5QiRCJGOJQ7jR7Nirg2K5ubtw9JuRnRd8Jwp61iSMunkFfSjM8httrOz04WwAN5lUQ3FHPvZt-pBjWBuS5l40NFPh4mBBx-fGyts7iXYahJ2VOjBbp3-dTHX9jIU7acn2lbYw19K2tyJ59BjN1wbekVb-5oRtP7OlPc6_bv8Th6rTE7kn8tpaKI4c-yGwHE"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
