import { For } from 'solid-js';

const skillGroups = [
  {
    label: 'Frontend',
    values: ['Solid', 'TypeScript', 'Responsive UI'],
  },
  {
    label: 'Backend',
    values: ['Hono', 'Workers', 'API contracts'],
  },
  {
    label: 'Delivery',
    values: ['GitHub Actions', 'Cloudflare', 'CI/CD'],
  },
];

type SkillGroup = (typeof skillGroups)[number];

export function SkillsPanel() {
  return (
    <aside class="panel">
      <h2>Skills</h2>
      <div class="skill-list">
        <For each={skillGroups}>{(group) => <SkillGroupSection group={group} />}</For>
      </div>
    </aside>
  );
}

function SkillGroupSection(props: { group: SkillGroup }) {
  return (
    <section>
      <h3>{props.group.label}</h3>
      <div class="tags">
        <For each={props.group.values}>{(skill) => <span>{skill}</span>}</For>
      </div>
    </section>
  );
}
