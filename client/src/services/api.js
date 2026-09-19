const BASE_URL = (import.meta.env.VITE_API_URL || 'http://localhost:5000/api').replace(/\/$/, '');
const TOKEN_KEY = 'portfolio.admin.token';

export const tokenStore = {
  get: () => {
    try {
      return sessionStorage.getItem(TOKEN_KEY);
    } catch {
      return null;
    }
  },
  set: (token) => {
    try {
      sessionStorage.setItem(TOKEN_KEY, token);
    } catch {
      /* storage blocked — the session simply will not persist a refresh */
    }
  },
  clear: () => {
    try {
      sessionStorage.removeItem(TOKEN_KEY);
    } catch {
      /* no-op */
    }
  },
};

export class ApiError extends Error {
  constructor(message, { status, errors } = {}) {
    super(message);
    this.status = status;
    this.errors = errors || {};
  }
}

async function request(path, { method = 'GET', body, auth = false, timeout = 12000 } = {}) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeout);

  const headers = {};
  if (body) headers['Content-Type'] = 'application/json';
  if (auth) {
    const token = tokenStore.get();
    if (token) headers.Authorization = `Bearer ${token}`;
  }

  try {
    const response = await fetch(`${BASE_URL}${path}`, {
      method,
      headers,
      body: body ? JSON.stringify(body) : undefined,
      signal: controller.signal,
    });

    const payload = await response.json().catch(() => ({}));

    if (!response.ok) {
      if (response.status === 401 && auth) tokenStore.clear();
      throw new ApiError(payload.message || 'The request could not be completed.', {
        status: response.status,
        errors: payload.errors,
      });
    }

    return payload;
  } catch (error) {
    if (error instanceof ApiError) throw error;
    if (error.name === 'AbortError') {
      throw new ApiError('The server took too long to respond. Check your connection and try again.');
    }
    throw new ApiError('Could not reach the server. Check your connection and try again.');
  } finally {
    clearTimeout(timer);
  }
}

export const api = {
  getProjects: () => request('/projects'),
  getProject: (idOrSlug) => request(`/projects/${idOrSlug}`),
  sendMessage: (payload) => request('/contact', { method: 'POST', body: payload }),

  admin: {
    login: (payload) => request('/admin/login', { method: 'POST', body: payload }),
    me: () => request('/admin/me', { auth: true }),
    stats: () => request('/admin/stats', { auth: true }),
    projects: () => request('/admin/projects', { auth: true }),
    createProject: (payload) => request('/admin/projects', { method: 'POST', body: payload, auth: true }),
    updateProject: (id, payload) =>
      request(`/admin/projects/${id}`, { method: 'PUT', body: payload, auth: true }),
    deleteProject: (id) => request(`/admin/projects/${id}`, { method: 'DELETE', auth: true }),
    messages: () => request('/admin/messages', { auth: true }),
    markRead: (id, read = true) =>
      request(`/admin/messages/${id}/read`, { method: 'PATCH', body: { read }, auth: true }),
    deleteMessage: (id) => request(`/admin/messages/${id}`, { method: 'DELETE', auth: true }),
  },
};
