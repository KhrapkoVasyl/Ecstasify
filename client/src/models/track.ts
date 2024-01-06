import { Author } from './author';

export interface Track {
  createdAt: string;
  updatedAt: string;
  id: string;
  name: string;
  author: Author;
  authorId: string;
  genreId: string;
  genre: {
    id: string;
  };
  file: string;
  coverImg: string;
}
