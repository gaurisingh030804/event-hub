const apiCall = async (url, options = {}) => {
  const token = localStorage.getItem('token');
  const headers = { 'Content-Type': 'application/json', ...options.headers };
  if (token) headers['Authorization'] = `Bearer ${token}`;

  const res = await fetch(`http://localhost:5002${url}`, { ...options, headers });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || 'Something went wrong');
  return data;
};

export const authAPI = {
  register: (data) => apiCall('/api/auth/register', { method: 'POST', body: JSON.stringify(data) }),
  login: (data) => apiCall('/api/auth/login', { method: 'POST', body: JSON.stringify(data) }),
};

export const eventsAPI = {
  getAll: () => apiCall('/api/events'),
  getById: (id) => apiCall(`/api/events/${id}`),
  create: (data) => apiCall('/api/events', { method: 'POST', body: JSON.stringify(data) }),
  delete: (id) => apiCall(`/api/events/${id}`, { method: 'DELETE' }),
};

export const registrationAPI = {
  register: (id) => apiCall(`/api/registrations/${id}/register`, { method: 'POST' }),
  getMyEvents: () => apiCall('/api/registrations/my-events'),
};
