import { FunctionComponent, useMemo, useState } from 'react';
import { DownloadIcon } from '~common/icons';
import Button from '~common/Button';
import MediaCard from '~common/MediaCard';

import { Picture } from './Picture';
import { getPictureDownloadURL, getPictureProps, getPictureURL } from './pictureUtils';

export interface PictureCardProps {
  readonly picture: Picture;
  readonly className?: string;
  readonly lazy?: boolean;
  readonly onClick?: (event: React.MouseEvent<HTMLImageElement, MouseEvent>) => void;
}

const sizes = `(max-width: 640px) calc((100vw - 24px) / 2), (min-width: 640px) calc((100vw - 32px) / 3), (min-width: 1024) calc((100vw - 64px) / 3)`;
const imageWidths = [150, 300, 400, 500] as const;

export const PictureCard: FunctionComponent<PictureCardProps> = ({ picture, className, lazy, onClick }) => {
  const [loadFailed, setLoadFailed] = useState(false);
  const { srcSet, pictureURL, downloadURL } = useMemo(
    () => ({
      srcSet: imageWidths.reduce((str, width) => str + `${getPictureURL(width, picture)} ${width}w,`, '').slice(0, -1),
      pictureURL: getPictureURL(imageWidths.at(-1)!, picture),
      downloadURL: getPictureDownloadURL(picture),
    }),
    [picture],
  );

  return (
    <MediaCard
      as="article"
      loadFailed={loadFailed}
      title={picture.author}
      buttons={
        <Button as="a" appearance="squared" download href={downloadURL} aria-label="Download image">
          <DownloadIcon className="h-6" />
        </Button>
      }
    >
      <a href={picture.download_url} target="_blank">
        <img
          {...getPictureProps(picture)}
          src={pictureURL}
          srcSet={srcSet}
          sizes={sizes}
          loading={lazy ? 'lazy' : undefined}
          className="text-transparent"
          onError={() => setLoadFailed(true)}
          onClick={(event) => {
            if (onClick) {
              event.preventDefault();
              onClick(event);
            }
          }}
        />
      </a>
    </MediaCard>
  );
};
