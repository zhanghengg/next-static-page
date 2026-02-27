import { createNote, getNotes } from '@/src/app/api/notes/handlers';

describe('/api/notes', () => {
  it('GET returns json with notes', async () => {
    const json = await getNotes();

    expect(json).toHaveProperty('notes');
    expect(Array.isArray(json.notes)).toBe(true);
  });

  it('POST validates payload', async () => {
    const result = await createNote({ title: '', content: '' });

    expect(result.ok).toBe(false);
    expect(result.status).toBe(400);
    expect(result.json).toHaveProperty('error');
  });
});
