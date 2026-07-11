const { Router } = require('express');
const { body, param, query } = require('express-validator');
const reservationController = require('../controllers/reservation.controller');
const validate = require('../middlewares/validate.middleware');

const router = Router();

const TIME_REGEX = /^([01]\d|2[0-3]):([0-5]\d)$/; // HH:mm

const idParamValidation = param('id').isUUID().withMessage('ID inválido.');

const listQueryValidation = [
  query('courtId').optional().isUUID().withMessage('courtId inválido.'),
  query('date').optional().isISO8601().withMessage('date inválida (use AAAA-MM-DD).'),
];

const createValidation = [
  body('playerId').isUUID().withMessage('playerId inválido.'),
  body('courtId').isUUID().withMessage('courtId inválido.'),
  body('date').isISO8601().withMessage('date inválida (use AAAA-MM-DD).'),
  body('startTime').matches(TIME_REGEX).withMessage('startTime inválido (use HH:mm).'),
  body('endTime').matches(TIME_REGEX).withMessage('endTime inválido (use HH:mm).'),
];

const updateValidation = [
  body('playerId').optional().isUUID().withMessage('playerId inválido.'),
  body('courtId').optional().isUUID().withMessage('courtId inválido.'),
  body('date').optional().isISO8601().withMessage('date inválida (use AAAA-MM-DD).'),
  body('startTime').optional().matches(TIME_REGEX).withMessage('startTime inválido (use HH:mm).'),
  body('endTime').optional().matches(TIME_REGEX).withMessage('endTime inválido (use HH:mm).'),
];

// Rotas específicas ANTES da rota genérica /:id
router.get('/', listQueryValidation, validate, reservationController.list);
router.get(
  '/court/:courtId',
  param('courtId').isUUID().withMessage('courtId inválido.'),
  validate,
  reservationController.byCourt
);
router.get(
  '/date/:date',
  param('date').isISO8601().withMessage('date inválida (use AAAA-MM-DD).'),
  validate,
  reservationController.byDate
);
router.get('/:id', idParamValidation, validate, reservationController.getById);
router.post('/', createValidation, validate, reservationController.create);
router.put('/:id', [idParamValidation, ...updateValidation], validate, reservationController.update);
router.delete('/:id', idParamValidation, validate, reservationController.remove);

module.exports = router;
