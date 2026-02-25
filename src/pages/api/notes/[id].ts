import type { NextApiRequest, NextApiResponse } from 'next';
import { z } from 'zod';
import { prisma } from '@/src/server/db';

const IdSchema = z.object({
  id: z.string().min(1),
});

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const idParsed = IdSchema.safeParse(req.query);
  if (!idParsed.success) {
    return res.status(400).json({ error: 'Invalid id' });
  }

  const { id } = idParsed.data;

  if (req.method === 'GET') {
    const note = await prisma.note.findUnique({ where: { id } });
    if (!note) return res.status(404).json({ error: 'Not found' });
    return res.status(200).json({ note });
  }

  if (req.method === 'DELETE') {
    await prisma.note.delete({ where: { id } }).catch(() => null);
    return res.status(204).end();
  }

  res.setHeader('Allow', 'GET,DELETE');
  return res.status(405).json({ error: 'Method Not Allowed' });
}
