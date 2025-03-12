export interface imageType {
  url: string;
  publicId: string;
  _id?: string;
}

export interface videoType {
  url: string;
  publicId: string;
  duration: number;
  format: string;
}

export interface imageResponse {
  message: string;
  image: imageType[];
}

export interface videoResponse {
  message: string;
  video: videoType[];
}
