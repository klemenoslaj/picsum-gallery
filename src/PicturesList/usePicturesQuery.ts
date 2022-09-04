import { QueryFunctionContext, QueryKey, useInfiniteQuery } from '@tanstack/react-query';
import { useRef } from 'react';

import { PicturesData } from './Picture';
import { getPicturesListURL } from './pictureUtils';

const PAGE_SIZE = 20;

async function getPictures({ pageParam = 1, signal }: QueryFunctionContext<QueryKey, number>): Promise<PicturesData> {
  const response = await fetch(getPicturesListURL(pageParam, PAGE_SIZE), { signal });
  return { pictures: await response.json() } as PicturesData;
}

export function usePicturesQuery() {
  const done = useRef(false);
  return useInfiniteQuery<PicturesData>(['pictures'], getPictures, {
    getNextPageParam: (_lastPage, all) => (done.current ? undefined : all.length + 1),
    refetchOnWindowFocus: false,
    onSuccess(data) {
      done.current = data.pages.at(-1)?.pictures.length === 0;
    },
  });
}
