import { FunctionComponent, useMemo, useState } from 'react';
import Button from '~common/Button';
import { DownloadIcon, ImageIcon } from '~common/icons';
import classNames from 'classnames';

import { Picture } from './Picture';
import { getPictureDownloadURL, getPictureURL } from './pictureUtils';

export interface PictureCardProps {
  readonly picture: Picture;
  readonly className?: string;
  readonly lazy?: boolean;
}

const sizes = `(max-width: 640px) calc((100vw - 24px) / 2), (min-width: 640px) calc((100vw - 32px) / 3), (min-width: 1024) calc((100vw - 64px) / 3)`;
const imageWidths = [150, 300, 400, 500];

export const PictureCard: FunctionComponent<PictureCardProps> = ({ picture, className, lazy }) => {
  const [failed, setFailed] = useState(false);
  const { srcSet, pictureURL, downloadURL } = useMemo(
    () => ({
      srcSet: imageWidths.reduce((str, width) => str + `${getPictureURL(width, picture)} ${width}w,`, '').slice(0, -1),
      pictureURL: getPictureURL(500, picture),
      downloadURL: getPictureDownloadURL(picture),
    }),
    [picture],
  );

  const articleClass = classNames(/*tw*/ 'relative rounded-2xl overflow-hidden group', className);
  const overlayClass = classNames('absolute inset-0 bg-gray-500 flex justify-center items-center rounded-2xl', {
    /*tw*/ 'animate-pulse bg-gray-500 -z-10': !failed,
    /*tw*/ 'bg-red-400': failed,
  });

  return (
    <article className={articleClass}>
      <div className={overlayClass}>{failed && <ImageIcon className="h-14 lg:h-20" />}</div>
      <a href={picture.download_url} target="_blank">
        <img
          src={pictureURL}
          srcSet={srcSet}
          sizes={sizes}
          alt={`Picture from ${picture.author}`}
          width={picture.width}
          height={picture.height}
          className="w-full leading-0 text-transparent"
          loading={lazy ? 'lazy' : undefined}
          onError={() => setFailed(true)}
        />
      </a>
      <div className="hidden sm:block absolute inset-0 bg-neutral-700 opacity-0 transition-opacity duration-150 group-hover:opacity-40 pointer-events-none rounded-2xl"></div>
      <div className="absolute bottom-4 left-4 right-4 flex items-center gap-2 lg:gap-4 sm:opacity-0 transition-opacity duration-150 group-hover:opacity-100">
        <span className="flex-1 overflow-hidden text-white invisible sm:visible">{picture.author}</span>
        <Button as="a" squared download href={downloadURL} aria-label="Download image">
          <DownloadIcon className="h-6" />
        </Button>
      </div>
    </article>
  );
};
