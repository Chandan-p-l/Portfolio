import type { CSSProperties } from 'react';

// Advance widths (in em) of the uppercase display face, measured in the browser.
// Used to size big headings so their longest word always fits its container.
const WIDTHS: Record<string, number> = {
  '0': 1.066, '1': 0.529, '2': 1.003, '3': 1.055, '4': 1.094, '5': 1.015, '6': 1.133, '7': 1.135, '8': 1.081, '9': 1.158,
  A: 1.16, B: 1.14, C: 1.316, D: 1.302, E: 1.14, F: 1.128, G: 1.34, H: 1.28, I: 0.42, J: 1.004, K: 1.206, L: 0.943, M: 1.58,
  N: 1.3, O: 1.33, P: 1.177, Q: 1.33, R: 1.232, S: 1.056, T: 1.1, U: 1.289, V: 1.16, W: 1.882, X: 1.14, Y: 1.07, Z: 1.2,
  '.': 0.354, ',': 0.303, '?': 0.864, '&': 1.22, '-': 0.59, "'": 0.3, '’': 0.3, '@': 1.498, '#': 1.392, '—': 0.94, '®': 1.628,
  ':': 0.36, '(': 0.6, ')': 0.6, '/': 0.7, '+': 1.1, '!': 0.42,
};

/** Width in em of the widest single word in `text` (headings wrap only at spaces). */
export function longestWordEm(text: string, tracking = 0) {
  return Math.max(
    ...text
      .toUpperCase()
      .split(/\s+/)
      .filter(Boolean)
      .map((w) => [...w].reduce((sum, c) => sum + (WIDTHS[c] ?? 1.15) + tracking, 0)),
  );
}

/**
 * CSS variables for `.fit`: font size is `maxRem`, shrunk only when the longest word
 * would overflow the nearest `.fit-box` container. Pure CSS — no layout shift on hydration.
 */
export function fitVars(text: string, maxRem: number, tracking = -0.03): CSSProperties {
  return {
    ['--fit-max' as string]: `${maxRem}rem`,
    ['--fit-em' as string]: (longestWordEm(text, tracking) * 1.04).toFixed(3),
  };
}
