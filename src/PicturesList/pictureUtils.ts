import { ImgHTMLAttributes } from 'react';

import { Picture } from './Picture';

export const calculatePictureHeight = (width: number, picture: Picture) => {
  const p = (width * 100) / picture.width;
  return Math.round((p * picture.height) / 100);
};

export function getPictureURL(width: number, picture: Picture) {
  const height = calculatePictureHeight(width, picture);
  return `https://picsum.photos/id/${picture.id}/${width}/${height}.webp`;
}

export function getPictureDownloadURL(picture: Picture) {
  return `/download/id/${picture.id}/${picture.width}/${picture.height}`;
}

export function getPicturesListURL(page: number, limit: number) {
  return `https://picsum.photos/v2/list?page=${page}&limit=${limit}`;
}

export function getPictureProps({ author, width, height, download_url }: Picture): ImgHTMLAttributes<HTMLImageElement> {
  return {
    width,
    height,
    alt: `Picture from ${author}`,
    src: download_url,
  };
}
