import { SVGAttributes } from 'react';

export const DownloadIcon = (props: SVGAttributes<SVGElement>) => (
  <svg {...props} viewBox="0 0 24 24">
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

export const SlashIcon = (props: SVGAttributes<SVGElement>) => (
  <svg {...props} viewBox="0 0 24 24">
    <g data-name="Layer 2">
      <g data-name="slash">
        <rect width="24" height="24" opacity="0" />
        <path d="M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2zm8 10a7.92 7.92 0 0 1-1.69 4.9L7.1 5.69A7.92 7.92 0 0 1 12 4a8 8 0 0 1 8 8zM4 12a7.92 7.92 0 0 1 1.69-4.9L16.9 18.31A7.92 7.92 0 0 1 12 20a8 8 0 0 1-8-8z" />
      </g>
    </g>
  </svg>
);
