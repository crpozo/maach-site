import type { CSSProperties, SVGProps } from 'react';

type IconProps = SVGProps<SVGSVGElement> & {
  size?: number;
  rotate?: number;
};

const rotateStyle = (rotate?: number): CSSProperties | undefined =>
  rotate !== undefined
    ? { transform: `rotate(${rotate}deg)`, transition: 'transform .25s' }
    : undefined;

export const IconArrow = ({ size = 18, rotate = 0, style, ...p }: IconProps) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="square"
    strokeLinejoin="miter"
    style={{ ...rotateStyle(rotate), ...style }}
    {...p}
  >
    <line x1="4" y1="12" x2="20" y2="12" />
    <polyline points="14,6 20,12 14,18" />
  </svg>
);

export const IconArrowDownRight = ({ size = 20, ...p }: IconProps) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="square"
    strokeLinejoin="miter"
    {...p}
  >
    <line x1="6" y1="6" x2="18" y2="18" />
    <polyline points="10,18 18,18 18,10" />
  </svg>
);

export const IconChevronDown = ({ size = 14, rotate = 0, style, ...p }: IconProps) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    strokeLinecap="square"
    strokeLinejoin="miter"
    style={{ ...rotateStyle(rotate), ...style }}
    {...p}
  >
    <polyline points="6,9 12,15 18,9" />
  </svg>
);

export const IconChevronRight = ({ size = 14, ...p }: IconProps) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    strokeLinecap="square"
    strokeLinejoin="miter"
    {...p}
  >
    <polyline points="9,6 15,12 9,18" />
  </svg>
);

export const IconMenu = ({ size = 20, ...p }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="square" {...p}>
    <line x1="3" y1="7" x2="21" y2="7" />
    <line x1="3" y1="12" x2="21" y2="12" />
    <line x1="3" y1="17" x2="21" y2="17" />
  </svg>
);

export const IconSearch = ({ size = 18, ...p }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="square" {...p}>
    <circle cx="11" cy="11" r="7" />
    <line x1="16.5" y1="16.5" x2="21" y2="21" />
  </svg>
);

export const IconUser = ({ size = 18, ...p }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="square" {...p}>
    <circle cx="12" cy="8" r="4" />
    <path d="M4 21a8 8 0 0 1 16 0" />
  </svg>
);

export const IconClose = ({ size = 16, ...p }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="square" {...p}>
    <line x1="5" y1="5" x2="19" y2="19" />
    <line x1="19" y1="5" x2="5" y2="19" />
  </svg>
);

export const IconDownload = ({ size = 16, ...p }: IconProps) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="square"
    strokeLinejoin="miter"
    {...p}
  >
    <path d="M12 3v13" />
    <polyline points="7,11 12,16 17,11" />
    <line x1="4" y1="21" x2="20" y2="21" />
  </svg>
);

export const IconFile = ({ size = 16, ...p }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" {...p}>
    <path d="M14 3H6v18h12V7z" />
    <polyline points="14,3 14,7 18,7" />
  </svg>
);

export const IconRuler = ({ size = 16, ...p }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" {...p}>
    <rect x="2" y="9" width="20" height="6" />
    <line x1="6" y1="9" x2="6" y2="12" />
    <line x1="10" y1="9" x2="10" y2="12" />
    <line x1="14" y1="9" x2="14" y2="12" />
    <line x1="18" y1="9" x2="18" y2="12" />
  </svg>
);

export const IconTool = ({ size = 16, ...p }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" {...p}>
    <path d="M6 3l4 4-3 3-4-4z" />
    <path d="M10 7l8 8" />
    <path d="M14 11l4 4 3-3-4-4z" />
  </svg>
);

export const IconImage = ({ size = 36, ...p }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" {...p}>
    <rect x="3" y="4" width="18" height="16" />
    <circle cx="9" cy="10" r="2" />
    <polyline points="3,17 8,12 13,17 17,13 21,17" />
  </svg>
);

export const IconPin = ({ size = 14, ...p }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" {...p}>
    <path d="M12 2C8 2 5 5 5 9c0 5 7 13 7 13s7-8 7-13c0-4-3-7-7-7z" />
    <circle cx="12" cy="9" r="2.5" />
  </svg>
);

export const IconFilter = ({ size = 16, ...p }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" {...p}>
    <polygon points="3,4 21,4 14,12 14,20 10,18 10,12" />
  </svg>
);

export const IconCheck = ({ size = 12, ...p }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="square" {...p}>
    <polyline points="4,12 10,18 20,6" />
  </svg>
);

export const IconBookmark = ({ size = 16, ...p }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" {...p}>
    <path d="M6 3h12v18l-6-4-6 4z" />
  </svg>
);

export const IconBook = ({ size = 24, ...p }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" {...p}>
    <path d="M4 4v16a2 2 0 0 0 2 2h14V4H6a2 2 0 0 0-2 2z" />
    <line x1="8" y1="8" x2="16" y2="8" />
    <line x1="8" y1="12" x2="16" y2="12" />
  </svg>
);

export const IconChart = ({ size = 24, ...p }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" {...p}>
    <line x1="4" y1="20" x2="20" y2="20" />
    <rect x="6" y="12" width="3" height="8" />
    <rect x="11" y="6" width="3" height="14" />
    <rect x="16" y="10" width="3" height="10" />
  </svg>
);

export const IconUsers = ({ size = 24, ...p }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" {...p}>
    <circle cx="9" cy="8" r="3.5" />
    <path d="M2 21a7 7 0 0 1 14 0" />
    <circle cx="17" cy="9" r="2.5" />
    <path d="M16 13a6 6 0 0 1 6 6" />
  </svg>
);

export const IconPlus = ({ size = 14, ...p }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="square" {...p}>
    <line x1="12" y1="4" x2="12" y2="20" />
    <line x1="4" y1="12" x2="20" y2="12" />
  </svg>
);

export const IconMinus = ({ size = 14, ...p }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="square" {...p}>
    <line x1="4" y1="12" x2="20" y2="12" />
  </svg>
);
