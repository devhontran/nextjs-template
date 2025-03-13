interface PhotoSchema {
  id;
}

export interface IImageGenerative {
  url?: string;
  src?: string;
  fill?: boolean;
  width: number;
  height: number;
  quality: number;
}
