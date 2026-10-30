import { projects } from '@/data/portfolio';

export default function Projects() {
  return (
    <section id="work" className="portfolio-section">
      <div className="portfolio-container">
        <span className="section-eyebrow">Selected work · personal & Techwired Solutions</span>
        <h2 className="section-heading">Products with a purpose.</h2>
        <p className="section-intro">A focused selection of my strongest projects: software for sharing an identity, running a business, connecting communities and playing together.</p>
        <div className="selected-projects">
          {projects.map(project => (
            <article key={project.name} className={`selected-project ${project.featured ? 'flagship-project' : ''}`}>
              <div className="project-category">{project.category}</div>
              <h3>{project.name}</h3>
              <span className="project-status">{project.status}</span>
              <p>{project.description}</p>
              <p className="project-focus">{project.focus}</p>
              <div className="project-stack">{project.stack.map(item => <span key={item}>{item}</span>)}</div>
              <div className="project-links">
                <a href={project.url} target="_blank" rel="noopener noreferrer">{project.name === 'Dashain Cards' ? 'Play on the web' : project.name === 'Gym Engine' ? 'Explore preview' : 'Visit website'} ↗</a>
                {project.featured ? <span className="private-source">Private commercial source</span> : <a href={project.source} target="_blank" rel="noopener noreferrer">Repository ↗</a>}
              </div>
              {project.featured && <small>Flagship project · repository originally named OneQRCard</small>}
            </article>
          ))}
        </div>
        <div className="business-note">
          <h3>Director · Techwired Solutions</h3>
          <p>I lead Techwired Solutions, a registered business in Budhanilkantha Municipality, Nepal. My work combines software development, AI-assisted workflows and digital marketing to turn ideas into useful products and business websites.</p>
          <a href="https://www.techwiredsolutions.com.np/" target="_blank" rel="noopener noreferrer">Explore Techwired Solutions ↗</a>
        </div>
      </div>
    </section>
  );
}
