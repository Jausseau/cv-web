import { createResource, createRoot } from 'solid-js';
import { fetchProfile } from '../profileApi';

type ProfileCache = ReturnType<typeof createProfileCache>;

let sharedProfile: ProfileCache | undefined;
let disposeProfileCache: (() => void) | undefined;

function createProfileCache() {
  const [profile, controls] = createResource(fetchProfile);

  return {
    profile,
    refetchProfile: controls.refetch,
  };
}

export function useProfile() {
  if (!sharedProfile) {
    sharedProfile = createRoot((dispose) => {
      disposeProfileCache = dispose;

      return createProfileCache();
    });
  }

  return sharedProfile;
}

export function clearProfileCache() {
  disposeProfileCache?.();
  sharedProfile = undefined;
  disposeProfileCache = undefined;
}
