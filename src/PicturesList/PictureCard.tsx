import { FunctionComponent, useMemo } from 'react';
import Button from '~common/Button';

import { Picture } from './Picture';
import { getPictureDownloadURL, getPictureURL } from './pictureUtils';

export interface PictureCardProps {
  readonly picture: Picture;
  readonly className?: string;
  readonly lazy?: boolean;
}

const defaultClassName = /*tw*/ 'relative rounded-2xl overflow-hidden group';
const sizes = `(max-width: 640px) calc((100vw - 24px) / 2), (min-width: 640px) calc((100vw - 32px) / 3), (min-width: 1024) calc((100vw - 64px) / 3)`;
const imageWidths = [150, 300, 400, 500];

export const PictureCard: FunctionComponent<PictureCardProps> = ({ picture, className, lazy }) => {
  const { srcSet, pictureURL, downloadURL } = useMemo(
    () => ({
      srcSet: imageWidths.reduce((str, width) => str + `${getPictureURL(width, picture)} ${width}w,`, '').slice(0, -1),
      pictureURL: getPictureURL(500, picture),
      downloadURL: getPictureDownloadURL(picture),
    }),
    [picture],
  );

  return (
    <article className={className ? `${defaultClassName} ${className}` : defaultClassName}>
      <div className="absolute inset-0 animate-pulse bg-gray-500 -z-10" />
      <a href={picture.download_url} target="_blank">
        <img
          src={pictureURL}
          srcSet={srcSet}
          sizes={sizes}
          alt={`Picture from ${picture.author}`}
          width={picture.width}
          height={picture.height}
          className="w-full leading-0"
          loading={lazy ? 'lazy' : undefined}
        />
      </a>
      <div className="hidden sm:block absolute inset-0 bg-neutral-700 opacity-0 transition-opacity duration-150 group-hover:opacity-40 pointer-events-none"></div>
      <div className="absolute bottom-4 left-4 right-4 flex items-center gap-2 lg:gap-4 sm:opacity-0 transition-opacity duration-150 group-hover:opacity-100">
        <span className="flex-1 overflow-hidden text-white invisible sm:visible">{picture.author}</span>
        <Button as="a" squared download href={downloadURL} aria-label="Download image">
          <svg viewBox="0 0 24 24" className="h-6">
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
        </Button>
      </div>
    </article>
  );
};
