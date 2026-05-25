import { For, Match, Switch } from 'solid-js';
import { useProfile } from '../hooks/useProfile';
import type { Profile } from '../profileApi';

type ExperienceItem = Profile['experience'][number];

export function ExperiencePanel() {
  const { profile } = useProfile();

  return (
    <article class="panel">
      <h2>Experience</h2>
      <Switch>
        <Match when={profile.loading}>
          <p class="muted">Loading experience...</p>
        </Match>
        <Match when={profile.error}>
          <p class="muted">The API is not reachable yet. Showing the page shell.</p>
        </Match>
        <Match when={profile()}>
          {(loadedProfile) => <ExperienceTimeline items={loadedProfile().experience} />}
        </Match>
      </Switch>
    </article>
  );
}

function ExperienceTimeline(props: { items: ExperienceItem[] }) {
  return (
    <div class="timeline">
      <For each={props.items}>{(item) => <ExperienceCard item={item} />}</For>
    </div>
  );
}

function ExperienceCard(props: { item: ExperienceItem }) {
  return (
    <section class="timeline-item">
      <p>{props.item.period}</p>
      <h3>{props.item.role}</h3>
      <span>{props.item.company}</span>
      <ul>
        <For each={props.item.highlights}>{(highlight) => <li>{highlight}</li>}</For>
      </ul>
    </section>
  );
}
