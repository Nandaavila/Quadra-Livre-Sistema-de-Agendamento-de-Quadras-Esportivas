const prisma = require('../config/database');

const reservationRepository = {
  /**
   * Lista reservas, com filtros opcionais de quadra e/ou data.
   * Sempre inclui os dados do jogador e da quadra (evita N+1
   * no frontend, que precisa exibir nome do jogador/quadra).
   */
  findAll: ({ courtId, date } = {}) => {
    const where = {};
    if (courtId) where.courtId = courtId;
    if (date) where.date = date;

    return prisma.reservation.findMany({
      where,
      include: { player: true, court: true },
      orderBy: [{ date: 'asc' }, { startTime: 'asc' }],
    });
  },

  findById: (id) =>
    prisma.reservation.findUnique({
      where: { id },
      include: { player: true, court: true },
    }),

  /**
   * Busca reservas que CONFLITAM com o intervalo informado,
   * na mesma quadra e mesma data.
   *
   * Overlap de intervalos [startTime, endTime) é verdadeiro quando:
   *   existente.startTime < novo.endTime  E  existente.endTime > novo.startTime
   *
   * `excludeId` é usado ao editar uma reserva, para que ela não
   * conflite consigo mesma.
   */
  findConflicts: ({ courtId, date, startTime, endTime, excludeId }) => {
    const where = {
      courtId,
      date,
      startTime: { lt: endTime },
      endTime: { gt: startTime },
    };

    if (excludeId) {
      where.id = { not: excludeId };
    }

    return prisma.reservation.findMany({ where });
  },

  create: (data) =>
    prisma.reservation.create({
      data,
      include: { player: true, court: true },
    }),

  update: (id, data) =>
    prisma.reservation.update({
      where: { id },
      data,
      include: { player: true, court: true },
    }),

  remove: (id) => prisma.reservation.delete({ where: { id } }),
};

module.exports = reservationRepository;
