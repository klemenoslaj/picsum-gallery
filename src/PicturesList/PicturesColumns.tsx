import { FunctionComponent } from 'react';
import classNames from 'classnames';

import { Picture, PicturesData } from './Picture';
import { PictureCard } from './PictureCard';
import { usePicturesRenderModel } from './usePicturesRenderModel';

const LoadingCard = <div className="flex-1 rounded-t-2xl animate-pulse bg-gray-500"></div>;

interface PicturesProps {
  readonly columns: number;
  readonly className: string;
  readonly hasNextPage: boolean | undefined;
  readonly pictures: readonly PicturesData[] | undefined;
  readonly onClick: (data: { picture: Picture; loadedSrc: string }) => void;
}

export const PicturesColumns: FunctionComponent<PicturesProps> = ({
  columns,
  pictures,
  hasNextPage,
  onClick,
  className,
}) => {
  const render = usePicturesRenderModel(columns, pictures);

  return (
    <div
      className={classNames('mx-auto gap-2 mt-2 px-2 lg:gap-4 lg:mt-4 lg:px-4 max-w-screen-2xl', className, {
        'mb-2 lg:mb-4': !hasNextPage,
      })}
    >
      {render.columns.map((column, i) => (
        <div key={i} className="flex-1 flex flex-col gap-2 lg:gap-4">
          {column.map((picture) => (
            <PictureCard
              key={picture.id}
              picture={picture}
              lazy={render.pageNumber > 2}
              onClick={(event) => onClick({ picture, loadedSrc: event.currentTarget.currentSrc })}
            />
          ))}
          {hasNextPage && LoadingCard}
        </div>
      ))}
    </div>
  );
};
