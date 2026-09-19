import { useState } from 'react';
import { Loader2, Send } from 'lucide-react';

import Button from './Button.jsx';
import { api, ApiError } from '../services/api.js';

const EMPTY = { name: '', email: '', subject: '', message: '', company: '' };

function validate(values) {
  const errors = {};
  if (values.name.trim().length < 2) errors.name = 'Enter your name.';
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(values.email.trim())) errors.email = 'Enter a valid email address.';
  if (values.subject.trim().length < 3) errors.subject = 'Add a short subject.';
  if (values.message.trim().length < 20) errors.message = 'Your message needs at least 20 characters.';
  return errors;
}

const fieldClasses =
  'w-full rounded-xl border bg-white/[0.02] px-4 py-3 text-sm text-white placeholder:text-gray-600 ' +
  'transition-colors focus:border-violet-500/50 focus:bg-white/[0.04] focus:outline-none';

export default function ContactForm() {
  const [values, setValues] = useState(EMPTY);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState('idle'); // idle | sending | sent | error
  const [serverMessage, setServerMessage] = useState('');

  const update = (field) => (event) => {
    setValues((previous) => ({ ...previous, [field]: event.target.value }));
    if (errors[field]) setErrors((previous) => ({ ...previous, [field]: undefined }));
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    const found = validate(values);
    setErrors(found);
    if (Object.keys(found).length) return;

    setStatus('sending');
    setServerMessage('');

    try {
      const result = await api.sendMessage(values);
      setStatus('sent');
      setServerMessage(result.message || 'Message sent. I will get back to you soon.');
      setValues(EMPTY);
    } catch (error) {
      setStatus('error');
      if (error instanceof ApiError && Object.keys(error.errors || {}).length) setErrors(error.errors);
      setServerMessage(error.message);
    }
  };

  const field = (name, label, type = 'text') => (
    <div>
      <label htmlFor={name} className="mb-2 block text-sm font-medium text-gray-300">
        {label}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        value={values[name]}
        onChange={update(name)}
        aria-invalid={Boolean(errors[name])}
        aria-describedby={errors[name] ? `${name}-error` : undefined}
        className={`${fieldClasses} ${errors[name] ? 'border-red-500/60' : 'border-white/[0.09]'}`}
      />
      {errors[name] && (
        <p id={`${name}-error`} className="mt-1.5 text-xs text-red-400">
          {errors[name]}
        </p>
      )}
    </div>
  );

  return (
    <form onSubmit={onSubmit} noValidate className="surface p-6 sm:p-8">
      <div className="grid gap-5 sm:grid-cols-2">
        {field('name', 'Name')}
        {field('email', 'Email', 'email')}
      </div>

      <div className="mt-5">{field('subject', 'Subject')}</div>

      <div className="mt-5">
        <label htmlFor="message" className="mb-2 block text-sm font-medium text-gray-300">
          Message
        </label>
        <textarea
          id="message"
          name="message"
          rows={6}
          value={values.message}
          onChange={update('message')}
          aria-invalid={Boolean(errors.message)}
          aria-describedby={errors.message ? 'message-error' : 'message-hint'}
          className={`${fieldClasses} resize-y ${errors.message ? 'border-red-500/60' : 'border-white/[0.09]'}`}
        />
        {errors.message ? (
          <p id="message-error" className="mt-1.5 text-xs text-red-400">
            {errors.message}
          </p>
        ) : (
          <p id="message-hint" className="mt-1.5 text-xs text-gray-600">
            At least 20 characters.
          </p>
        )}
      </div>

      {/* Honeypot — hidden from people, tempting to bots. */}
      <div className="hidden" aria-hidden="true">
        <label htmlFor="company">Company</label>
        <input id="company" name="company" tabIndex={-1} autoComplete="off" value={values.company} onChange={update('company')} />
      </div>

      <div className="mt-7 flex flex-wrap items-center gap-4">
        <Button type="submit" size="lg" disabled={status === 'sending'}>
          {status === 'sending' ? (
            <>
              <Loader2 size={16} aria-hidden="true" className="animate-spin" />
              Sending
            </>
          ) : (
            <>
              <Send size={16} aria-hidden="true" />
              Send message
            </>
          )}
        </Button>

        <p
          role="status"
          aria-live="polite"
          className={`text-sm ${status === 'error' ? 'text-red-400' : 'text-emerald-400'}`}
        >
          {serverMessage}
        </p>
      </div>
    </form>
  );
}
