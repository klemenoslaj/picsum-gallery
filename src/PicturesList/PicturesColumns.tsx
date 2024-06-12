import { FunctionComponent, useCallback } from 'react';
import classNames from 'classnames';

import { Picture, PicturesData } from './Picture';
import { PictureCard } from './PictureCard';
import { usePicturesRenderModel } from './usePicturesRenderModel';
import { useCallbackRef } from '~common/useCallbackRef';

const LoadingCard = <div className="flex-1 rounded-t-2xl animate-pulse bg-gray-500"></div>;

export interface PicturesProps {
  readonly columns: number;
  readonly className: string;
  readonly hasNextPage: boolean | undefined;
  readonly pictures: readonly PicturesData[] | undefined;
  readonly onOpen: (data: { picture: Picture; loadedSrc: string }) => void;
}

export const PicturesColumns: FunctionComponent<PicturesProps> = ({
  columns,
  pictures,
  hasNextPage,
  onOpen,
  className,
}) => {
  const render = usePicturesRenderModel(columns, pictures);
  const onClickRef = useCallbackRef(onOpen);

  const onOpenStable = useCallback(
    (
      _event: React.MouseEvent<HTMLImageElement> | React.KeyboardEvent<HTMLAnchorElement>,
      picture: Picture,
      currentSrc: string,
    ) => {
      onClickRef.current!({ picture, loadedSrc: currentSrc });
    },
    [onClickRef],
  );

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
              onClick={onOpenStable}
              onEnter={onOpenStable}
            />
          ))}
          {hasNextPage && LoadingCard}
        </div>
      ))}
    </div>
  );
};
