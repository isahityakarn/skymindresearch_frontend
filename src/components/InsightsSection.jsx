export default function InsightsSection() {
  const insights = [
    {
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBPVh5XKowC6fVKayc8y3FuJKT7mc7PIeVgxjojOQf7sfMux7u99yTuqDJNcJTbm7xvCh3t-IZyTVx-oQxMOCd5WxDL8tLEHxQMGyrrPCS_H-r0ybpgwn-News7Kj6SuYWTinMyVsU0PG7aZqOGX4sZ1LXS2070_PInALYAORkqHjXi-nsu8htXBGyXTlrTlppbqOtdJXIQaJY7pKR9EadLMXPSPqkdGTr5gGP9AaNC-EqHLDwSSSRs5Q2RHgHbem3sblwmLoFqxl8',
      tag: 'REPORT',
      readTime: '12 MIN READ',
      title: 'The 2024 Global Consumer Sentiment Shift',
      description: 'Exploring the intersection of inflationary pressures and digital transformation in emerging markets.',
    },
    {
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDvpfq2Q-92Rb7OjmAo9Ilj9kANdSG8U5mF0Ic3qClV5yxj5bBM_ewISCqPpG6r8EBpTU12xQGmqQ9wGaNxpD93rYKKs18nz5xbu3Kkm1RQppZsSy-58Z3XbIlOzsD4kNDlL7nf5CN_j7_JqfCAh-NsPtJRPrvcExM4FdQleFg5YewZoO7f22s_ecsX7rb2fPmdv42mtJB8JvZAXmBn0Y54xqGGa0l9pdKLd7CwcXNVaVBu-gLtj39mqfuUkO-EOeNUbHijUqDZvvw',
      tag: 'CASE STUDY',
      readTime: '8 MIN READ',
      title: 'Precision Mapping for Telecom Expansion',
      description: 'How a Tier 1 provider leveraged our Quantitative framework to enter the APAC region.',
    },
    {
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBFNcTLZxaQDwzyogmjFMOaxGGjJbe8E6hLFvJgXeU9yAjVenvZoAIC8vJuUQsIDTV8kB-TpY6eM6YEyl4SsLCl2RDa2dXlV8fcLiSsUnn3PdB7qIgIz6WUbhnWljVno5LnroZQLJw5KX841oZSx7pdTiWO9kV8Z4pkp0-ARU_pWxhoYdYZ_NZfaGf5cZ-43UH6hcAzxG4Te5_0B01jmuKzSicDHbVmy5VEt1XGpaYveVpk1RdMho0oNLcYe5Q4WIv0TLtD1LV0Odc',
      tag: 'ANALYSIS',
      readTime: '15 MIN READ',
      title: 'Generative AI in Qualitative Discourse',
      description: 'Validating the accuracy of AI-driven focus group transcription and analysis.',
    },
  ];

  return (
    <section className="py-5">
      <div className="container">
        <div className="d-flex flex-column flex-md-row justify-content-between align-items-start align-items-md-center mb-4 gap-3">
          <h2 className="h2 text-white mb-0">Market Insights That Shape Smarter Decisions</h2>
          <a className="text-primary text-decoration-none d-flex align-items-center gap-2" href="#">
            View All Reports
            <span className="material-symbols-outlined">arrow_forward</span>
          </a>
        </div>

        <div className="row g-4">
          {insights.map((insight, index) => (
            <article key={index} className="col-md-4">
              <div className="card h-100 border-secondary bg-dark text-white overflow-hidden">
                <img src={insight.image} alt={insight.title} className="card-img-top img-fluid" />
                <div className="card-body px-0 pt-3">
                  <div className="d-flex gap-2 mb-2 small text-secondary">
                    <span>{insight.tag}</span>
                    <span>{insight.readTime}</span>
                  </div>
                  <h3 className="h5 text-white mb-2">{insight.title}</h3>
                  <p className="text-secondary mb-0">{insight.description}</p>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
