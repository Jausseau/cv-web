import type { Profile } from '../profileApi';

const profileFixture: Profile = {
  name: 'Ada Lovelace',
  role: 'Frontend Platform Engineer',
  tagline: 'Founder of Analytical Engines Ltd',
  location: 'London, UK',
  summary: 'Builds thoughtful product interfaces with careful API contracts.',
  links: [
    {
      label: 'Website',
      href: 'https://example.com',
    },
  ],
  skills: ['Solid', 'TypeScript', 'Testing'],
  experience: [
    {
      company: 'Analytical Engines',
      role: 'Lead UI Engineer',
      period: '2022 - Present',
      highlights: ['Built reusable Solid components', 'Hardened API loading states'],
    },
  ],
  projects: [
    {
      name: 'Profile Cache',
      description: 'A shared resource that keeps profile reads efficient.',
      href: 'https://example.com/profile-cache',
    },
  ],
};

export function buildProfile(overrides: Partial<Profile> = {}): Profile {
  return {
    ...profileFixture,
    ...overrides,
  };
}

export function profileResponse(profile: Profile, init: ResponseInit = {}) {
  return new Response(JSON.stringify(profile), {
    status: 200,
    headers: {
      'Content-Type': 'application/json',
    },
    ...init,
  });
}

export function createDeferred<T>() {
  let resolve!: (value: T | PromiseLike<T>) => void;
  let reject!: (reason?: unknown) => void;
  const promise = new Promise<T>((promiseResolve, promiseReject) => {
    resolve = promiseResolve;
    reject = promiseReject;
  });

  return { promise, reject, resolve };
}
