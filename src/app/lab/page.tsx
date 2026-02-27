import type { Metadata } from 'next';

import { LabClient } from './LabClient';

export const metadata: Metadata = {
  title: 'Lab',
};

export default function LabPage() {
  return <LabClient />;
}
