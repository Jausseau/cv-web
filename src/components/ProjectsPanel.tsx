import { For, Show } from 'solid-js';
import { useProfile } from '../hooks/useProfile';
import type { Profile } from '../profileApi';

type Project = Profile['projects'][number];

export function ProjectsPanel() {
  const { profile } = useProfile();

  return (
    <article class="panel projects-panel">
      <h2>Projects</h2>
      <Show when={profile()} fallback={<p class="muted">Project data will appear from the API.</p>}>
        {(loadedProfile) => (
          <div class="project-list">
            <For each={loadedProfile().projects}>
              {(project) => <ProjectCard project={project} />}
            </For>
          </div>
        )}
      </Show>
    </article>
  );
}

function ProjectCard(props: { project: Project }) {
  return (
    <section>
      <h3>{props.project.name}</h3>
      <p>{props.project.description}</p>
    </section>
  );
}
