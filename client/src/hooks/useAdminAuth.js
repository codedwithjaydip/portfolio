import { useEffect, useState } from 'react';
import { api, tokenStore } from '../services/api.js';

/** Verifies a stored token against the API so a stale token cannot fake a session. */
export function useAdminAuth() {
  const [admin, setAdmin] = useState(null);
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    if (!tokenStore.get()) {
      setChecking(false);
      return undefined;
    }

    let active = true;
    api.admin
      .me()
      .then((payload) => active && setAdmin(payload.data))
      .catch(() => {
        tokenStore.clear();
        if (active) setAdmin(null);
      })
      .finally(() => active && setChecking(false));

    return () => {
      active = false;
    };
  }, []);

  const signIn = async (credentials) => {
    const payload = await api.admin.login(credentials);
    tokenStore.set(payload.data.token);
    setAdmin(payload.data.admin);
  };

  const signOut = () => {
    tokenStore.clear();
    setAdmin(null);
  };

  return { admin, checking, signIn, signOut };
}
