import { z } from 'zod';

import { prisma } from '@/src/server/db';

const CreateNoteSchema = z.object({
  title: z.string().min(1).max(120),
  content: z.string().min(1).max(5000),
});

export async function getNotes() {
  const notes = await prisma.note.findMany({
    orderBy: { createdAt: 'desc' },
    take: 50,
  });

  return { notes };
}

export async function createNote(body: unknown) {
  const parsed = CreateNoteSchema.safeParse(body);
  if (!parsed.success) {
    return {
      ok: false as const,
      status: 400 as const,
      json: {
        error: 'Invalid payload',
        details: parsed.error.flatten(),
      },
    };
  }

  const note = await prisma.note.create({
    data: parsed.data,
  });

  return {
    ok: true as const,
    status: 201 as const,
    json: { note },
  };
}
