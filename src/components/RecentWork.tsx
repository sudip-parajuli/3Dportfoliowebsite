import { recentProjects } from '@/data/portfolio';

export default function RecentWork() {
  return (
    <section id="recent-work" className="portfolio-section recent-work-section">
      <div className="portfolio-container">
        <span className="section-eyebrow">Recently built · November 2026</span>
        <h2 className="section-heading">From new ideas to working apps.</h2>
        <p className="section-intro">My latest work brings business operations and family relationships to web and Android, with a focus on shared interfaces, permissions and practical everyday workflows.</p>
        <div className="selected-projects">
          {recentProjects.map(project => (
            <article className="selected-project" key={project.name}>
              <span className="project-category">{project.category}</span>
              <h3>{project.name}</h3>
              <span className="project-status">{project.status}</span>
              <p>{project.description}</p>
              <p className="project-focus">{project.focus}</p>
              <div className="project-stack">{project.stack.map(tool => <span key={tool}>{tool}</span>)}</div>
              <div className="project-links"><a href={project.url} target="_blank" rel="noopener noreferrer">{project.action} ↗</a></div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
