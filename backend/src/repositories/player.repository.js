const prisma = require('../config/database');

const playerRepository = {
  findAll: () => prisma.player.findMany({ orderBy: { name: 'asc' } }),

  findById: (id) => prisma.player.findUnique({ where: { id } }),

  findByEmail: (email) => prisma.player.findUnique({ where: { email } }),

  create: (data) => prisma.player.create({ data }),

  update: (id, data) => prisma.player.update({ where: { id }, data }),

  remove: (id) => prisma.player.delete({ where: { id } }),
};

module.exports = playerRepository;
