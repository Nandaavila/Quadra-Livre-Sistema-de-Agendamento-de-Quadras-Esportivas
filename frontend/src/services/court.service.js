import api from './api';

export const SPORT_TYPES = [
  { value: 'SOCCER', label: 'Futebol' },
  { value: 'FUTSAL', label: 'Futsal' },
  { value: 'VOLLEYBALL', label: 'Vôlei' },
  { value: 'BASKETBALL', label: 'Basquete' },
  { value: 'TENNIS', label: 'Tênis' },
  { value: 'BEACH_TENNIS', label: 'Beach Tennis' },
  { value: 'OTHER', label: 'Outra' },
];

export const sportLabel = (value) =>
  SPORT_TYPES.find((s) => s.value === value)?.label || value;

const courtService = {
  list: () => api.get('/courts').then((res) => res.data.data),
  getById: (id) => api.get(`/courts/${id}`).then((res) => res.data.data),
  create: (payload) => api.post('/courts', payload).then((res) => res.data.data),
  update: (id, payload) => api.put(`/courts/${id}`, payload).then((res) => res.data.data),
  remove: (id) => api.delete(`/courts/${id}`).then((res) => res.data.data),
};

export default courtService;
