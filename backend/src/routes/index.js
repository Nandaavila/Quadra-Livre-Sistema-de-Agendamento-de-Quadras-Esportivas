const { Router } = require('express');
const playerRoutes = require('./player.routes');
const courtRoutes = require('./court.routes');
const reservationRoutes = require('./reservation.routes');

const router = Router();

// Health-check — útil para validar que a API está no ar
// e que a estrutura de rotas está funcionando.
router.get('/health', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'API rodando normalmente.',
    data: { timestamp: new Date().toISOString() },
  });
});

router.use('/players', playerRoutes);
router.use('/courts', courtRoutes);
router.use('/reservations', reservationRoutes);

module.exports = router;
