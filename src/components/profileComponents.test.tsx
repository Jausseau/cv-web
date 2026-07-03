// @vitest-environment jsdom

import { cleanup, render, screen } from '@solidjs/testing-library';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { clearProfileCache } from '../hooks/useProfile';
import { buildProfile, createDeferred, profileResponse } from '../test/profileFixture';
import { ExperiencePanel } from './ExperiencePanel';
import { ProfileHero } from './ProfileHero';
import { ProjectsPanel } from './ProjectsPanel';
import { SkillsPanel } from './SkillsPanel';
import { StatusPanel } from './StatusPanel';

afterEach(() => {
  cleanup();
  clearProfileCache();
  vi.unstubAllGlobals();
});

describe('profile components', () => {
  it('shows a skeleton hero while loading and replaces it with profile data', async () => {
    const profile = buildProfile();
    const response = createDeferred<Response>();

    vi.stubGlobal(
      'fetch',
      vi.fn<typeof fetch>(() => response.promise),
    );

    render(() => <ProfileHero />);

    expect(screen.getByRole('heading', { level: 1, name: 'Loading profile' })).toBeTruthy();
    expect(screen.queryByText('Alexandre RAHER')).toBeNull();
    expect(screen.queryByText('Web Developer')).toBeNull();

    response.resolve(profileResponse(profile));

    expect(await screen.findByRole('heading', { level: 1, name: profile.name })).toBeTruthy();
    expect(screen.getByText(profile.role)).toBeTruthy();
    expect(screen.getByText(profile.summary)).toBeTruthy();
  });

  it('renders the location and profile links in the hero', async () => {
    const profile = buildProfile();

    vi.stubGlobal(
      'fetch',
      vi.fn<typeof fetch>(() => Promise.resolve(profileResponse(profile))),
    );

    render(() => <ProfileHero />);

    expect(await screen.findByText(profile.location)).toBeTruthy();

    const link = screen.getByRole('link', { name: profile.links[0].label });

    expect(link.getAttribute('href')).toBe(profile.links[0].href);
  });

  it('renders experience after the shared profile request resolves', async () => {
    const profile = buildProfile();

    vi.stubGlobal(
      'fetch',
      vi.fn<typeof fetch>(() => Promise.resolve(profileResponse(profile))),
    );

    render(() => <ExperiencePanel />);

    expect(screen.getByText('Loading experience...')).toBeTruthy();
    expect(await screen.findByText(profile.experience[0].role)).toBeTruthy();
    expect(screen.getByText(profile.experience[0].company)).toBeTruthy();
    expect(screen.getByText(profile.experience[0].highlights[0])).toBeTruthy();
  });

  it('renders projects from the profile payload', async () => {
    const profile = buildProfile();

    vi.stubGlobal(
      'fetch',
      vi.fn<typeof fetch>(() => Promise.resolve(profileResponse(profile))),
    );

    render(() => <ProjectsPanel />);

    expect(screen.getByText('Project data will appear from the API.')).toBeTruthy();
    expect(await screen.findByText(profile.projects[0].name)).toBeTruthy();
    expect(screen.getByText(profile.projects[0].description)).toBeTruthy();

    const projectLink = screen.getByRole('link', { name: profile.projects[0].name });

    expect(projectLink.getAttribute('href')).toBe(profile.projects[0].href);
  });

  it('renders the static skills and project status panels', () => {
    render(() => (
      <>
        <SkillsPanel />
        <StatusPanel />
      </>
    ));

    expect(screen.getByText('Frontend')).toBeTruthy();
    expect(screen.getByText('TypeScript')).toBeTruthy();
    expect(screen.getByText('Stack')).toBeTruthy();
    expect(screen.getByText('Solid + Hono')).toBeTruthy();
  });
});
