import type { ElementType, ReactNode } from 'react';
import { fitVars } from '../utils/fit';

interface FitTextProps {
  as?: ElementType;
  /** Plain text of the heading, used to find its longest word. */
  text: string;
  /** Largest font size in rem (the design size on wide screens). */
  max: number;
  /** Letter-spacing in em applied by the heading's classes (e.g. 0.05 for tracking-wider). */
  tracking?: number;
  className?: string;
  id?: string;
  children: ReactNode;
}

// Display heading that never overflows: the element is the size container,
// the inner block scales its font down only when the longest word wouldn't fit.
export function FitText({ as: Tag = 'h2', text, max, tracking, className = '', id, children }: FitTextProps) {
  return (
    <Tag id={id} className={`fit-box ${className}`}>
      <span className="fit" style={fitVars(text, max, tracking)}>
        {children}
      </span>
    </Tag>
  );
}
