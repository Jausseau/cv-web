export type Profile = {
  name: string;
  role: string;
  tagline: string;
  location: string;
  summary: string;
  links: Array<{
    label: string;
    href: string;
  }>;
  skills: string[];
  experience: Array<{
    company: string;
    role: string;
    period: string;
    highlights: string[];
  }>;
  projects: Array<{
    name: string;
    description: string;
    href?: string;
  }>;
};

const defaultApiBaseUrl = 'http://localhost:8787';

export function getProfileApiUrl(baseUrl = import.meta.env.VITE_API_BASE_URL): string {
  const resolvedBaseUrl = baseUrl || defaultApiBaseUrl;

  return `${resolvedBaseUrl.replace(/\/$/, '')}/profile`;
}

export async function fetchProfile(): Promise<Profile> {
  const response = await fetch(getProfileApiUrl());

  if (!response.ok) {
    throw new Error(`Failed to load profile: ${response.status}`);
  }

  return response.json() as Promise<Profile>;
}
