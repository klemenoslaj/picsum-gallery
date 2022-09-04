export interface Picture {
  readonly id: `${number}`;
  readonly author: string;
  readonly width: number;
  readonly height: number;
  readonly url: string;
  readonly download_url: string;
}

export interface PicturesData {
  readonly pictures: readonly Picture[];
}
