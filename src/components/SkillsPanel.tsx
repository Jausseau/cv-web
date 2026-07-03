import { For } from 'solid-js';

const skillGroups = [
  {
    label: 'Frontend',
    values: ['TypeScript', 'React', 'Angular', 'Solid'],
  },
  {
    label: 'Backend',
    values: ['NodeJS', 'Hono', 'C#'],
  },
  {
    label: 'Delivery',
    values: ['Cloudflare Workers', 'GitHub Actions', 'CI/CD'],
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
