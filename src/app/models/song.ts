export interface Song {
  title: string;
  artist: string;
  releaseDate: Date;
  price: number;
  [key: string]: string | number | Date;
}
