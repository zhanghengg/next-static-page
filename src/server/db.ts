// Mock Prisma for static build
export const prisma = {
  note: {
    findMany: async (opts?: any) => [],
    findUnique: async (opts?: any) => null,
    create: async (opts?: any) => ({ id: 'mock', ...(opts?.data || {}) }),
    delete: async (opts?: any) => ({}),
  },
};
