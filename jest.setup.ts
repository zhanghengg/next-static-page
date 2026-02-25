import '@testing-library/jest-dom';

jest.mock('@/src/server/db', () => {
  const note = {
    findMany: jest.fn(async () => []),
    findUnique: jest.fn(async () => null),
    create: jest.fn(async ({ data }: any) => ({
      id: 'note_1',
      title: data.title,
      content: data.content,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    })),
    delete: jest.fn(async () => ({})),
  };

  return {
    prisma: {
      note,
    },
  };
});
