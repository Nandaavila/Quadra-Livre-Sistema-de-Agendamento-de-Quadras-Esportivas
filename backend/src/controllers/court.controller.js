const courtService = require('../services/court.service');
const asyncHandler = require('../utils/asyncHandler');
const { success } = require('../utils/httpResponse');

const courtController = {
  list: asyncHandler(async (req, res) => {
    const courts = await courtService.list();
    return success(res, { data: courts });
  }),

  getById: asyncHandler(async (req, res) => {
    const court = await courtService.getById(req.params.id);
    return success(res, { data: court });
  }),

  create: asyncHandler(async (req, res) => {
    const court = await courtService.create(req.body);
    return success(res, {
      statusCode: 201,
      data: court,
      message: 'Quadra cadastrada com sucesso.',
    });
  }),

  update: asyncHandler(async (req, res) => {
    const court = await courtService.update(req.params.id, req.body);
    return success(res, { data: court, message: 'Quadra atualizada com sucesso.' });
  }),

  remove: asyncHandler(async (req, res) => {
    await courtService.remove(req.params.id);
    return success(res, { data: null, message: 'Quadra removida com sucesso.' });
  }),
};

module.exports = courtController;
