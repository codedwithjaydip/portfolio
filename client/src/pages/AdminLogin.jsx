import { useState } from 'react';
import { Loader2, Lock } from 'lucide-react';

import Button from '../components/Button.jsx';
import Container from '../components/Container.jsx';

const fieldClasses =
  'w-full rounded-xl border border-white/[0.09] bg-white/[0.02] px-4 py-3 text-sm text-white ' +
  'placeholder:text-gray-600 focus:border-violet-500/50 focus:outline-none';

export default function AdminLogin({ onSignIn }) {
  const [values, setValues] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);

  const submit = async (event) => {
    event.preventDefault();
    setBusy(true);
    setError('');
    try {
      await onSignIn(values);
    } catch (err) {
      setError(err.message);
    } finally {
      setBusy(false);
    }
  };

  return (
    <Container className="grid min-h-[100svh] place-items-center py-20">
      <form onSubmit={submit} className="surface w-full max-w-sm p-8">
        <div className="mb-7 flex items-center gap-3">
          <span className="grid h-10 w-10 place-items-center rounded-xl border border-violet-500/25 bg-violet-500/10">
            <Lock size={17} aria-hidden="true" className="text-violet-300" />
          </span>
          <div>
            <h1 className="font-display text-lg font-semibold">Admin sign in</h1>
            <p className="text-xs text-gray-500">Manage projects and messages</p>
          </div>
        </div>

        <label htmlFor="admin-email" className="mb-2 block text-sm font-medium text-gray-300">
          Email
        </label>
        <input
          id="admin-email"
          type="email"
          autoComplete="username"
          required
          value={values.email}
          onChange={(event) => setValues((v) => ({ ...v, email: event.target.value }))}
          className={fieldClasses}
        />

        <label htmlFor="admin-password" className="mb-2 mt-5 block text-sm font-medium text-gray-300">
          Password
        </label>
        <input
          id="admin-password"
          type="password"
          autoComplete="current-password"
          required
          value={values.password}
          onChange={(event) => setValues((v) => ({ ...v, password: event.target.value }))}
          className={fieldClasses}
        />

        {error && (
          <p role="alert" className="mt-4 text-sm text-red-400">
            {error}
          </p>
        )}

        <Button type="submit" size="lg" className="mt-7 w-full" disabled={busy}>
          {busy ? <Loader2 size={16} aria-hidden="true" className="animate-spin" /> : null}
          {busy ? 'Signing in' : 'Sign in'}
        </Button>
      </form>
    </Container>
  );
}
