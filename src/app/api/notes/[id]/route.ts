import { z } from 'zod';

import { prisma } from '@/src/server/db';

const ParamsSchema = z.object({
  id: z.string().min(1),
});

export async function GET(
  _req: Request,
  context: { params: Promise<{ id: string }> },
) {
  const params = await context.params;
  const parsed = ParamsSchema.safeParse(params);
  if (!parsed.success) {
    return Response.json({ error: 'Invalid id' }, { status: 400 });
  }

  const note = await prisma.note.findUnique({ where: { id: parsed.data.id } });
  if (!note) return Response.json({ error: 'Not found' }, { status: 404 });

  return Response.json({ note }, { status: 200 });
}

export async function DELETE(
  _req: Request,
  context: { params: Promise<{ id: string }> },
) {
  const params = await context.params;
  const parsed = ParamsSchema.safeParse(params);
  if (!parsed.success) {
    return Response.json({ error: 'Invalid id' }, { status: 400 });
  }

  await prisma.note.delete({ where: { id: parsed.data.id } }).catch(() => null);
  return new Response(null, { status: 204 });
}
