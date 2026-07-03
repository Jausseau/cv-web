import { For, Match, Switch } from 'solid-js';
import { useProfile } from '../hooks/useProfile';
import type { Profile } from '../profileApi';

type ProfileLink = Profile['links'][number];

const fallbackName = 'Alexandre RAHER';
const fallbackRole = 'Web Developer';
const fallbackSummary =
  'Eight years of web development experience, now building and shipping complete products end to end.';
const fallbackLocation = 'France';
const fallbackLinks: ProfileLink[] = [
  {
    label: 'GitHub',
    href: 'https://github.com/Jausseau',
  },
  {
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/in/alexandre-raher',
  },
];

export function ProfileHero() {
  const { profile } = useProfile();

  return (
    <Switch>
      <Match when={profile.loading}>
        <ProfileHeroSkeleton />
      </Match>
      <Match when={!profile.loading}>
        <ProfileHeroContent
          name={profile()?.name ?? fallbackName}
          role={profile()?.role ?? fallbackRole}
          summary={profile()?.summary ?? fallbackSummary}
          location={profile()?.location ?? fallbackLocation}
          links={profile()?.links ?? fallbackLinks}
        />
      </Match>
    </Switch>
  );
}

type ProfileHeroContentProps = {
  name: string;
  role: string;
  summary: string;
  location: string;
  links: ProfileLink[];
};

function ProfileHeroContent(props: ProfileHeroContentProps) {
  return (
    <div class="hero-copy">
      <p class="eyebrow">Solo-shipped CV website</p>
      <h1 id="page-title">{props.name}</h1>
      <p class="role">{props.role}</p>
      <p class="summary">{props.summary}</p>
      <div class="hero-meta">
        <span class="hero-location">{props.location}</span>
        <For each={props.links}>
          {(link) => (
            <a class="hero-link" href={link.href} target="_blank" rel="noreferrer">
              {link.label}
            </a>
          )}
        </For>
      </div>
    </div>
  );
}

function ProfileHeroSkeleton() {
  return (
    <div class="hero-copy" aria-busy="true" aria-live="polite">
      <p class="skeleton-line skeleton-line--eyebrow" aria-hidden="true" />
      <h1 id="page-title">
        <span class="visually-hidden">Loading profile</span>
        <span class="skeleton-line skeleton-line--title" aria-hidden="true" />
      </h1>
      <p class="skeleton-line skeleton-line--role" aria-hidden="true" />
      <p class="skeleton-block" aria-hidden="true" />
    </div>
  );
}
