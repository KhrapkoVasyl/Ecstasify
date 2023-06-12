import { Author } from './author';

export interface Track {
  createdAt: string;
  updatedAt: string;
  id: string;
  name: string;
  author: Author;
  genre: string;
  file: string;
  coverImg: string;
}
