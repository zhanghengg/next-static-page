import { FormEvent, useMemo, useState } from 'react';
import useSWR from 'swr';
import { Layout } from '@/src/components/Layout';
import { fetcher } from '@/src/lib/fetcher';

type Note = {
  id: string;
  title: string;
  content: string;
  createdAt: string;
  updatedAt: string;
};

type NotesResponse = { notes: Note[] };

type CreateNoteResponse = { note: Note };

export default function NotesPage() {
  const { data, error, isLoading, mutate } = useSWR<NotesResponse>('/api/notes', fetcher);

  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [busy, setBusy] = useState(false);
  const [toast, setToast] = useState<string | null>(null);

  const notes = data?.notes ?? [];

  const stats = useMemo(() => {
    const total = notes.length;
    const chars = notes.reduce((acc, n) => acc + n.content.length, 0);
    return { total, chars };
  }, [notes]);

  async function onCreate(e: FormEvent) {
    e.preventDefault();
    setToast(null);

    const t = title.trim();
    const c = content.trim();
    if (!t || !c) {
      setToast('Title and content are required.');
      return;
    }

    setBusy(true);
    try {
      const res = await fetch('/api/notes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title: t, content: c }),
      });

      if (!res.ok) {
        const text = await res.text().catch(() => '');
        throw new Error(text || `HTTP ${res.status}`);
      }

      const json = (await res.json()) as CreateNoteResponse;
      setTitle('');
      setContent('');
      await mutate();
      setToast(`Saved: ${json.note.title}`);
    } catch (err) {
      setToast(err instanceof Error ? err.message : 'Unknown error');
    } finally {
      setBusy(false);
    }
  }

  async function onDelete(id: string) {
    setToast(null);
    setBusy(true);
    try {
      const res = await fetch(`/api/notes/${id}`, { method: 'DELETE' });
      if (!res.ok && res.status !== 204) {
        throw new Error(`Delete failed (${res.status})`);
      }
      await mutate();
      setToast('Deleted.');
    } finally {
      setBusy(false);
    }
  }

  return (
    <Layout title="Notes - Neon Notes">
      <section className="grid">
        <div className="panel">
          <h2 className="h2">Create Note</h2>
          <p className="p">Write something small. Or something unhinged.</p>

          <form className="form" onSubmit={onCreate}>
            <label className="label">
              <span className="labelText">Title</span>
              <input
                className="input"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g. Build before 8am"
                maxLength={120}
              />
            </label>

            <label className="label">
              <span className="labelText">Content</span>
              <textarea
                className="textarea"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="Put your idea here..."
                rows={6}
                maxLength={5000}
              />
            </label>

            <div className="row">
              <button className="btn primary" type="submit" disabled={busy}>
                {busy ? 'Saving…' : 'Save note'}
              </button>
              <div className="stats" aria-hidden="true">
                <span className="chip">{stats.total} notes</span>
                <span className="chip">{stats.chars} chars</span>
              </div>
            </div>

            {toast ? <div className="toast">{toast}</div> : null}
            {error ? <div className="toast bad">Failed to load: {String(error)}</div> : null}
          </form>
        </div>

        <div className="panel">
          <div className="panelTop">
            <h2 className="h2">Recent</h2>
            <div className="sub">
              {isLoading ? 'Loading…' : `${notes.length} loaded`}
            </div>
          </div>

          <div className="list">
            {notes.length === 0 ? (
              <div className="empty">No notes yet. Make the first one.</div>
            ) : (
              notes.map((n) => (
                <article key={n.id} className="note">
                  <div className="noteTop">
                    <div className="noteTitle">{n.title}</div>
                    <button className="del" onClick={() => onDelete(n.id)} disabled={busy}>
                      Delete
                    </button>
                  </div>
                  <div className="noteBody">{n.content}</div>
                  <div className="noteMeta">
                    {new Date(n.createdAt).toLocaleString()}
                  </div>
                </article>
              ))
            )}
          </div>
        </div>
      </section>

      <style>{css}</style>
    </Layout>
  );
}

