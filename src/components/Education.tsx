import { profile } from '@/data/portfolio';

export default function Education() {
  return (
    <section id="education" className="portfolio-section education-section">
      <div className="portfolio-container">
        <span className="section-eyebrow">Education, experience & professional development</span>
        <h2 className="section-heading">Learning, then building.</h2>
        <div className="education-grid">
          <article className="education-card"><span className="project-category">Business leadership</span><h3>Director · Techwired Solutions</h3><p>I lead a registered business in Budhanilkantha Municipality, building software products and delivering digital solutions.</p></article>
          <article className="education-card"><span className="project-category">Completed · {profile.completionYear}</span><h3>{profile.education}</h3><p>{profile.college}<br />{profile.university}</p></article>
          <article className="education-card"><span className="project-category">Completed · 3-month internship</span><h3>Backend Developer Intern</h3><p>Insight Workshop<br />Python · Django · Backend development</p></article>
          <article className="education-card"><span className="project-category">Professional development</span><h3>Digital Marketing Bootcamp</h3><p>Completion certificate provided by Budhanilkantha Municipality.</p></article>
        </div>
        <p className="section-intro">My interests connect software development, AI, automation and entrepreneurship, with a growing focus on how modern technology can support agriculture in Nepal.</p>
      </div>
    </section>
  );
}
