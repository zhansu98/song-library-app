export interface Song {
  id?: any;
  title: string;
  artist: string;
  releaseDate: Date;
  price: number;
  [key: string]: string | number | Date;
}