const css = String.raw`
  .grid {
    display: grid;
    grid-template-columns: 0.95fr 1.05fr;
    gap: 16px;
    align-items: start;
  }

  .panel {
    border-radius: var(--r);
    border: 1px solid rgba(255,255,255,0.12);
    background: rgba(255,255,255,0.05);
    box-shadow: 0 24px 70px rgba(0,0,0,0.40);
    backdrop-filter: blur(14px);
    padding: 16px;
    overflow: hidden;
  }

  .panelTop {
    display: flex;
    align-items: baseline;
    justify-content: space-between;
    gap: 10px;
    margin-bottom: 12px;
  }

  .h2 {
    margin: 0;
    font-family: "Space Grotesk", ui-sans-serif, system-ui;
    letter-spacing: -0.03em;
  }

  .p {
    margin: 8px 0 14px;
    color: var(--muted);
    line-height: 1.6;
    font-size: 14px;
  }

  .sub { color: var(--muted2); font-size: 12px; }

  .form { display: grid; gap: 12px; }

  .label { display: grid; gap: 6px; }
  .labelText { font-size: 12px; letter-spacing: 0.12em; text-transform: uppercase; color: rgba(255,255,255,0.62); }

  .input, .textarea {
    width: 100%;
    border-radius: 14px;
    border: 1px solid rgba(255,255,255,0.12);
    background: rgba(0,0,0,0.25);
    color: rgba(255,255,255,0.90);
    padding: 10px 12px;
    outline: none;
  }

  .textarea { resize: vertical; min-height: 120px; }

  .row {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 10px;
    flex-wrap: wrap;
  }

  .btn {
    padding: 10px 14px;
    border-radius: 999px;
    border: 1px solid rgba(255,255,255,0.14);
    background: rgba(0,0,0,0.20);
    color: rgba(255,255,255,0.88);
    font-weight: 800;
    cursor: pointer;
    transition: transform 160ms ease, background 160ms ease;
  }

  .btn:hover { transform: translateY(-1px); background: rgba(255,255,255,0.08); }

  .btn.primary {
    background: linear-gradient(90deg, rgba(112,246,255,0.28), rgba(255,79,216,0.22), rgba(255,211,110,0.20));
  }

  .btn:disabled { opacity: 0.55; cursor: not-allowed; }

  .stats { display: flex; gap: 8px; flex-wrap: wrap; justify-content: flex-end; }

  .chip {
    font-size: 12px;
    padding: 6px 10px;
    border-radius: 999px;
    border: 1px solid rgba(255,255,255,0.12);
    background: rgba(0,0,0,0.18);
    color: rgba(255,255,255,0.78);
  }

  .toast {
    margin-top: 4px;
    font-size: 13px;
    padding: 10px 12px;
    border-radius: 14px;
    border: 1px solid rgba(255,255,255,0.12);
    background: rgba(0,0,0,0.22);
    color: rgba(255,255,255,0.82);
  }

  .toast.bad {
    border-color: rgba(255, 110, 110, 0.28);
    color: rgba(255, 210, 210, 0.95);
  }

  .list { display: grid; gap: 10px; }

  .empty {
    color: var(--muted);
    font-size: 14px;
    padding: 14px 4px;
  }

  .note {
    border-radius: 16px;
    border: 1px solid rgba(255,255,255,0.12);
    background: rgba(0,0,0,0.20);
    padding: 12px;
    box-shadow: 0 18px 45px rgba(0,0,0,0.25);
  }

  .noteTop {
    display: flex;
    align-items: baseline;
    justify-content: space-between;
    gap: 10px;
  }

  .noteTitle { font-weight: 900; letter-spacing: -0.02em; }

  .del {
    border: 1px solid rgba(255,255,255,0.12);
    background: rgba(255, 110, 110, 0.14);
    color: rgba(255,255,255,0.86);
    border-radius: 999px;
    padding: 7px 10px;
    cursor: pointer;
  }

  .del:disabled { opacity: 0.5; cursor: not-allowed; }

  .noteBody {
    margin-top: 8px;
    color: rgba(255,255,255,0.80);
    white-space: pre-wrap;
    line-height: 1.6;
    font-size: 14px;
  }

  .noteMeta {
    margin-top: 8px;
    color: rgba(255,255,255,0.52);
    font-size: 12px;
  }

  @media (max-width: 920px) {
    .grid { grid-template-columns: 1fr; }
  }
`;
