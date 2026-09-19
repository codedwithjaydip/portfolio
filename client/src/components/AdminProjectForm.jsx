import { useState } from 'react';
import { ImageOff, Loader2, X } from 'lucide-react';

import Button from './Button.jsx';

const CATEGORIES = ['Full Stack', 'AI', 'Real-Time', 'Other'];
const STATUSES = ['Completed', 'In Development'];

const fieldClasses =
  'w-full rounded-xl border border-white/[0.09] bg-white/[0.02] px-3.5 py-2.5 text-sm text-white ' +
  'placeholder:text-gray-600 focus:border-violet-500/50 focus:outline-none';

const textareaClasses = `${fieldClasses} resize-y`;

/** Turns a comma-separated string into a trimmed, non-empty array. */
const toList = (value) =>
  value
    .split(',')
    .map((item) => item.trim())
    .filter(Boolean);

/** Turns a newline-separated string into a trimmed, non-empty array. */
const toLines = (value) =>
  value
    .split('\n')
    .map((item) => item.trim())
    .filter(Boolean);

/** Builds the form's starting values from an existing project, or blanks for a new one. */
function initialState(project) {
  const details = project?.details || {};
  return {
    title: project?.title || '',
    category: project?.category || 'Full Stack',
    status: project?.status || 'Completed',
    featured: project?.featured || false,
    shortDescription: project?.shortDescription || '',
    description: project?.description || '',
    image: project?.image || '',
    githubUrl: project?.githubUrl || '',
    liveUrl: project?.liveUrl || '',
    secondaryUrl: project?.secondaryUrl || '',
    secondaryLabel: project?.secondaryLabel || '',
    technologies: (project?.technologies || []).join(', '),
    features: (project?.features || []).join('\n'),
    overview: details.overview || '',
    problem: details.problem || '',
    solution: details.solution || '',
    architecture: details.architecture || '',
    challenges: (details.challenges || []).join('\n'),
    learned: (details.learned || []).join('\n'),
  };
}

function SectionLabel({ children }) {
  return <h4 className="text-xs font-semibold uppercase tracking-wide text-gray-500">{children}</h4>;
}

/**
 * Create/edit form for a project. Pass `project` to edit an existing one, or
 * omit it to create a new one — the parent decides which API call to make.
 */
