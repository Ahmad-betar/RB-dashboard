export type Pixel = {
  _id: string;
  tiktok: string;
  meta: string;
  snapchat: string;
  __v: number;
};

export type AddPixelRequest = {
  tiktok: string;
  meta: string;
  snapchat: string;
};
