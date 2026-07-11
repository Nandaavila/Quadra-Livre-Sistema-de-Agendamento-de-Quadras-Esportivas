const { Router } = require('express');
const { body, param } = require('express-validator');
const courtController = require('../controllers/court.controller');
const validate = require('../middlewares/validate.middleware');

const router = Router();

const SPORT_TYPES = ['SOCCER', 'FUTSAL', 'VOLLEYBALL', 'BASKETBALL', 'TENNIS', 'BEACH_TENNIS', 'OTHER'];

const idParamValidation = param('id').isUUID().withMessage('ID inválido.');

const createValidation = [
  body('name').trim().notEmpty().withMessage('O nome da quadra é obrigatório.'),
  body('sport')
    .trim()
    .isIn(SPORT_TYPES)
    .withMessage(`A modalidade deve ser uma das seguintes: ${SPORT_TYPES.join(', ')}.`),
  body('location').trim().notEmpty().withMessage('A localização é obrigatória.'),
];

const updateValidation = [
  body('name').optional().trim().notEmpty().withMessage('O nome não pode ser vazio.'),
  body('sport')
    .optional()
    .trim()
    .isIn(SPORT_TYPES)
    .withMessage(`A modalidade deve ser uma das seguintes: ${SPORT_TYPES.join(', ')}.`),
  body('location').optional().trim().notEmpty().withMessage('A localização não pode ser vazia.'),
];

router.get('/', courtController.list);
router.get('/:id', idParamValidation, validate, courtController.getById);
router.post('/', createValidation, validate, courtController.create);
router.put('/:id', [idParamValidation, ...updateValidation], validate, courtController.update);
router.delete('/:id', idParamValidation, validate, courtController.remove);

module.exports = router;
