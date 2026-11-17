import { createContext, useContext, useState, type ReactNode } from 'react';

type Draft = { name: string; contact: string; message: string; privacy: boolean };
const emptyDraft: Draft = { name: '', contact: '', message: '', privacy: false };
const Context = createContext<{ draft: Draft; update: (patch: Partial<Draft>) => void; clear: () => void } | null>(null);

// In-memory only: navigating back to edit the selection does not discard the form.
export function InquiryDraftProvider({ children }: { children: ReactNode }) {
  const [draft, setDraft] = useState(emptyDraft);
  return <Context.Provider value={{ draft, update: patch => setDraft(current => ({ ...current, ...patch })), clear: () => setDraft(emptyDraft) }}>{children}</Context.Provider>;
}

export function useInquiryDraft() {
  const value = useContext(Context);
  if (!value) throw new Error('InquiryDraftProvider is missing');
  return value;
}
