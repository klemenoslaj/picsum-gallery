import { FunctionComponent, useState } from 'react';
import classNames from 'classnames';
import Edge from '~common/Edge';
import Spinner from '~common/Spinner';

import { Picture } from './Picture';
import { PictureCard } from './PictureCard';
import { PictureModal } from './PictureModal';
import { usePicturesQuery } from './usePicturesQuery';
import { usePicturesRenderModel } from './usePicturesRenderModel';

const LoadingCard = <div className="flex-1 rounded-t-2xl animate-pulse bg-gray-500"></div>;
const LoadingSpinner = (
  <div className="flex h-screen justify-center items-center text-green-800">
    <Spinner className="h-14 w-14" />
  </div>
);
const QueryError = (
  <div className="w-screen h-screen flex items-center justify-center bg-red-50 text-red-500">
    Couldn't fetch pictures. Please try again later.
  </div>
);

export const PicturesList: FunctionComponent = () => {
  const [fullscreenPicture, setFullscreenPicture] = useState<Picture | null>(null);
  const query = usePicturesQuery();
  const renderXS = usePicturesRenderModel(2, query.data?.pages);
  const renderMD = usePicturesRenderModel(3, query.data?.pages);

  if (query.error) {
    return QueryError;
  }

  if (query.isLoading) {
    return LoadingSpinner;
  }

  return (
    <>
      <PictureModal picture={fullscreenPicture} open={!!fullscreenPicture} onClose={() => setFullscreenPicture(null)} />

      <div
        className={classNames('flex mx-auto gap-2 mt-2 px-2 sm:hidden', {
          'mb-2 lg:mb-4': !query.hasNextPage,
        })}
      >
        {renderXS.columns.map((column, i) => (
          <div key={i} className="flex-1 flex flex-col gap-2">
            {column.map((picture) => (
              <PictureCard
                key={picture.id}
                picture={picture}
                lazy={renderXS.pageNumber > 2}
                onClick={() => setFullscreenPicture(picture)}
              />
            ))}
            {query.hasNextPage && LoadingCard}
          </div>
        ))}
      </div>

      <div
        className={classNames('hidden mx-auto gap-2 mt-2 px-2 lg:gap-4 lg:mt-4 lg:px-4 sm:flex max-w-screen-2xl', {
          'mb-2 lg:mb-4': !query.hasNextPage,
        })}
      >
        {renderMD.columns.map((column, i) => (
          <div key={i} className="flex-1 flex flex-col gap-2 lg:gap-4">
            {column.map((picture) => (
              <PictureCard
                key={picture.id}
                picture={picture}
                lazy={renderXS.pageNumber > 2}
                onClick={() => setFullscreenPicture(picture)}
              />
            ))}
            {query.hasNextPage && LoadingCard}
          </div>
        ))}
      </div>

      {query.hasNextPage && <Edge onVisible={query.fetchNextPage} />}
    </>
  );
};
