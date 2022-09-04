import { FunctionComponent } from 'react';
import Edge from '~common/Edge';
import Spinner from '~common/Spinner';

import { PictureCard } from './PictureCard';
import { usePicturesQuery } from './usePicturesQuery';
import { usePicturesRenderModel } from './usePicturesRenderModel';

const LoadingCard = <div className="flex-1 rounded-t-2xl animate-pulse bg-gray-500"></div>;

export const PicturesList: FunctionComponent = () => {
  const query = usePicturesQuery();
  const renderXS = usePicturesRenderModel(2, query.data?.pages);
  const renderMD = usePicturesRenderModel(3, query.data?.pages);

  if (query.error) {
    return <>Couldn't fetch pictures. Please try again later.</>;
  }

  if (query.isLoading) {
    return (
      <div className="flex h-screen justify-center items-center text-green-800">
        <Spinner className="h-14 w-14" />
      </div>
    );
  }

  return (
    <>
      <div className="flex mx-auto gap-2 mt-2 px-2 sm:hidden">
        {renderXS.columns.map((column, i) => {
          return (
            <div key={i} className="flex-1 flex flex-col gap-2">
              {column.map((picture) => (
                <PictureCard key={picture.id} picture={picture} lazy={renderXS.pageNumber > 2} />
              ))}
              {query.hasNextPage && LoadingCard}
            </div>
          );
        })}
      </div>

      <div className="hidden mx-auto gap-2 mt-2 px-2 lg:gap-4 lg:mt-4 lg:px-4 sm:flex max-w-screen-2xl">
        {renderMD.columns.map((column, i) => {
          return (
            <div key={i} className="flex-1 flex flex-col gap-2 lg:gap-4">
              {column.map((picture) => (
                <PictureCard key={picture.id} picture={picture} lazy={renderXS.pageNumber > 2} />
              ))}
              {query.hasNextPage && LoadingCard}
            </div>
          );
        })}
      </div>

      {query.hasNextPage && <Edge onVisible={query.fetchNextPage} />}
    </>
  );
};
