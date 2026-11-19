import '../page-system.css';
import type { ReactNode } from 'react';

export default function PageHeader({ title, description, eyebrow, children }: { title: string; description?: string; eyebrow?: string; children?: ReactNode }) {
  return <header className="page-heading">
    {eyebrow && <p className="page-kicker">{eyebrow}</p>}
    <h1>{title}</h1>
    {description && <p className="page-lead">{description}</p>}
    {children && <div className="page-heading-actions">{children}</div>}
  </header>;
}
