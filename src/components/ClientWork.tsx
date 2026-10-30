import { clientWork, conceptWork } from '@/data/portfolio';

export default function ClientWork() {
  return (
    <section id="client-work" className="portfolio-section client-work-section">
      <div className="portfolio-container">
        <span className="section-eyebrow">Business & client work</span>
        <h2 className="section-heading">Helping businesses move forward.</h2>
        <p className="section-intro">As a Business Growth & Digital Strategy Consultant, I work across planning and hands-on execution. My client work includes websites, social media graphics, Google Business Profile setup and management, marketing and advertising, with the scope shaped around each business.</p>
        <div className="client-work-grid">
          {clientWork.map(client => (
            <article className="client-work-card" key={client.name}>
              <span className="project-category">{client.role}</span>
              <h3>{client.name}</h3>
              <p>{client.scope}</p>
              <a href={client.url} target="_blank" rel="noopener noreferrer">Visit business ↗</a>
            </article>
          ))}
        </div>
        <details className="concept-collection">
          <summary><span>Website redesign concepts</span><span className="concept-count">6 explorations · view collection</span></summary>
          <p className="concept-intro">Independent sample redesigns exploring more modern websites for hospitality, restaurants and sports. These are design concepts, rather than official business websites or commissioned client launches.</p>
          <div className="concept-grid">
            {conceptWork.map(concept => (
              <a href={concept.url} target="_blank" rel="noopener noreferrer" className="concept-link" key={concept.name}>
                <span>{concept.name} ↗</span><small>{concept.category}</small>
              </a>
            ))}
          </div>
        </details>
      </div>
    </section>
  );
}
