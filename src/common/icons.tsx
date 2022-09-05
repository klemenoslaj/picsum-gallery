export interface IconProps {
  readonly className?: string;
}

export const ImageIcon = ({ className }: IconProps) => (
  <svg viewBox="0 0 24 24" className={className}>
    <g data-name="Layer 2">
      <g data-name="image">
        <rect width="24" height="24" opacity="0" />
        <path d="M18 3H6a3 3 0 0 0-3 3v12a3 3 0 0 0 3 3h12a3 3 0 0 0 3-3V6a3 3 0 0 0-3-3zM6 5h12a1 1 0 0 1 1 1v8.36l-3.2-2.73a2.77 2.77 0 0 0-3.52 0L5 17.7V6a1 1 0 0 1 1-1zm12 14H6.56l7-5.84a.78.78 0 0 1 .93 0L19 17v1a1 1 0 0 1-1 1z" />
        <circle cx="8" cy="8.5" r="1.5" />
      </g>
    </g>
  </svg>
);

export const DownloadIcon = ({ className }: IconProps) => (
  <svg viewBox="0 0 24 24" className={className}>
    <g data-name="Layer 2">
      <g data-name="download">
        <rect width="24" height="24" opacity="0" />
        <rect x="4" y="18" width="16" height="2" rx="1" ry="1" />
        <rect x="3" y="17" width="4" height="2" rx="1" ry="1" transform="rotate(-90 5 18)" />
        <rect x="17" y="17" width="4" height="2" rx="1" ry="1" transform="rotate(-90 19 18)" />
        <path d="M12 15a1 1 0 0 1-.58-.18l-4-2.82a1 1 0 0 1-.24-1.39 1 1 0 0 1 1.4-.24L12 12.76l3.4-2.56a1 1 0 0 1 1.2 1.6l-4 3a1 1 0 0 1-.6.2z" />
        <path d="M12 13a1 1 0 0 1-1-1V4a1 1 0 0 1 2 0v8a1 1 0 0 1-1 1z" />
      </g>
    </g>
  </svg>
);
