const prisma = require('../config/database');

const courtRepository = {
  findAll: () => prisma.court.findMany({ orderBy: { name: 'asc' } }),

  findById: (id) => prisma.court.findUnique({ where: { id } }),

  create: (data) => prisma.court.create({ data }),

  update: (id, data) => prisma.court.update({ where: { id }, data }),

  remove: (id) => prisma.court.delete({ where: { id } }),
};

module.exports = courtRepository;
