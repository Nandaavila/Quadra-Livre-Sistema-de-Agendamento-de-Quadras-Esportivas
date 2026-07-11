const courtRepository = require('../repositories/court.repository');
const ApiError = require('../utils/ApiError');

const courtService = {
  list: () => courtRepository.findAll(),

  getById: async (id) => {
    const court = await courtRepository.findById(id);
    if (!court) {
      throw ApiError.notFound('Quadra não encontrada.');
    }
    return court;
  },

  create: (data) => courtRepository.create(data),

  update: async (id, data) => {
    await courtService.getById(id);
    return courtRepository.update(id, data);
  },

  remove: async (id) => {
    await courtService.getById(id);
    return courtRepository.remove(id);
  },
};

module.exports = courtService;
