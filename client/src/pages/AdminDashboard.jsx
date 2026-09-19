import { useCallback, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Check, LogOut, Mail, Pencil, Plus, Star, Trash2 } from 'lucide-react';

import Button from '../components/Button.jsx';
import Container from '../components/Container.jsx';
import Badge from '../components/Badge.jsx';
import AdminProjectForm from '../components/AdminProjectForm.jsx';
import { api } from '../services/api.js';
import { cn } from '../utils/cn.js';

const TABS = [
  { id: 'overview', label: 'Overview' },
  { id: 'projects', label: 'Projects' },
  { id: 'messages', label: 'Messages' },
];

function StatTile({ label, value }) {
  return (
    <div className="surface p-5">
      <p className="font-display text-display-md font-bold">{value}</p>
      <p className="mt-1 text-sm text-gray-500">{label}</p>
    </div>
  );
}

export default function AdminDashboard({ admin, onSignOut }) {
  const [tab, setTab] = useState('overview');
  const [stats, setStats] = useState(null);
  const [projects, setProjects] = useState([]);
  const [messages, setMessages] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  // null = form closed, 'new' = creating, or the project object being edited
  const [formTarget, setFormTarget] = useState(null);

  const load = useCallback(async () => {
    setLoading(true);
    setError('');
    try {
      const [statsRes, projectsRes, messagesRes] = await Promise.all([
        api.admin.stats(),
        api.admin.projects(),
        api.admin.messages(),
      ]);
      setStats(statsRes.data);
      setProjects(projectsRes.data);
      setMessages(messagesRes.data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  const toggleFeatured = async (project) => {
    try {
      const updated = await api.admin.updateProject(project._id, { featured: !project.featured });
      setProjects((list) => list.map((item) => (item._id === project._id ? updated.data : item)));
      load();
    } catch (err) {
      setError(err.message);
    }
  };

  const removeProject = async (project) => {
    if (!window.confirm(`Delete "${project.title}"? This cannot be undone.`)) return;
    try {
      await api.admin.deleteProject(project._id);
      setProjects((list) => list.filter((item) => item._id !== project._id));
      load();
    } catch (err) {
      setError(err.message);
    }
  };

  const saveProject = async (payload) => {
    if (formTarget && formTarget !== 'new') {
      const updated = await api.admin.updateProject(formTarget._id, payload);
      setProjects((list) => list.map((item) => (item._id === formTarget._id ? updated.data : item)));
    } else {
      const created = await api.admin.createProject(payload);
      setProjects((list) => [created.data, ...list]);
    }
    setFormTarget(null);
    load();
  };

  const markRead = async (message) => {
    try {
      const updated = await api.admin.markRead(message._id, !message.read);
      setMessages((list) => list.map((item) => (item._id === message._id ? updated.data : item)));
      load();
    } catch (err) {
      setError(err.message);
    }
  };

  const removeMessage = async (message) => {
    if (!window.confirm('Delete this message?')) return;
    try {
      await api.admin.deleteMessage(message._id);
      setMessages((list) => list.filter((item) => item._id !== message._id));
      load();
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <Container className="py-14">
      <header className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="font-display text-display-md font-bold">Dashboard</h1>
          <p className="mt-1 text-sm text-gray-500">Signed in as {admin.email}</p>
        </div>
        <div className="flex gap-3">
          <Button to="/" variant="ghost" size="sm">
            View site
          </Button>
          <Button type="button" onClick={onSignOut} variant="secondary" size="sm">
            <LogOut size={14} aria-hidden="true" />
            Sign out
          </Button>
        </div>
      </header>

      <nav aria-label="Dashboard sections" className="mt-9 flex gap-2 border-b border-white/[0.07]">
        {TABS.map((item) => (
          <button
            key={item.id}
            type="button"
            onClick={() => setTab(item.id)}
            aria-current={tab === item.id ? 'page' : undefined}
            className={cn(
              '-mb-px border-b-2 px-3 py-3 text-sm transition-colors',
              tab === item.id ? 'border-violet-500 text-white' : 'border-transparent text-gray-500 hover:text-white'
            )}
          >
            {item.label}
            {item.id === 'messages' && stats?.unreadMessages > 0 && (
              <span className="ml-2 rounded-md bg-violet-500/15 px-1.5 py-0.5 text-[0.7rem] text-violet-300">
                {stats.unreadMessages}
              </span>
            )}
          </button>
        ))}
      </nav>

      {error && (
        <p role="alert" className="mt-6 rounded-xl border border-red-500/25 bg-red-500/10 p-4 text-sm text-red-300">
          {error}
        </p>
      )}

      {loading && <p className="mt-10 text-sm text-gray-500">Loading dashboard…</p>}

      {!loading && tab === 'overview' && stats && (
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <StatTile label="Total projects" value={stats.totalProjects} />
          <StatTile label="Featured projects" value={stats.featuredProjects} />
          <StatTile label="Total messages" value={stats.totalMessages} />
          <StatTile label="Unread messages" value={stats.unreadMessages} />
        </div>
      )}

      {!loading && tab === 'projects' && (
        <div className="mt-8">
          {formTarget && (
            <div className="mb-6">
              <AdminProjectForm
                project={formTarget === 'new' ? null : formTarget}
                onSubmit={saveProject}
                onCancel={() => setFormTarget(null)}
              />
            </div>
          )}

          {!formTarget && (
            <Button type="button" size="sm" className="mb-5" onClick={() => setFormTarget('new')}>
              <Plus size={15} aria-hidden="true" />
              Add project
            </Button>
          )}

          {projects.length === 0 ? (
            <p className="surface p-8 text-sm text-gray-400">
              No projects yet. Add one above, or run{' '}
              <code className="font-mono text-violet-300">npm run seed</code> in the server folder to load the
              starter set.
            </p>
          ) : (
            <ul className="space-y-3">
              {projects.map((project) => (
                <li key={project._id} className="surface flex flex-wrap items-center gap-4 p-5">
                  <div className="min-w-0 flex-1">
                    <p className="font-medium">{project.title}</p>
                    <p className="mt-0.5 truncate text-sm text-gray-500">{project.shortDescription}</p>
                  </div>
                  <Badge>{project.category}</Badge>
                  <div className="flex gap-2">
                    <button
                      type="button"
                      onClick={() => toggleFeatured(project)}
                      aria-pressed={project.featured}
                      aria-label={project.featured ? `Unfeature ${project.title}` : `Feature ${project.title}`}
                      className={cn(
                        'grid h-9 w-9 place-items-center rounded-lg border transition-colors',
                        project.featured
                          ? 'border-violet-500/35 bg-violet-500/10 text-violet-300'
                          : 'border-white/[0.09] text-gray-500 hover:text-white'
                      )}
                    >
                      <Star size={15} aria-hidden="true" />
                    </button>
                    <button
                      type="button"
                      onClick={() => setFormTarget(project)}
                      aria-label={`Edit ${project.title}`}
                      className="grid h-9 w-9 place-items-center rounded-lg border border-white/[0.09] text-gray-500 transition-colors hover:text-white"
                    >
                      <Pencil size={15} aria-hidden="true" />
                    </button>
                    <button
                      type="button"
                      onClick={() => removeProject(project)}
                      aria-label={`Delete ${project.title}`}
                      className="grid h-9 w-9 place-items-center rounded-lg border border-white/[0.09] text-gray-500 transition-colors hover:border-red-500/35 hover:text-red-400"
                    >
                      <Trash2 size={15} aria-hidden="true" />
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}

      {!loading && tab === 'messages' && (
        <div className="mt-8">
          {messages.length === 0 ? (
            <div className="surface p-8">
              <Mail size={20} aria-hidden="true" className="text-gray-600" />
              <p className="mt-3 text-sm text-gray-400">
                No messages yet. Anything sent through the contact form lands here.
              </p>
            </div>
          ) : (
            <ul className="space-y-3">
              {messages.map((message) => (
                <li
                  key={message._id}
                  className={cn('surface p-5', !message.read && 'border-violet-500/25 bg-violet-500/[0.04]')}
                >
                  <div className="flex flex-wrap items-start justify-between gap-4">
                    <div className="min-w-0">
                      <p className="font-medium">{message.subject}</p>
                      <p className="mt-0.5 text-sm text-gray-500">
                        {message.name} ·{' '}
                        <a href={`mailto:${message.email}`} className="hover:text-white">
                          {message.email}
                        </a>{' '}
                        · {new Date(message.createdAt).toLocaleString()}
                      </p>
                    </div>
                    <div className="flex gap-2">
                      <button
                        type="button"
                        onClick={() => markRead(message)}
                        aria-label={message.read ? 'Mark as unread' : 'Mark as read'}
                        className="grid h-9 w-9 place-items-center rounded-lg border border-white/[0.09] text-gray-500 transition-colors hover:text-white"
                      >
                        <Check size={15} aria-hidden="true" />
                      </button>
                      <button
                        type="button"
                        onClick={() => removeMessage(message)}
                        aria-label="Delete message"
                        className="grid h-9 w-9 place-items-center rounded-lg border border-white/[0.09] text-gray-500 transition-colors hover:border-red-500/35 hover:text-red-400"
                      >
                        <Trash2 size={15} aria-hidden="true" />
                      </button>
                    </div>
                  </div>
                  <p className="mt-4 max-w-prose whitespace-pre-wrap text-sm leading-relaxed text-gray-400">
                    {message.message}
                  </p>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}

      <p className="mt-12 text-xs text-gray-600">
        Projects can be added and edited above. Bulk changes are still easiest by editing{' '}
        <code className="font-mono">server/utils/projects.seed.json</code> and re-running the seed.{' '}
        <Link to="/" className="underline hover:text-gray-400">Back to the site</Link>.
      </p>
    </Container>
  );
}
