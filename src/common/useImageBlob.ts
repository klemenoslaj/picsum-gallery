import { useQuery } from '@tanstack/react-query';
import { createContext } from 'react';
const c = createContext('');

const useImageBlob = (url: string | undefined) => {
  return useQuery(
    [url],
    ({ signal }) =>
      url
        ? fetch(url, { signal })
            .then((response) => (response.ok ? response : Promise.reject(`Failed to fetch image from: ${url}`)))
            .then((response) => response.blob())
            .then((blob) => URL.createObjectURL(blob))
        : '',
    { staleTime: Infinity, enabled: !!url },
  );
};

export default useImageBlob;
