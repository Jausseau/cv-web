import { Match, Switch } from 'solid-js';
import { useProfile } from '../hooks/useProfile';

const fallbackSummary =
  'A production-shaped CV website built with Solid, Hono, GitHub Actions, and Cloudflare.';

export function ProfileHero() {
  const { profile } = useProfile();

  return (
    <Switch>
      <Match when={profile.loading}>
        <ProfileHeroSkeleton />
      </Match>
      <Match when={!profile.loading}>
        <ProfileHeroContent
          name={profile()?.name ?? 'Your Name'}
          role={profile()?.role ?? 'Web Developer'}
          summary={profile()?.summary ?? fallbackSummary}
        />
      </Match>
    </Switch>
  );
}

type ProfileHeroContentProps = {
  name: string;
  role: string;
  summary: string;
};

function ProfileHeroContent(props: ProfileHeroContentProps) {
  return (
    <div class="hero-copy">
      <p class="eyebrow">Solo-shipped CV website</p>
      <h1 id="page-title">{props.name}</h1>
      <p class="role">{props.role}</p>
      <p class="summary">{props.summary}</p>
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
