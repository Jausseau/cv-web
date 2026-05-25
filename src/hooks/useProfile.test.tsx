// @vitest-environment jsdom

import { cleanup, fireEvent, render, screen } from '@solidjs/testing-library';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { buildProfile, profileResponse } from '../test/profileFixture';
import { clearProfileCache, useProfile } from './useProfile';

afterEach(() => {
  cleanup();
  clearProfileCache();
  vi.unstubAllGlobals();
});

describe('useProfile', () => {
  it('shares one cached profile request across multiple callers', async () => {
    const profile = buildProfile();
    const fetchProfile = vi.fn<typeof fetch>(() => Promise.resolve(profileResponse(profile)));

    vi.stubGlobal('fetch', fetchProfile);

    function ProfileName() {
      const { profile } = useProfile();

      return <p>{profile()?.name ?? 'Loading name'}</p>;
    }

    function ProfileRole() {
      const { profile } = useProfile();

      return <p>{profile()?.role ?? 'Loading role'}</p>;
    }

    render(() => (
      <>
        <ProfileName />
        <ProfileRole />
      </>
    ));

    expect(await screen.findByText(profile.name)).toBeTruthy();
    expect(screen.getByText(profile.role)).toBeTruthy();
    expect(fetchProfile).toHaveBeenCalledTimes(1);
  });

  it('keeps the cached profile until refetch is requested', async () => {
    const firstProfile = buildProfile({ name: 'Ada Lovelace' });
    const refreshedProfile = buildProfile({ name: 'Grace Hopper' });
    const fetchProfile = vi.fn<typeof fetch>();

    fetchProfile
      .mockResolvedValueOnce(profileResponse(firstProfile))
      .mockResolvedValueOnce(profileResponse(refreshedProfile));
    vi.stubGlobal('fetch', fetchProfile);

    function RefreshableProfile() {
      const { profile, refetchProfile } = useProfile();

      return (
        <>
          <p>{profile()?.name ?? 'Loading profile'}</p>
          <button type="button" onClick={() => void refetchProfile()}>
            Refresh
          </button>
        </>
      );
    }

    render(() => <RefreshableProfile />);

    expect(await screen.findByText(firstProfile.name)).toBeTruthy();
    expect(fetchProfile).toHaveBeenCalledTimes(1);

    fireEvent.click(screen.getByRole('button', { name: 'Refresh' }));

    expect(await screen.findByText(refreshedProfile.name)).toBeTruthy();
    expect(fetchProfile).toHaveBeenCalledTimes(2);
  });
});
