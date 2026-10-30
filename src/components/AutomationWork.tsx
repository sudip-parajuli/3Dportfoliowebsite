import { automationProjects } from '@/data/portfolio';

export default function AutomationWork() {
  return (
    <section id="automation" className="portfolio-section automation-section">
      <div className="portfolio-container">
        <span className="section-eyebrow">AI & social media automation</span>
        <h2 className="section-heading">From content to workflow.</h2>
        <p className="section-intro">Two projects connecting code, AI-assisted content creation and social media publishing. They bring my software development and digital marketing work together.</p>
        <div className="selected-projects">
          {automationProjects.map(project => (
            <article className="selected-project automation-card" key={project.name}>
              <span className="project-category">{project.category}</span>
              <h3>{project.name}</h3>
              <p>{project.description}</p>
              <ol className="automation-workflow" aria-label={`${project.name} workflow`}>
                {project.workflow.map(step => <li key={step}>{step}</li>)}
              </ol>
              <div className="project-stack">{project.stack.map(tool => <span key={tool}>{tool}</span>)}</div>
              <div className="project-links">{project.links.map(link => <a key={link.label} href={link.url} target="_blank" rel="noopener noreferrer" aria-label={`${project.name} ${link.label}`}>{link.label} ↗</a>)}</div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