export default function AdminProjectForm({ project, onSubmit, onCancel }) {
  const [values, setValues] = useState(() => initialState(project));
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [showAdvanced, setShowAdvanced] = useState(Boolean(project));
  const [imageOk, setImageOk] = useState(true);

  const isEditing = Boolean(project);

  const set = (field) => (event) => {
    const value = event.target.type === 'checkbox' ? event.target.checked : event.target.value;
    setValues((prev) => ({ ...prev, [field]: value }));
    if (field === 'image') setImageOk(true);
  };

  const submit = async (event) => {
    event.preventDefault();
    setError('');

    if (!values.title.trim() || !values.shortDescription.trim() || !values.description.trim()) {
      setError('Title, short description and description are required.');
      return;
    }

    const payload = {
      title: values.title.trim(),
      category: values.category,
      status: values.status,
      featured: values.featured,
      shortDescription: values.shortDescription.trim(),
      description: values.description.trim(),
      image: values.image.trim(),
      githubUrl: values.githubUrl.trim(),
      liveUrl: values.liveUrl.trim(),
      secondaryUrl: values.secondaryUrl.trim(),
      secondaryLabel: values.secondaryLabel.trim(),
      technologies: toList(values.technologies),
      features: toLines(values.features),
      details: {
        overview: values.overview.trim(),
        problem: values.problem.trim(),
        solution: values.solution.trim(),
        architecture: values.architecture.trim(),
        challenges: toLines(values.challenges),
        learned: toLines(values.learned),
      },
    };

    setSubmitting(true);
    try {
      await onSubmit(payload);
    } catch (err) {
      setError(err.message);
      setSubmitting(false);
    }
  };

  const field = (name, label, { textarea = false, rows = 3, placeholder, required = false, hint } = {}) => (
    <div>
      <label htmlFor={`proj-${name}`} className="mb-1.5 block text-sm font-medium text-gray-300">
        {label}
        {required && <span className="text-violet-400"> *</span>}
      </label>
      {textarea ? (
        <textarea
          id={`proj-${name}`}
          rows={rows}
          value={values[name]}
          onChange={set(name)}
          placeholder={placeholder}
          className={textareaClasses}
        />
      ) : (
        <input
          id={`proj-${name}`}
          type="text"
          value={values[name]}
          onChange={set(name)}
          placeholder={placeholder}
          className={fieldClasses}
        />
      )}
      {hint && <p className="mt-1.5 text-xs text-gray-600">{hint}</p>}
    </div>
  );

  return (
    <form onSubmit={submit} className="surface p-6 sm:p-7">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h3 className="font-display text-lg font-semibold">{isEditing ? 'Edit project' : 'Add a new project'}</h3>
          <p className="mt-1 text-sm text-gray-500">
            {isEditing
              ? 'Changes apply immediately once saved.'
              : 'A URL-friendly slug is generated from the title automatically.'}
          </p>
        </div>
        <button
          type="button"
          onClick={onCancel}
          aria-label="Close form"
          className="grid h-9 w-9 shrink-0 place-items-center rounded-lg border border-white/[0.09] text-gray-500 hover:text-white"
        >
          <X size={16} aria-hidden="true" />
        </button>
      </div>

      {/* Basic info */}
      <div className="mt-7 space-y-5">
        <SectionLabel>Basic info</SectionLabel>

        {field('title', 'Title', { required: true, placeholder: 'e.g. Real-Time Chat Application' })}

        <div className="grid gap-5 sm:grid-cols-3">
          <div>
            <label htmlFor="proj-category" className="mb-1.5 block text-sm font-medium text-gray-300">
              Category
            </label>
            <select id="proj-category" value={values.category} onChange={set('category')} className={fieldClasses}>
              {CATEGORIES.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="proj-status" className="mb-1.5 block text-sm font-medium text-gray-300">
              Status
            </label>
            <select id="proj-status" value={values.status} onChange={set('status')} className={fieldClasses}>
              {STATUSES.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>

          <label className="flex items-center gap-2.5 self-end pb-2.5 text-sm text-gray-300">
            <input
              type="checkbox"
              checked={values.featured}
              onChange={set('featured')}
              className="h-4 w-4 rounded border-white/20 bg-white/5 accent-violet-500"
            />
            Feature this project
          </label>
        </div>

        {field('shortDescription', 'Short description', {
          required: true,
          placeholder: 'One sentence — shown on the project card.',
        })}

        {field('description', 'Description', {
          textarea: true,
          required: true,
          placeholder: 'A fuller paragraph — shown at the top of the project detail page.',
        })}
      </div>

      {/* Media & links */}
      <div className="mt-8 space-y-5 border-t border-white/[0.06] pt-6">
        <SectionLabel>Media &amp; links</SectionLabel>

        <div className="grid gap-5 sm:grid-cols-[1fr_auto]">
          <div>
            {field('image', 'Cover image', {
              placeholder: '/images/projects/my-cover.png or a full https:// URL',
              hint: 'Either a path to a file in client/public/images/projects/, or a full image URL.',
            })}
          </div>

          {/* Live preview so a typo or wrong path is obvious before saving. */}
          <div className="flex flex-col items-center gap-1.5">
            <span className="text-sm font-medium text-gray-300">Preview</span>
            <div className="grid h-[70px] w-[112px] shrink-0 place-items-center overflow-hidden rounded-lg border border-white/[0.09] bg-white/[0.02]">
              {values.image && imageOk ? (
                <img
                  src={values.image}
                  alt=""
                  className="h-full w-full object-cover"
                  onError={() => setImageOk(false)}
                />
              ) : (
                <ImageOff size={18} aria-hidden="true" className="text-gray-700" />
              )}
            </div>
          </div>
        </div>

        {field('technologies', 'Technologies', { placeholder: 'React, Node.js, MongoDB (comma-separated)' })}

        {field('features', 'Features', {
          textarea: true,
          rows: 4,
          placeholder: 'One feature per line',
        })}

        <div className="grid gap-5 sm:grid-cols-2">
          {field('githubUrl', 'GitHub URL', { placeholder: 'https://github.com/username/repo' })}
          {field('liveUrl', 'Live demo URL', { placeholder: 'https://your-project.vercel.app' })}
          {field('secondaryUrl', 'Second URL (optional)', { placeholder: 'e.g. an admin app deployment' })}
          {field('secondaryLabel', 'Second URL label', { placeholder: 'e.g. Admin Dashboard' })}
        </div>
      </div>

      {/* Project detail page content */}
      <div className="mt-8 border-t border-white/[0.06] pt-6">
        <button
          type="button"
          onClick={() => setShowAdvanced((value) => !value)}
          className="text-sm font-medium text-violet-300 hover:text-violet-200"
        >
          {showAdvanced ? 'Hide' : 'Show'} project detail page content
        </button>

        {showAdvanced && (
          <div className="mt-5 space-y-5">
            <SectionLabel>Detail page — overview, problem, solution, architecture</SectionLabel>
            {field('overview', 'Overview', { textarea: true })}
            {field('problem', 'The problem', { textarea: true })}
            {field('solution', 'The solution', { textarea: true })}
            {field('architecture', 'Architecture', { textarea: true })}
            {field('challenges', 'Challenges', { textarea: true, rows: 3, placeholder: 'One per line' })}
            {field('learned', 'What I learned', { textarea: true, rows: 3, placeholder: 'One per line' })}
          </div>
        )}
      </div>

      {error && (
        <p role="alert" className="mt-6 rounded-xl border border-red-500/25 bg-red-500/10 p-3 text-sm text-red-300">
          {error}
        </p>
      )}

      <div className="mt-7 flex gap-3">
        <Button type="submit" disabled={submitting}>
          {submitting && <Loader2 size={16} aria-hidden="true" className="animate-spin" />}
          {submitting ? 'Saving' : isEditing ? 'Save changes' : 'Create project'}
        </Button>
        <Button type="button" variant="secondary" onClick={onCancel}>
          Cancel
        </Button>
      </div>
    </form>
  );
}
