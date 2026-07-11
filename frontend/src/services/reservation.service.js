import api from './api';

const reservationService = {
  list: (filters = {}) => {
    const params = {};
    if (filters.courtId) params.courtId = filters.courtId;
    if (filters.date) params.date = filters.date;
    return api.get('/reservations', { params }).then((res) => res.data.data);
  },
  getById: (id) => api.get(`/reservations/${id}`).then((res) => res.data.data),
  byCourt: (courtId) => api.get(`/reservations/court/${courtId}`).then((res) => res.data.data),
  byDate: (date) => api.get(`/reservations/date/${date}`).then((res) => res.data.data),
  create: (payload) => api.post('/reservations', payload).then((res) => res.data.data),
  update: (id, payload) => api.put(`/reservations/${id}`, payload).then((res) => res.data.data),
  remove: (id) => api.delete(`/reservations/${id}`).then((res) => res.data.data),
};

export default reservationService;
