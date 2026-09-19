import { useAdminAuth } from '../hooks/useAdminAuth.js';
import { useDocumentMeta } from '../hooks/useDocumentMeta.js';
import AdminLogin from './AdminLogin.jsx';
import AdminDashboard from './AdminDashboard.jsx';

/** Route guard for /admin — shows the login form until a token verifies. */
export default function AdminPage() {
  const { admin, checking, signIn, signOut } = useAdminAuth();
  useDocumentMeta({ title: 'Admin | Jaydip Solanki' });

  if (checking) {
    return <div className="grid min-h-[100svh] place-items-center text-sm text-gray-500">Checking session…</div>;
  }

  if (!admin) return <AdminLogin onSignIn={signIn} />;

  return <AdminDashboard admin={admin} onSignOut={signOut} />;
}
