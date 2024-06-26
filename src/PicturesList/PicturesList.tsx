import { FunctionComponent, useCallback, useState } from 'react';
import Edge from '~common/Edge';
import Spinner from '~common/Spinner';

import { Picture } from './Picture';
import { PictureModal } from './PictureModal';
import { usePicturesQuery } from './usePicturesQuery';
import { PicturesColumns, PicturesProps } from './PicturesColumns';

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
  const [fullscreenPicture, setFullscreenPicture] = useState<{ picture: Picture; loadedSrc: string } | null>(null);
  const query = usePicturesQuery();

  const onOpen: PicturesProps['onOpen'] = (data) => setFullscreenPicture(data);
  const onCloseModal = useCallback(() => setFullscreenPicture(null), []);

  if (query.error) {
    return QueryError;
  }

  if (query.isLoading) {
    return LoadingSpinner;
  }

  return (
    <>
      <PictureModal
        picture={fullscreenPicture?.picture}
        loadedSrc={fullscreenPicture?.loadedSrc}
        open={!!fullscreenPicture}
        onClose={onCloseModal}
      />

      <PicturesColumns
        columns={2}
        pictures={query.data?.pages}
        hasNextPage={query.hasNextPage}
        onOpen={onOpen}
        className="flex sm:hidden"
      />

      <PicturesColumns
        columns={3}
        pictures={query.data?.pages}
        hasNextPage={query.hasNextPage}
        onOpen={onOpen}
        className="hidden sm:flex"
      />

      {query.hasNextPage && <Edge onVisible={query.fetchNextPage} />}
    </>
  );
};
