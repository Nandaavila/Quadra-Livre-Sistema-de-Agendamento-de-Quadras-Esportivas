const playerService = require('../services/player.service');
const asyncHandler = require('../utils/asyncHandler');
const { success } = require('../utils/httpResponse');

const playerController = {
  list: asyncHandler(async (req, res) => {
    const players = await playerService.list();
    return success(res, { data: players });
  }),

  getById: asyncHandler(async (req, res) => {
    const player = await playerService.getById(req.params.id);
    return success(res, { data: player });
  }),

  create: asyncHandler(async (req, res) => {
    const player = await playerService.create(req.body);
    return success(res, {
      statusCode: 201,
      data: player,
      message: 'Jogador cadastrado com sucesso.',
    });
  }),

  update: asyncHandler(async (req, res) => {
    const player = await playerService.update(req.params.id, req.body);
    return success(res, { data: player, message: 'Jogador atualizado com sucesso.' });
  }),

  remove: asyncHandler(async (req, res) => {
    await playerService.remove(req.params.id);
    return success(res, { data: null, message: 'Jogador removido com sucesso.' });
  }),
};

module.exports = playerController;
