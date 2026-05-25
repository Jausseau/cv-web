import { ExperiencePanel } from './components/ExperiencePanel';
import { ProfileHero } from './components/ProfileHero';
import { ProjectsPanel } from './components/ProjectsPanel';
import { SkillsPanel } from './components/SkillsPanel';
import { StatusPanel } from './components/StatusPanel';

export function App() {
  return (
    <main class="page-shell">
      <section class="hero-section" aria-labelledby="page-title">
        <ProfileHero />
        <StatusPanel />
      </section>

      <section class="content-grid" aria-label="CV content">
        <ExperiencePanel />
        <SkillsPanel />
        <ProjectsPanel />
      </section>
    </main>
  );
}
