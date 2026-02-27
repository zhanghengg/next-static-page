import type { Metadata } from 'next';

import { NotesClient } from './NotesClient';

export const metadata: Metadata = {
  title: 'Notes',
};

export default function NotesPage() {
  return <NotesClient />;
}
