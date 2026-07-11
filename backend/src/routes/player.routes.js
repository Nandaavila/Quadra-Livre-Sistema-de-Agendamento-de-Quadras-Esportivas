const { Router } = require('express');
const { body, param } = require('express-validator');
const playerController = require('../controllers/player.controller');
const validate = require('../middlewares/validate.middleware');

const router = Router();

const idParamValidation = param('id').isUUID().withMessage('ID inválido.');

const createValidation = [
  body('name').trim().notEmpty().withMessage('O nome é obrigatório.'),
  body('email').trim().isEmail().withMessage('E-mail inválido.').normalizeEmail(),
  body('phone').trim().notEmpty().withMessage('O telefone é obrigatório.'),
];

const updateValidation = [
  body('name').optional().trim().notEmpty().withMessage('O nome não pode ser vazio.'),
  body('email').optional().trim().isEmail().withMessage('E-mail inválido.').normalizeEmail(),
  body('phone').optional().trim().notEmpty().withMessage('O telefone não pode ser vazio.'),
];

router.get('/', playerController.list);
router.get('/:id', idParamValidation, validate, playerController.getById);
router.post('/', createValidation, validate, playerController.create);
router.put('/:id', [idParamValidation, ...updateValidation], validate, playerController.update);
router.delete('/:id', idParamValidation, validate, playerController.remove);

module.exports = router;
