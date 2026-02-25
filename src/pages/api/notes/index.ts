import type { NextApiRequest, NextApiResponse } from 'next';
import { z } from 'zod';
import { prisma } from '@/src/server/db';

const CreateNoteSchema = z.object({
  title: z.string().min(1).max(120),
  content: z.string().min(1).max(5000),
});

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    const notes = await prisma.note.findMany({
      orderBy: { createdAt: 'desc' },
      take: 50,
    });
    return res.status(200).json({ notes });
  }

  if (req.method === 'POST') {
    const parsed = CreateNoteSchema.safeParse(req.body);
    if (!parsed.success) {
      return res.status(400).json({
        error: 'Invalid payload',
        details: parsed.error.flatten(),
      });
    }

    const note = await prisma.note.create({
      data: parsed.data,
    });

    return res.status(201).json({ note });
  }

  res.setHeader('Allow', 'GET,POST');
  return res.status(405).json({ error: 'Method Not Allowed' });
}
