import { MotionConfig } from 'framer-motion';
import type { ReactNode } from 'react';

export default function MotionPage({ children }: { children: ReactNode }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}
