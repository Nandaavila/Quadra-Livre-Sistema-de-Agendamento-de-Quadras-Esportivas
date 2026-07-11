const reservationService = require('../services/reservation.service');
const asyncHandler = require('../utils/asyncHandler');
const { success } = require('../utils/httpResponse');

const reservationController = {
  list: asyncHandler(async (req, res) => {
    const { courtId, date } = req.query;
    const reservations = await reservationService.list({ courtId, date });
    return success(res, { data: reservations });
  }),

  getById: asyncHandler(async (req, res) => {
    const reservation = await reservationService.getById(req.params.id);
    return success(res, { data: reservation });
  }),

  // GET /api/reservations/court/:courtId — agenda de uma quadra específica
  byCourt: asyncHandler(async (req, res) => {
    const reservations = await reservationService.list({ courtId: req.params.courtId });
    return success(res, { data: reservations });
  }),

  // GET /api/reservations/date/:date — agenda de uma data específica (todas as quadras)
  byDate: asyncHandler(async (req, res) => {
    const reservations = await reservationService.list({ date: req.params.date });
    return success(res, { data: reservations });
  }),

  create: asyncHandler(async (req, res) => {
    const reservation = await reservationService.create(req.body);
    return success(res, {
      statusCode: 201,
      data: reservation,
      message: 'Reserva criada com sucesso.',
    });
  }),

  update: asyncHandler(async (req, res) => {
    const reservation = await reservationService.update(req.params.id, req.body);
    return success(res, { data: reservation, message: 'Reserva atualizada com sucesso.' });
  }),

  remove: asyncHandler(async (req, res) => {
    await reservationService.remove(req.params.id);
    return success(res, { data: null, message: 'Reserva removida com sucesso.' });
  }),
};

module.exports = reservationController;
