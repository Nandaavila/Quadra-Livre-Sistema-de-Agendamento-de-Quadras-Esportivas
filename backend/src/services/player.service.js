const playerRepository = require('../repositories/player.repository');
const ApiError = require('../utils/ApiError');

const playerService = {
  list: () => playerRepository.findAll(),

  getById: async (id) => {
    const player = await playerRepository.findById(id);
    if (!player) {
      throw ApiError.notFound('Jogador não encontrado.');
    }
    return player;
  },

  create: async (data) => {
    const existing = await playerRepository.findByEmail(data.email);
    if (existing) {
      throw ApiError.conflict('Já existe um jogador cadastrado com este e-mail.', 'EMAIL_ALREADY_EXISTS');
    }
    return playerRepository.create(data);
  },

  update: async (id, data) => {
    await playerService.getById(id);

    if (data.email) {
      const existing = await playerRepository.findByEmail(data.email);
      if (existing && existing.id !== id) {
        throw ApiError.conflict('Já existe um jogador cadastrado com este e-mail.', 'EMAIL_ALREADY_EXISTS');
      }
    }

    return playerRepository.update(id, data);
  },

  remove: async (id) => {
    await playerService.getById(id);
    return playerRepository.remove(id);
  },
};

module.exports = playerService;
