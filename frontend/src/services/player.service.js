import api from './api';

const playerService = {
  list: () => api.get('/players').then((res) => res.data.data),
  getById: (id) => api.get(`/players/${id}`).then((res) => res.data.data),
  create: (payload) => api.post('/players', payload).then((res) => res.data.data),
  update: (id, payload) => api.put(`/players/${id}`, payload).then((res) => res.data.data),
  remove: (id) => api.delete(`/players/${id}`).then((res) => res.data.data),
};

export default playerService;
