import { afterEach, describe, expect, it, vi } from 'vitest';
import { fetchProfile, getProfileApiUrl } from './profileApi';
import { buildProfile, profileResponse } from './test/profileFixture';

afterEach(() => {
  vi.unstubAllGlobals();
});

describe('getProfileApiUrl', () => {
  it('joins a base URL with /profile', () => {
    expect(getProfileApiUrl('https://api.example.com')).toBe('https://api.example.com/profile');
  });

  it('does not duplicate slashes', () => {
    expect(getProfileApiUrl('https://api.example.com/')).toBe('https://api.example.com/profile');
  });

  it('falls back to localhost', () => {
    expect(getProfileApiUrl()).toBe('http://localhost:8787/profile');
  });
});

describe('fetchProfile', () => {
  it('returns the decoded profile payload', async () => {
    const profile = buildProfile();
    const fetchMock = vi.fn<typeof fetch>(() => Promise.resolve(profileResponse(profile)));

    vi.stubGlobal('fetch', fetchMock);

    await expect(fetchProfile()).resolves.toEqual(profile);
    expect(fetchMock).toHaveBeenCalledWith('http://localhost:8787/profile');
  });

  it('throws when the API returns an error response', async () => {
    const fetchMock = vi.fn<typeof fetch>(() =>
      Promise.resolve(new Response(null, { status: 500 })),
    );

    vi.stubGlobal('fetch', fetchMock);

    await expect(fetchProfile()).rejects.toThrow('Failed to load profile: 500');
  });
});
