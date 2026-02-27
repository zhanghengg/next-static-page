import { createNote, getNotes } from './handlers';

export async function GET() {
  const json = await getNotes();
  return Response.json(json, { status: 200 });
}

export async function POST(req: Request) {
  const body = await req.json().catch(() => null);
  const result = await createNote(body);
  return Response.json(result.json, { status: result.status });
}
