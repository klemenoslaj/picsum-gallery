import { useMemo, useRef } from 'react';

import { Picture, PicturesData } from './Picture';
import { calculatePictureHeight } from './pictureUtils';

interface RenderState {
  readonly columns: Picture[][];
  readonly heights: number[];
  readonly pageNumber: number;
}

export function usePicturesRenderModel(columns: number, pages: readonly PicturesData[] | undefined): RenderState {
  const stash = useRef<RenderState>({
    columns: new Array(columns).fill(0).map(() => [] as Picture[]),
    heights: new Array(columns).fill(0),
    pageNumber: NaN,
  });

  return useMemo(() => {
    const { columns, heights, pageNumber } = stash.current;

    if (!pages?.length || pageNumber === pages.length) {
      return stash.current;
    }

    const page = pages.at(-1)!;

    for (let j = 0; j < page.pictures.length; j++) {
      const minIndex = heights.indexOf(Math.min(...heights));
      const column = columns[minIndex];
      const picture = page.pictures[j];
      column.push(picture);
      heights[minIndex] += calculatePictureHeight(500, picture);
    }

    stash.current = { columns, heights, pageNumber: pages.length };

    return stash.current;
  }, [pages?.length]);
}
